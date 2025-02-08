import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();

  const searchRepos = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();

      if (data.items?.length > 0) {
        setRepos(data.items);
      } else {
        setRepos([]);
        setError("No repositories found");
      }
    } catch (error) {
      setError("Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setRepos([]);
    setError(null);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.searchContainer, isDarkMode && styles.darkSearchContainer]}>
        <TextInput
          style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
          placeholder="Search GitHub Repositories..."
          placeholderTextColor={isDarkMode ? "#bbb" : "#666"}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchRepos}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color={isDarkMode ? "#aaa" : "gray"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={searchRepos} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      {error && repos.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Image 
            source={{ uri: "" }}
            style={styles.noResultsImage}
          />
          <Text style={[styles.errorText, isDarkMode && styles.darkText]}>{error}</Text>
        </View>
      )}

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFavorite = favorites.some((fav) => fav.id === item.id);
          return (
            <TouchableOpacity 
              style={[styles.repoCard, isDarkMode && styles.darkRepoCard]}
            >
              <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
              <View style={styles.repoInfo}>
                <Text style={[styles.repoName, isDarkMode && styles.darkText]}>{item.name}</Text>
                <Text style={[styles.repoDescription, isDarkMode && styles.darkText]} numberOfLines={2}>
                  {item.description || "No description available"}
                </Text>
                <View style={styles.repoStats}>
                  <View style={styles.statBox}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.statText}>{item.stargazers_count}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Ionicons name="git-branch" size={16} color="#007AFF" />
                    <Text style={styles.statText}>{item.forks_count}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Ionicons name="code-slash" size={16} color="gray" />
                    <Text style={styles.statText}>{item.language || "N/A"}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={26} 
                  color={isFavorite ? "#ff4757" : "gray"} 
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  darkContainer: { backgroundColor: "#121212" },

  searchContainer: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 3,
    marginBottom: 16,
  },
  darkSearchContainer: { backgroundColor: "#1e1e1e" },

  searchInput: { flex: 1, height: 50, fontSize: 16, color: "#000" },
  darkSearchInput: { color: "#fff" },

  clearButton: { padding: 8 },

  searchButton: { 
    backgroundColor: "#007AFF", 
    padding: 12, 
    borderRadius: 8, 
    marginLeft: 6 
  },

  loader: { marginTop: 20 },

  errorText: { color: "red", textAlign: "center", fontSize: 18, marginTop: 12 },
  darkText: { color: "#ffffff" },

  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  repoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 12,
  },
  darkRepoCard: { backgroundColor: "#1e1e1e" },

  avatar: { width: 50, height: 50, borderRadius: 25 },

  repoInfo: { flex: 1, marginLeft: 12 },

  repoName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  repoDescription: { fontSize: 14, color: "#555", marginTop: 4 },

  repoStats: { flexDirection: "row", marginTop: 6, gap: 14 },

  statBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statText: { marginLeft: 4, fontSize: 14, fontWeight: "bold", color: "#333" },

  favoriteIcon: { marginLeft: 12 },
});
