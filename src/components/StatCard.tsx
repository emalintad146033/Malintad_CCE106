import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
  },

  label: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});