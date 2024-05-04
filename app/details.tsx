import Colors from "@/constants/Colors";
import ParallaxScrollView from "@/parallax/ParallaxScrollView";
import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { restaurant } from "@/assets/data/restaurant";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
    const navigation = useNavigation();

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
                    <Text>DETAILS</Text>
                </View>
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
});
