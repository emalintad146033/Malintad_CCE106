
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="lab08"
        options={{ title: "Attendance List" }}
      />
    </Stack>
  );
}