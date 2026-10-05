import { Stack } from 'expo-router';

import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';

function RootNavigator() {
  const { token, authLoading } = useAuth();

  if (authLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Protected guard={!token}>
        <Stack.Screen
          name="sign-in"
          options={{ title: 'Sign In' }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!!token}>
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="student/[id]"
          options={{ title: 'Student Details' }}
        />

        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal' }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}