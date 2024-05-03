import Categories from "@/components/Categories/Categories";
import Restaurants from "@/components/Restaurants/Restaurants";
import Colors from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Categories />

                <Text style={styles.header}>Top picks near you </Text>
                <Restaurants />

                <Text style={styles.header}>Offers near you </Text>
                <Restaurants />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { top: 50, backgroundColor: Colors.lightGrey },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 16,
    },
});
