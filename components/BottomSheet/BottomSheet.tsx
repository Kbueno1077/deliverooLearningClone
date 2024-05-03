import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        []
    );

    const { dismiss } = useBottomSheetModal();

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{
                backgroundColor: Colors.lightGrey,
                borderRadius: 0,
            }}
        >
            <View style={styles.contentContainer}>
                <View style={styles.toggle}>
                    <TouchableOpacity style={styles.toggleActive}>
                        <Text style={styles.activeText}>Delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toggleInactive}>
                        <Text style={styles.inactiveText}>Pickup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeader}>Your Location</Text>

                <Link href="/(modal)/location-search" asChild>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color={Colors.medium}
                            />
                            <Text style={{ flex: 1 }}>Current location</Text>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={20}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </Link>

                <Text style={styles.subHeader}>Arrival Time</Text>

                <TouchableOpacity>
                    <View style={styles.item}>
                        <Ionicons
                            name="stopwatch-outline"
                            size={20}
                            color={Colors.medium}
                        />
                        <Text style={{ flex: 1 }}>Now</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            color={Colors.primary}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dismiss()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: { flex: 1 },
    toggle: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 16,
        marginTop: 16,
        justifyContent: "center",
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 30,
    },
    toggleInactive: {
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 30,
    },

    activeText: { color: "white", fontWeight: "bold" },
    inactiveText: { color: Colors.primary },

    subHeader: { fontSize: 16, margin: 16, fontWeight: "600" },

    item: {
        flexDirection: "row",
        padding: 16,
        gap: 8,
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: Colors.grey,
        borderWidth: 1,
    },

    button: {
        padding: 16,
        backgroundColor: Colors.primary,
        borderRadius: 4,
        margin: 16,
        alignItems: "center",
    },
    buttonText: { fontWeight: "bold", color: "#fff" },
});

export default BottomSheet;
