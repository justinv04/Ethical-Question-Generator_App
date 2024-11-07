import { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";
import { login_user } from "@/js/apis.js";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogIn() {
    if ((await login_user(username, password)) === true) {
      router.push("./home");
    } else {
      alert("Login Failed: Please Check Your Credentials");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Ethical Question Generator
      </ThemedText>

      <ThemedText type="title" style={styles.description}>
        Enter Your Username And Password:
      </ThemedText>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Link style={{width: '20%', height: 40, marginHorizontal: 10,}} href={"/about"}>about</Link>
        <Link style={{width: '20%', height: 40, marginHorizontal: 10}}  href={"/about/agree"}>agree</Link>
        <Link style={{width: '20%', height: 40, marginHorizontal: 10}}  href={"/about/responses"}>responses</Link>
      </View>

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
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" color="#4CCF50" onPress={handleLogIn} />

      <Button
        title="Sign Up"
        color="transparent"
        onPress={() => router.push("./createAccount")}
      />

      <Button
        title="Forgot Password?"
        color="transparent"
        onPress={() => alert("Forgot Password Pressed")} //  !! Replace with function to send user an confirmation email
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
