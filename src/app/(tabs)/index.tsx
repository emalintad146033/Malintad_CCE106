import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  getCurrentUser,
  loginUser,
} from "../../services/authService";

import {
  deleteToken,
  getToken,
  saveToken,
} from "../../storage/tokenStorage";

type Profile = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  image?: string;
};

export default function Index() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const token = await getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      const user = await getCurrentUser(token);
      setProfile(user);
    } catch {
      await deleteToken();
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        setError("Please enter your username and password.");
        return;
      }

      const data = await loginUser(username, password);

      await saveToken(data.accessToken);

      const user = await getCurrentUser(data.accessToken);

      setProfile(user);
    } catch {
      setProfile(null);
      setError("Login failed. Check your username and password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();

    setProfile(null);
    setError("");

    setUsername("emilys");
    setPassword("emilyspass");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Checking session...
        </Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <View style={styles.loginCard}>
          <Text style={styles.title}>
            Secure Profile
          </Text>

          <Text style={styles.subtitle}>
            Sign in to view your protected profile
          </Text>

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />

          {error !== "" && (
            <Text style={styles.error}>
              {error}
            </Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableOpacity>

          <Text style={styles.testAccount}>
            Practice account: emilys
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.profileContainer}
    >
      <Text style={styles.title}>
        Secure Profile
      </Text>

      {profile.image && (
        <Image
          source={{ uri: profile.image }}
          style={styles.profileImage}
        />
      )}

      <Text style={styles.welcome}>
        Welcome, {profile.firstName}!
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>
          Full Name
        </Text>

        <Text style={styles.infoValue}>
          {profile.firstName} {profile.lastName}
        </Text>

        <Text style={styles.infoLabel}>
          Username
        </Text>

        <Text style={styles.infoValue}>
          {profile.username}
        </Text>

        <Text style={styles.infoLabel}>
          Email
        </Text>

        <Text style={styles.infoValue}>
          {profile.email}
        </Text>

        <Text style={styles.infoLabel}>
          User ID
        </Text>

        <Text style={styles.infoValue}>
          {profile.id}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f6ff",
  },

  loginCard: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666666",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },

  error: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#1769aa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  testAccount: {
    textAlign: "center",
    color: "#777777",
    marginTop: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f6ff",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555555",
  },

  profileContainer: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: "#f2f6ff",
    alignItems: "center",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 15,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    elevation: 4,
  },

  infoLabel: {
    fontSize: 13,
    color: "#777777",
    marginTop: 10,
  },

  infoValue: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 3,
  },
});