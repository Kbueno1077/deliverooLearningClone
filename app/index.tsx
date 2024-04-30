import { StyleSheet, View, Text } from "react-native";

export default function Page() {
    return (
        <View>
            <Text style={styles.title}>Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
