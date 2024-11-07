import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <Stack
          screenOptions={{
            headerTintColor: "#000",
            headerTitleAlign: "center",
            contentStyle: { backgroundColor: "#F4F4F4" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="about/agree"
            options={{ title: "Agree Or Disagree" }}
          />
          <Stack.Screen
            name="about/responses"
            options={{ title: "Responses" }}
          />

          <Stack.Screen name="about/index" options={{ title: "About Us" }} />

          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="createAccount" options={{ headerShown: false }} />
          <Stack.Screen name="not-found" />
        </Stack>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
