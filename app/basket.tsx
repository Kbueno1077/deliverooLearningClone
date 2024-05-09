import SwipeableRow from "@/components/SwipeableRow";
import Colors from "@/constants/Colors";
import useBasketStore from "@/store/basketStore";
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Basktet() {
    const { products, total, clearCart, reduceProduct } = useBasketStore();
    const [order, setOrder] = useState(false);

    const FEES = { service: 2.99, delivery: 5.99 };

    const checkOut = () => {
        setOrder(true);
        clearCart();
    };

    return (
        <>
            {order && (
                <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    fallSpeed={2500}
                    fadeOut={true}
                    autoStart={true}
                />
            )}
            {order && (
                <View style={styles.orderDone}>
                    <Text style={styles.orderText}>
                        Thank you for your order!
                    </Text>
                    <Link href="/" asChild>
                        <TouchableOpacity style={styles.orderBtn}>
                            <Text style={styles.footerText}>New Order</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}

            {!order && (
                <>
                    <FlatList
                        data={products}
                        ListHeaderComponent={
                            <Text style={styles.section}>Items</Text>
                        }
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: Colors.grey,
                                }}
                            />
                        )}
                        renderItem={({ item, index }) => (
                            <SwipeableRow
                                key={item.id}
                                onDelete={() => reduceProduct(item)}
                            >
                                <View style={styles.row}>
                                    <Text style={styles.itemQuantity}>
                                        {item.quantity}x
                                    </Text>
                                    <Text style={styles.itemName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.itemPrice}>
                                        ${item.price * item.quantity}
                                    </Text>
                                </View>
                            </SwipeableRow>
                        )}
                        ListFooterComponent={
                            <View>
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: Colors.grey,
                                    }}
                                />
                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Subtotal</Text>
                                    <Text style={{ fontSize: 18 }}>
                                        ${total}
                                    </Text>
                                </View>

                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Services</Text>
                                    <Text style={{ fontSize: 18 }}>
                                        ${FEES.service}
                                    </Text>
                                </View>

                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>Delivery</Text>
                                    <Text style={{ fontSize: 18 }}>
                                        ${FEES.delivery}
                                    </Text>
                                </View>

                                <View style={styles.totalRow}>
                                    <Text style={styles.total}>
                                        Order Total
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        $
                                        {(
                                            total +
                                            FEES.service +
                                            FEES.delivery
                                        ).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        }
                    />

                    <View style={styles.footer}>
                        <SafeAreaView
                            edges={["bottom"]}
                            style={{ backgroundColor: "white" }}
                        >
                            <TouchableOpacity
                                onPress={checkOut}
                                style={styles.fullButton}
                            >
                                <Text style={styles.footerText}>Order now</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    orderDone: { marginTop: "50%", padding: 20, alignItems: "center" },
    orderText: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
    orderBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        width: 250,
        height: 50,
        justifyContent: "center",
        marginTop: 20,
    },

    row: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        gap: 20,
        alignItems: "center",
    },

    section: {
        fontSize: 20,
        paddingHorizontal: 10,
        fontWeight: "bold",
        margin: 16,
    },
    itemQuantity: { color: Colors.primary, fontSize: 18 },
    itemName: { flex: 1, fontSize: 18 },
    itemPrice: { fontSize: 18 },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
    },
    total: { fontSize: 18, color: Colors.mediumDark },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "white",
        padding: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10,
        },
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
        justifyContent: "center",
        height: 50,
    },
    footerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
