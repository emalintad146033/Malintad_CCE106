import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = useCallback(async () => {
    setLoading(true);
    setError('');
    setStudent(null);

    try {
      if (!id || !id.trim()) {
        throw new Error('Student ID is missing.');
      }

      if (!token) {
        throw new Error('You are not authenticated.');
      }

      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 401) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      if (response.status === 404) {
        throw new Error('Student record not found.');
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load student details (${response.status}).`
        );
      }

      const data = await response.json();

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid student data received from the server.');
      }

      setStudent(data as Student);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load student details.'
      );
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading student…</Text>
        </View>
      ) : error ? (
        <View style={styles.state} accessibilityLiveRegion="polite">
          <Text style={styles.error}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            style={styles.retryButton}
            onPress={loadStudent}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      ) : !student ? (
        <View style={styles.state}>
          <Text style={styles.text}>No student record available.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            ID: {student.id ?? id}
          </Text>

          <Text style={styles.text}>
            Name: {student.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {student.email || '—'}
          </Text>

          <Text style={styles.text}>
            Course: {student.course || '—'}
          </Text>
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },
  title: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: '700',
  },
  state: {
    gap: 12,
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 16,
    borderRadius: 12,
  },
  text: {
    color: '#536579',
    fontSize: 16,
  },
  error: {
    color: '#b42318',
    textAlign: 'center',
  },
  retryButton: {
    padding: 12,
  },
  retryText: {
    color: '#245bb2',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});