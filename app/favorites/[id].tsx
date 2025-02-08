import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const FavoriteDetails = () => {
  const { id } = useLocalSearchParams(); // Get repo ID from URL params
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repositories/${id}`);
        const data = await response.json();
        setRepo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo?.name}</Text>
      <Text style={styles.description}>{repo?.description || "No description available"}</Text>
      <Text style={styles.subText}>Created: {new Date(repo?.created_at).toDateString()}</Text>
      <Text style={styles.subText}>Last Updated: {new Date(repo?.updated_at).toDateString()}</Text>
      <Image source={{ uri: repo?.owner?.avatar_url }} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#f8f9fa", 
    alignItems: "center" 
  },

  loader: { marginTop: 20 },

  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 10 
  },

  description: { 
    fontSize: 16, 
    color: "#555", 
    textAlign: "center", 
    marginBottom: 10 
  },

  subText: { 
    fontSize: 14, 
    color: "#777", 
    marginBottom: 5 
  },

  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginTop: 12 
  },
});

export default FavoriteDetails;
