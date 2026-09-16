import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TaskCard from "../../components/TaskCard";

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Completed";
};

type Filter = "All" | "Pending" | "Completed";

const tasks: Task[] = [
  {
    id: "1",
    title: "Research Paper",
    subject: "Research",
    dueDate: "September 20, 2026",
    status: "Pending",
  },
  {
    id: "2",
    title: "Java Programming Activity",
    subject: "Programming",
    dueDate: "September 18, 2026",
    status: "Completed",
  },
  {
    id: "3",
    title: "Database Design",
    subject: "Database",
    dueDate: "September 22, 2026",
    status: "Pending",
  },
  {
    id: "4",
    title: "UI Design Project",
    subject: "Web Development",
    dueDate: "September 25, 2026",
    status: "Pending",
  },
  {
    id: "5",
    title: "System Documentation",
    subject: "System Analysis",
    dueDate: "September 17, 2026",
    status: "Completed",
  },
];

export default function TasksScreen() {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredTasks = useMemo(() => {
    if (filter === "All") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [filter]);

  const openTask = (id: string) => {
    router.push(`/task/${id}`);
  };

  return (
    <View style={styles.container}>

      {/* BIG TASK HEADER */}
      <View style={styles.taskHeader}>
        <Text style={styles.taskHeaderTitle}>
          My Tasks
        </Text>

        <Text style={styles.taskHeaderSubtitle}>
          Stay organized and keep track of your school activities
        </Text>

        <View style={styles.taskHeaderBottom}>
          <Text style={styles.totalLabel}>
            Total Tasks
          </Text>

          <Text style={styles.totalNumber}>
            {tasks.length}
          </Text>
        </View>
      </View>

      {/* FILTER */}
      <View style={styles.filterContainer}>
        {(["All", "Pending", "Completed"] as Filter[]).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={({ pressed }) => [
                styles.filterButton,
                filter === item && styles.activeFilter,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* TASK COUNT */}
      <Text style={styles.countText}>
        {filteredTasks.length}{" "}
        {filteredTasks.length === 1 ? "task" : "tasks"} found
      </Text>

      {/* TASK LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => openTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No tasks found
            </Text>

            <Text style={styles.emptyText}>
              There are no {filter.toLowerCase()} tasks.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6FF",
  },

  /* BIG BLUE HEADER */
  taskHeader: {
    backgroundColor: "#001F54",
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 25,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  taskHeaderTitle: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  taskHeaderSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#DCE9FF",
  },

  taskHeaderBottom: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#123E7A",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#DCE9FF",
  },

  totalNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  /* FILTER */
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#E1E9F7",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 5,
  },

  filterButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    borderRadius: 12,
  },

  activeFilter: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
  },

  /* COUNT */
  countText: {
    marginTop: 18,
    marginHorizontal: 20,
    marginBottom: 10,

    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  /* LIST */
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  /* EMPTY */
  emptyContainer: {
    backgroundColor: "#E8EEF8",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});