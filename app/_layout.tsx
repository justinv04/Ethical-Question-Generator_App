import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="createAccount" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />

          <Stack.Screen name="tabs/AboutUs" options={{ headerShown: false }} />
          <Stack.Screen name="tabs/PromptAQuestion" options={{ headerShown: false }} />
          <Stack.Screen name="tabs/ViewResponses" options={{ headerShown: false }} />

          <Stack.Screen name="not-found" />
        </Stack>
  );
}
