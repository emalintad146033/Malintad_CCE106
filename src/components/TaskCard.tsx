import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Completed";
};

type TaskCardProps = {
  task: Task;
  onPress: () => void;
};

export default function TaskCard({
  task,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.details}>
          <Text style={styles.title}>
            {task.title}
          </Text>

          <Text style={styles.subject}>
            Subject: {task.subject}
          </Text>

          <Text style={styles.dueDate}>
            Due: {task.dueDate}
          </Text>
        </View>

        <Text
          style={[
            styles.status,
            task.status === "Completed"
              ? styles.completed
              : styles.pending,
          ]}
        >
          {task.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  pressed: {
    opacity: 0.7,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  details: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subject: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
  },

  dueDate: {
    marginTop: 5,
    fontSize: 13,
    color: "#64748B",
  },

  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    overflow: "hidden",
  },

  pending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },

  completed: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
});