import React from "react";
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const AccountScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarBackground}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=56" }} // Replace with actual profile image
            style={styles.avatar}
          />
        </View>
        <Text style={[styles.name, isDarkMode && styles.darkText]}>Anish Prasad</Text>
        <Text style={[styles.email, isDarkMode && styles.darkText]}>
          anishprasad0000@gmail.com
        </Text>
        <Text style={[styles.phone, isDarkMode && styles.darkText]}>
          +91 8982* ***55
        </Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Additional Options */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="person-circle-outline" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="settings-outline" size={24} color={isDarkMode ? "#fff" : "#333"} />
        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ff758c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  phone: {
    fontSize: 16,
    color: "#555",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  darkText: {
    color: "#ffffff",
  },
});
