import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

export default function Dish() {
    const { id } = useLocalSearchParams();
    const item = getDishById(+id);
    const router = useNavigation();

    const addToCart = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.goBack();
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["bottom"]}
        >
            <View style={styles.container}>
                <Animated.Image
                    entering={FadeIn.duration(500).delay(200)}
                    source={item?.img}
                    style={styles.image}
                />

                <View style={styles.body}>
                    <Animated.Text
                        entering={FadeInLeft.duration(400).delay(200)}
                        style={styles.dishName}
                    >
                        {item?.name}
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInLeft.duration(400).delay(400)}
                        style={styles.dishInfo}
                    >
                        {item?.info}
                    </Animated.Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.fullButton}
                        onPress={addToCart}
                    >
                        <Text style={styles.footerText}>
                            Add to for ${item?.price}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    image: { width: "100%", height: 300 },
    body: { padding: 20 },
    dishName: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
    dishInfo: { fontSize: 16, color: Colors.medium },
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
    footerText: { color: "white", fontWeight: "bold", fontSize: 16 },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
    },
});
