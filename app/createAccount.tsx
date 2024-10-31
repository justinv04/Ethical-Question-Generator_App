import { useState } from "react";
import { StyleSheet, TextInput, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

import { create_user } from "@/js/apis.js";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleCreateAccount() {
        if ((await create_user(username, email, password)) === true) {
            router.replace("./home");
        } else {
            alert("Account Creation Failed: Please Check Your Credentials");
        }
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                {" "}
                Create an Account{" "}
            </ThemedText>
            <ThemedText type="title" style={styles.description}>
                {" "}
                Enter Your Username, Email, And Password:{" "}
            </ThemedText>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Create"
                color="#4CCF50"
                onPress={handleCreateAccount}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 50,
    },
    description: {
        fontSize: 25,
    },
    input: {
        height: 40,
        width: "75%",
        borderColor: "#888",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        color: "#fff",
    },
});
