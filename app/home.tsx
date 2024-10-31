import React from "react";
import { Text, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

import { ping_server } from "@/js/apis.js";

export default function Home() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                Welcome to the Home Screen!
            </ThemedText>

            <Button title="ping" color="#4CCF50" onPress={ping_server} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
