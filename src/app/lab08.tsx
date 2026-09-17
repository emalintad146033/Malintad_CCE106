

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
  const [notMarkedCount, setNotMarkedCount] = useState(6);
  const [attendanceDate, setAttendanceDate] = useState("");

  // Set today's date
  useEffect(() => {
    const today = new Date();

    setAttendanceDate(
      today.toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // Automatically update attendance summary
  useEffect(() => {
    const present = students.filter(
      (student) => student.attendance === "Present"
    ).length;

    const absent = students.filter(
      (student) => student.attendance === "Absent"
    ).length;

    const notMarked = students.filter(
      (student) => student.attendance === "Not Marked"
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
    setNotMarkedCount(notMarked);
  }, [students]);

  // Mark attendance
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

  // Mark everyone present
  const markAllPresent = () => {
    setStudents((previousStudents) =>
      previousStudents.map((student) => ({
        ...student,
        attendance: "Present",
      }))
    );
  };

  // Reset attendance
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="#123B70"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSmall}>
            CLASSROOM MANAGEMENT
          </Text>

          <Text style={styles.headerTitle}>
            Attendance
          </Text>

          <Text style={styles.headerSubtitle}>
            Student Attendance Record
          </Text>

          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>
              ATTENDANCE DATE
            </Text>

            <Text style={styles.dateText}>
              {attendanceDate || "Loading date..."}
            </Text>
          </View>
        </View>

        {/* Attendance Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {students.length}
            </Text>
            <Text style={styles.summaryLabel}>
              Students
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

        {/* Attendance Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              Attendance Progress
            </Text>

            <Text style={styles.progressCount}>
              {students.length - notMarkedCount}/
              {students.length}
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    ((students.length - notMarkedCount) /
                      students.length) *
                    100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressSubtitle}>
            {notMarkedCount === 0
              ? "Attendance is complete!"
              : `${notMarkedCount} student(s) still need attendance`}
          </Text>
        </View>

        {/* Attendance Sheet Header */}
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>
              Class Attendance Sheet
            </Text>
            <Text style={styles.sheetSubtitle}>
              Mark each student's attendance below.
            </Text>
          </View>

          <View style={styles.sheetBadge}>
            <Text style={styles.sheetBadgeText}>
              LAB 08
            </Text>
          </View>
        </View>

        {/* Table Heading */}
        <View style={styles.tableHeader}>
          <Text style={[styles.columnNumber, styles.tableHeading]}>
            NO.
          </Text>

          <Text style={[styles.columnName, styles.tableHeading]}>
            STUDENT NAME
          </Text>

          <Text style={[styles.columnStatus, styles.tableHeading]}>
            STATUS
          </Text>
        </View>

        {/* Student Attendance Rows */}
        {students.map((student) => (
          <View
            key={student.id}
            style={styles.studentRow}
          >
            {/* Student Number */}
            <View style={styles.columnNumber}>
              <Text style={styles.studentNumber}>
                {String(student.id).padStart(2, "0")}
              </Text>
            </View>

            {/* Student Name and Status */}
            <View style={styles.columnName}>
              <Text style={styles.studentName}>
                {student.name}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  student.attendance === "Present"
                    ? styles.presentBadge
                    : student.attendance === "Absent"
                    ? styles.absentBadge
                    : styles.pendingBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    student.attendance === "Present"
                      ? styles.presentBadgeText
                      : student.attendance === "Absent"
                      ? styles.absentBadgeText
                      : styles.pendingBadgeText,
                  ]}
                >
                  {student.attendance === "Present"
                    ? "● Present"
                    : student.attendance === "Absent"
                    ? "● Absent"
                    : "○ Not Marked"}
                </Text>
              </View>
            </View>

            {/* Present / Absent Buttons */}
            <View style={styles.columnStatus}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.presentButton,
                  student.attendance === "Present" &&
                    styles.selectedPresent,
                ]}
                onPress={() =>
                  markAttendance(student.id, "Present")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>
                  P
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.absentButton,
                  student.attendance === "Absent" &&
                    styles.selectedAbsent,
                ]}
                onPress={() =>
                  markAttendance(student.id, "Absent")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>
                  A
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Button Labels */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.legendPresent}>
              <Text style={styles.legendText}>P</Text>
            </View>
            <Text style={styles.legendLabel}>
              Mark Present
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.legendAbsent}>
              <Text style={styles.legendText}>A</Text>
            </View>
            <Text style={styles.legendLabel}>
              Mark Absent
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.completeButton}
          onPress={markAllPresent}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>
            ✓ Mark All Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetAttendance}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>
            Reset Attendance
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Attendance Management System • Lab Activity 08
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  header: {
    backgroundColor: "#123B70",
    paddingTop: 45,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerSmall: {
    color: "#BFD7F5",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },

  headerSubtitle: {
    color: "#DCE9F8",
    fontSize: 15,
    marginTop: 5,
  },

  dateBox: {
    backgroundColor: "#214E83",
    padding: 14,
    borderRadius: 12,
    marginTop: 22,
  },

  dateLabel: {
    color: "#BFD7F5",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  dateText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 6,
  },

  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: -1,
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
    elevation: 3,
  },

  summaryNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#123B70",
  },

  presentNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#159447",
  },

  absentNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#DC3545",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
  },

  progressCount: {
    color: "#1D4ED8",
    fontWeight: "bold",
    fontSize: 15,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 13,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 10,
  },

  progressSubtitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 10,
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 28,
    marginBottom: 15,
  },

  sheetTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#123B70",
  },

  sheetSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
  },

  sheetBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  sheetBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1D4ED8",
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE7F5",
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  tableHeading: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#475569",
  },

  columnNumber: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  columnName: {
    flex: 1,
    paddingHorizontal: 7,
    justifyContent: "center",
  },

  columnStatus: {
    width: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },

  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF5",
  },

  studentNumber: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "bold",
  },

  studentName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },

  presentBadge: {
    backgroundColor: "#DCFCE7",
  },

  absentBadge: {
    backgroundColor: "#FEE2E2",
  },

  pendingBadge: {
    backgroundColor: "#F1F5F9",
  },

  statusBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },

  presentBadgeText: {
    color: "#15803D",
  },

  absentBadgeText: {
    color: "#B91C1C",
  },

  pendingBadgeText: {
    color: "#64748B",
  },

  actionButton: {
    width: 32,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginTop: 18,
    marginBottom: 20,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  legendPresent: {
    width: 25,
    height: 25,
    borderRadius: 6,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },

  legendAbsent: {
    width: 25,
    height: 25,
    borderRadius: 6,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
  },

  legendText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },

  legendLabel: {
    color: "#475569",
    fontSize: 12,
  },

  completeButton: {
    backgroundColor: "#123B70",
    marginHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  resetButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  resetButtonText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 22,
    marginHorizontal: 15,
  },
});