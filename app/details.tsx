import Colors from "@/constants/Colors";
import ParallaxScrollView from "@/parallax/ParallaxScrollView";
import React, { useLayoutEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SectionList,
    ListRenderItem,
} from "react-native";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
    const navigation = useNavigation();

    const DATA = restaurant.food.map((item, index) => {
        return { title: item.category, data: item.meals, index };
    });

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={"/"} asChild>
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
});
