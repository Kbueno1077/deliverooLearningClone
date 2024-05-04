import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

export default function Restaurants() {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                padding: 15,
            }}
        >
            {restaurants.map((restaurant, index) => {
                return (
                    <Link href={"/details"} key={index} asChild>
                        <TouchableOpacity>
                            <View style={styles.restaurantCard} key={index}>
                                <Image
                                    source={restaurant.img}
                                    style={styles.image}
                                />

                                <View style={styles.restaurantBox}>
                                    <Text style={styles.restaurantText}>
                                        {restaurant.name}
                                    </Text>
                                    <Text style={{ color: Colors.green }}>
                                        {restaurant.rating} {restaurant.ratings}
                                    </Text>

                                    <Text style={{ color: Colors.medium }}>
                                        {restaurant.distance}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    restaurantCard: {
        width: 300,
        height: 250,
        backgroundColor: "#fff",
        marginEnd: 10,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        borderRadius: 4,
    },

    image: {
        flex: 5,
        width: undefined,
        height: undefined,
    },

    restaurantBox: {
        flex: 2,
        padding: 10,
    },

    restaurantText: {
        paddingVertical: 5,
        fontSize: 14,
        fontWeight: "bold",
    },
});
