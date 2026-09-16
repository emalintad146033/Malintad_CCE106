import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import StatCard from "@/components/StatCard";

export default function Dashboard() {
  const totalTasks = 5;
  const completedTasks = 2;
  const pendingTasks = 3;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>
          StudyFlow
        </Text>

        <Text style={styles.welcome}>
          Welcome back, Edieson!
        </Text>

        <Text style={styles.subtitle}>
          Stay organized and keep your studies
          on track.
        </Text>
      </View>

      {/* PROGRESS */}
      <Text style={styles.sectionTitle}>
        Your Progress
      </Text>

      <View style={styles.statsContainer}>
        <StatCard
          label="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          label="Completed"
          value={completedTasks}
        />

        <StatCard
          label="Pending"
          value={pendingTasks}
        />
      </View>

      {/* QUICK ACTION */}
      <Text style={styles.sectionTitle}>
        Quick Action
      </Text>

      <Link href={"/tasks" as any} asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            View My Tasks
          </Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F5F9",
  },

  header: {
    marginTop: 30,
    marginBottom: 30,
  },

  appTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2563EB",
  },

  welcome: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 10,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.6,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});