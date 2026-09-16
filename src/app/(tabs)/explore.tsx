import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ExploreScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        Explore
      </Text>

      <Text style={styles.subtitle}>
        Discover useful tools and study resources.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Study Tips
        </Text>

        <Text style={styles.cardText}>
          Plan your tasks, set priorities, and
          complete your school activities on time.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Productivity
        </Text>

        <Text style={styles.cardText}>
          Break large assignments into smaller
          tasks to make them easier to manage.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Stay Organized
        </Text>

        <Text style={styles.cardText}>
          Check your pending and completed tasks
          regularly to keep track of your progress.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F2F6FF",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#001F54",
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2563EB",
  },

  cardText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },
});