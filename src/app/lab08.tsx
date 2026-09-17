
import { useEffect, useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Student = {
  id: number;
  name: string;
  attendance: "Present" | "Absent" | "Not Marked";
};

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Dwayne Lee Gonzales", attendance: "Not Marked" },
    { id: 2, name: "Edieson D. Malintad", attendance: "Not Marked" },
    { id: 3, name: "John Denver Descartin", attendance: "Not Marked" },
    { id: 4, name: "Mike Airon Iroy", attendance: "Not Marked" },
    { id: 5, name: "Jade Olacao", attendance: "Not Marked" },
    { id: 6, name: "Lhindex Gamones", attendance: "Not Marked" },
  ]);

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);


  useEffect(() => {
    const present = students.filter(
      (student) => student.attendance === "Present"
    ).length;

    const absent = students.filter(
      (student) => student.attendance === "Absent"
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [students]);


  const markAttendance = (
    id: number,
    status: "Present" | "Absent"
  ) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, attendance: status }
          : student
      )
    );
  };

  
  const resetAttendance = () => {
    setStudents((previousStudents) =>
      previousStudents.map((student) => ({
        ...student,
        attendance: "Not Marked",
      }))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Attendance List
        </Text>
        <Text style={styles.headerSubtitle}>
          Lab Activity 08
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.totalNumber}>
              {students.length}
            </Text>
            <Text style={styles.summaryLabel}>
              Total Students
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.presentNumber}>
              {presentCount}
            </Text>
            <Text style={styles.summaryLabel}>
              Present
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.absentNumber}>
              {absentCount}
            </Text>
            <Text style={styles.summaryLabel}>
              Absent
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Student Attendance
        </Text>

   
        {students.map((student) => (
          <View
            key={student.id}
            style={styles.studentCard}
          >
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {student.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.nameContainer}>
                <Text style={styles.studentName}>
                  {student.name}
                </Text>

                <Text
                  style={[
                    styles.statusText,
                    student.attendance === "Present"
                      ? styles.presentText
                      : student.attendance === "Absent"
                      ? styles.absentText
                      : styles.notMarkedText,
                  ]}
                >
                  Status: {student.attendance}
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.attendanceButton,
                  styles.presentButton,
                  student.attendance === "Present" &&
                    styles.selectedPresent,
                ]}
                onPress={() =>
                  markAttendance(student.id, "Present")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>
                  Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.attendanceButton,
                  styles.absentButton,
                  student.attendance === "Absent" &&
                    styles.selectedAbsent,
                ]}
                onPress={() =>
                  markAttendance(student.id, "Absent")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetAttendance}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>
            Reset Attendance
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    backgroundColor: "#1D4ED8",
    paddingTop: 55,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#DBEAFE",
    marginTop: 5,
  },

  scrollContent: {
    padding: 18,
    paddingBottom: 35,
  },

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    gap: 8,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },

  totalNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1D4ED8",
  },

  presentNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#16A34A",
  },

  absentNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#DC2626",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 15,
  },

  studentCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },

  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D4ED8",
  },

  nameContainer: {
    flex: 1,
  },

  studentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
  },

  statusText: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: "600",
  },

  presentText: {
    color: "#16A34A",
  },

  absentText: {
    color: "#DC2626",
  },

  notMarkedText: {
    color: "#64748B",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },

  attendanceButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  presentButton: {
    backgroundColor: "#16A34A",
  },

  absentButton: {
    backgroundColor: "#DC2626",
  },

  selectedPresent: {
    borderWidth: 3,
    borderColor: "#14532D",
  },

  selectedAbsent: {
    borderWidth: 3,
    borderColor: "#7F1D1D",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  resetButton: {
    backgroundColor: "#334155",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});