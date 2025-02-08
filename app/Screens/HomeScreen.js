import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const HomeScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const { favorites } = useFavorites();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://dev.to/api/articles?tag=technology&top=5");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>GitHub Explorer</Text>
        <TouchableOpacity style={[styles.favoritesButton, isDarkMode && styles.darkFavoritesButton]}>
          <Text style={[styles.favoritesText, isDarkMode && styles.darkText]}>
            ⭐ Favourites ({favorites.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Blog List */}
      <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Latest Tech Blogs</Text>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.blogCard, isDarkMode && styles.darkBlogCard]}
            onPress={() => router.push({ pathname: item.url })}
          >
            <Image
              source={{ uri: item.cover_image || "https://via.placeholder.com/300" }}
              style={styles.blogImage}
            />
            <View style={styles.blogInfo}>
              <Text style={[styles.blogTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
              <Text style={[styles.blogAuthor, isDarkMode && styles.darkText]}>by {item.user.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  darkContainer: { backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  darkText: { color: "#ffffff" },
  favoritesButton: { backgroundColor: "#ffcc00", padding: 10, borderRadius: 8 },
  darkFavoritesButton: { backgroundColor: "#555" },
  favoritesText: { fontWeight: "bold", color: "#333" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },

  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  darkBlogCard: { backgroundColor: "#222", shadowColor: "#fff" },
  blogImage: { width: "100%", height: 180 },
  blogInfo: { padding: 12 },
  blogTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  blogAuthor: { fontSize: 14, color: "#777" },
});
