import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaProvider
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* Wrap the entire app with SafeAreaProvider */}
      <ThemeProvider>
        <FavoritesProvider>
          <MainLayout />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function MainLayout() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, isDarkMode && styles.darkSafeArea]} // Dynamic background color
      edges={["top", "bottom"]} // Ensure top and bottom safe areas are respected
    >
      <MainTabs />
    </SafeAreaView>
  );
}

function MainTabs() {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 10, // Better spacing
          height: 65,
          backgroundColor: isDarkMode ? "#121212" : "#fff",
          borderTopLeftRadius: 15, // Rounded corners for better UI
          borderTopRightRadius: 15,
          elevation: 5, // Shadow effect for better visibility
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          title: "Favourites",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AccountScreen"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Default light mode background
  },
  darkSafeArea: {
    backgroundColor: "#121212", // Dark mode background
  },
});