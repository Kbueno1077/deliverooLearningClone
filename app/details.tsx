import Colors from "@/constants/Colors";
import ParallaxScrollView from "@/parallax/ParallaxScrollView";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SectionList,
    ListRenderItem,
    ScrollView,
} from "react-native";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const { items, total } = useBasketStore();

    const DATA = restaurant.food.map((item, index) => {
        return { title: item.category, data: item.meals, index };
    });

    const selectCategory = (index: number) => {
        setActiveIndex(index);
        const selected = itemsRef.current[index];

        selected.measure((x, y, width, height, pageX, pageY) => {
            scrollRef.current?.scrollTo({ x: x - 16 });
        });
    };

    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 150) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    };

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link
            href={{ pathname: "/(modal)/dish", params: { id: item.id } }}
            asChild
        >
            <TouchableOpacity style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>${item.price}</Text>
                </View>

                <Image source={item.img} style={styles.dishimg} />
            </TouchableOpacity>
        </Link>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: "",
            headerTinColor: Colors.primary,
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            ),

            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons
                            name="share-outline"
                            size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []);

    return (
        <>
            <ParallaxScrollView
                scrollEvent={onScroll}
                backgroundColor={"#fff"}
                style={{ flex: 1 }}
                parallaxHeaderHeight={250}
                stickyHeaderHeight={100}
                contentBackgroundColor={Colors.lightGrey}
                renderBackground={() => (
                    <Image
                        source={restaurant.img}
                        style={{ width: "100%", height: 300 }}
                    />
                )}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>
                            {restaurant.name}
                        </Text>
                    </View>
                )}
            >
                <View style={styles.detailsContainer}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantDescription}>
                        {restaurant.delivery} •{" "}
                        {restaurant.tags.map(
                            (tag, index) =>
                                `${tag}${
                                    index < restaurant.tags.length - 1
                                        ? " • "
                                        : ""
                                }`
                        )}
                    </Text>
                    <Text style={styles.restaurantAbout}>
                        {restaurant.about}
                    </Text>
                </View>

                <SectionList
                    keyExtractor={(item, index) => `${item.id + index}`}
                    scrollEnabled={false}
                    sections={DATA}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title, index } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: Colors.grey,
                                marginHorizontal: 16,
                            }}
                        ></View>
                    )}
                    SectionSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: Colors.grey,
                            }}
                        ></View>
                    )}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </ParallaxScrollView>

            <Animated.View style={[styles.stickySegment, animatedStyles]}>
                <View style={styles.segmentShadow}>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.segmentScrollView}
                    >
                        {restaurant.food.map((item, index) => (
                            <TouchableOpacity
                                ref={(ref) => (itemsRef.current[index] = ref!)}
                                key={index}
                                onPress={() => selectCategory(index)}
                                style={
                                    activeIndex === index
                                        ? styles.segmentButtonActive
                                        : styles.segmentButton
                                }
                            >
                                <Text
                                    style={
                                        activeIndex === index
                                            ? styles.segmentTextActive
                                            : styles.segmentText
                                    }
                                >
                                    {item.category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Animated.View>

            {items > 0 && (
                <View style={styles.footer}>
                    <SafeAreaView
                        edges={["bottom"]}
                        style={{ backgroundColor: "white" }}
                    >
                        <Link href={"/basket"} asChild>
                            <TouchableOpacity style={styles.fullButton}>
                                <Text style={styles.basket}>{items}</Text>
                                <Text style={styles.footerText}>
                                    View Basket
                                </Text>
                                <Text style={styles.basketTotal}>${total}</Text>
                            </TouchableOpacity>
                        </Link>
                    </SafeAreaView>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    detailsContainer: { backgroundColor: Colors.lightGrey },
    stickySection: {
        backgroundColor: "white",
        marginLeft: 70,
        height: 100,
        justifyContent: "flex-end",
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },

    restaurantName: {
        fontSize: 30,
        margin: 16,
        fontWeight: "bold",
        color: Colors.primary,
    },
    restaurantDescription: {
        fontSize: 16,
        marginHorizontal: 16,
        lineHeight: 22,
        color: Colors.medium,
    },
    restaurantAbout: {
        fontSize: 16,
        marginHorizontal: 16,
        marginTop: 8,
        lineHeight: 22,
        color: Colors.medium,
    },

    sectionHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 30,
        margin: 16,
    },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        gap: 8,
    },

    dish: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dishText: {
        fontSize: 14,
        color: Colors.medium,
        paddingVertical: 4,
    },
    dishimg: { height: 80, width: 80, borderRadius: 4 },

    stickySegment: {
        position: "absolute",
        height: 50,
        left: 0,
        right: 0,
        top: 100,
        backgroundColor: "white",
        overflow: "hidden",
        paddingBottom: 4,
    },

    segmentScrollView: {
        paddingHorizontal: 16,
        alignItems: "center",
        gap: 20,
        paddingBottom: 4,
    },
    segmentShadow: {
        backgroundColor: "#fff",
        paddingTop: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        elevation: 5,
        shadowRadius: 10,
    },

    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },

    segmentText: { color: Colors.primary, fontSize: 16 },
    segmentTextActive: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

    footer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: 10,

        elevation: 10,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },

    footerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },

    basket: {
        color: "white",
        backgroundColor: "#19AA86",
        padding: 8,
        fontWeight: "bold",
        borderRadius: 2,
    },
    basketTotal: { color: "white", fontWeight: "bold" },
});
