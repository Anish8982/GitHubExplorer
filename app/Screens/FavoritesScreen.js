import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Favorite Repositories
      </Text>

      {favorites.length === 0 ? (
        <Text style={[styles.noFavoritesText, isDarkMode && styles.darkText]}>
          No favorites added yet.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.repoCard, isDarkMode && styles.darkRepoCard]}>
              <Image
                source={{ uri: item.owner.avatar_url }}
                style={styles.avatar}
              />
              <View style={styles.repoInfo}>
                <Text style={[styles.repoName, isDarkMode && styles.darkText]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.repoDescription,
                    isDarkMode && styles.darkSubText,
                  ]}
                  numberOfLines={2}
                >
                  {item.description || "No description available"}
                </Text>
                <View style={styles.repoStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="star" size={18} color="#FFD700" />
                    <Text style={styles.statText}>{item.stargazers_count}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="git-branch" size={18} color="#007AFF" />
                    <Text style={styles.statText}>{item.forks_count}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="code-slash" size={18} color="gray" />
                    <Text style={styles.statText}>
                      {item.language || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  darkContainer: { backgroundColor: "#121212" },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  darkText: { color: "#ffffff" },
  darkSubText: { color: "#bbbbbb" },

  noFavoritesText: { fontSize: 16, textAlign: "center", marginTop: 20 },

  repoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  darkRepoCard: { backgroundColor: "#1e1e1e", shadowColor: "#ffffff" },

  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },

  repoInfo: { flex: 1 },

  repoName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  repoDescription: { fontSize: 14, color: "#555", marginTop: 4 },

  repoStats: { flexDirection: "row", marginTop: 6, gap: 14 },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statText: { marginLeft: 4, fontSize: 14, fontWeight: "bold", color: "#333" },
});
