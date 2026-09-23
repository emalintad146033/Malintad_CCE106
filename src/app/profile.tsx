import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/api";

export default function Profile() {
  const router = useRouter();

  const {
    user,
    token,
    logout,
  } = useAuth();

  const [apiLoading, setApiLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  async function testProtectedAPI() {
    if (!token) {
      setApiMessage("No token found.");
      return;
    }

    try {
      setApiLoading(true);
      setApiMessage("");

      const profile = await getProfile(token);

      setApiMessage(
        `API Success! Welcome ${profile.firstName}.`
      );
    } catch (error: any) {
      if (error.message === "UNAUTHORIZED") {
        setApiMessage(
          "Session expired. Please login again."
        );

        await logout();

        router.replace("/login");
      } else {
        setApiMessage(
          "Unable to connect to the API."
        );
      }
    } finally {
      setApiLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Student Profile
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {user.firstName} {user.lastName}
        </Text>

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>
          {user.username}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {user.email}
        </Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>
          Student
        </Text>
      </View>

      <TouchableOpacity
        style={styles.apiButton}
        onPress={testProtectedAPI}
        disabled={apiLoading}
      >
        {apiLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            TEST PROTECTED API
          </Text>
        )}
      </TouchableOpacity>

      {apiMessage !== "" && (
        <Text style={styles.message}>
          {apiMessage}
        </Text>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 25,
    justifyContent: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 8,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  apiButton: {
    backgroundColor: "#1769aa",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  message: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600",
  },
});