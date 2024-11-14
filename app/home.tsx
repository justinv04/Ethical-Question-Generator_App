import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, router } from "expo-router";

import { getSessionUsername } from "@/js/utilities.js";

export default function Home() {
    const [username, setUsername] = useState("");

    const fetchData = async () => {
        let username_str = await getSessionUsername();
        if (username_str != null) {
            username_str = username_str.split(" ")[0];
            setUsername(username_str);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                Hello, {username}!
            </ThemedText>

            <ThemedView style={{ gap: 16 }}>
                <ThemedView style={styles.nav}>
                    <Button
                        title="Prompt A Question"
                        color="#7700FF"
                        onPress={() => router.push("./tabs/PromptAQuestion")}
                    />
                    <Button
                        title="View Responses"
                        color="#7700FF"
                        onPress={() => router.push("./tabs/ViewResponses")}
                    />
                </ThemedView>

                <Button
                    title="About The Team"
                    color="#7700FF"
                    onPress={() => router.push("./tabs/AboutUs")}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },

    title: {
        margin: 10,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFF",
    },

    nav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    button: {
        borderRadius: 10,
    },
});
