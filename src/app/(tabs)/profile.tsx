import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Edieson Malintad");
  const [program, setProgram] =
    useState("BS Information Technology");

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(false);

    if (name.trim() === "") {
      setError("Full Name is required.");
      return;
    }

    setError("");
    setSaved(true);
  };

  const isDisabled = name.trim() === "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Image
        source={{
          uri: "data:image/jpeg;base64,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",
        }}
        style={styles.avatar}
      />

      <Text style={styles.avatarText}>
        Student Profile
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>
          Full Name *
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            setSaved(false);
            setError("");
          }}
          placeholder="Enter your full name"
          style={styles.input}
        />

        <Text style={styles.label}>
          Program / Course
        </Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setSaved(false);
          }}
          placeholder="Enter your program"
          style={styles.input}
        />

        {error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        {saved && (
          <View style={styles.successBox}>
            <Text style={styles.success}>
              Profile saved successfully!
            </Text>
          </View>
        )}

        <Pressable
          onPress={handleSave}
          disabled={isDisabled}
          style={({ pressed }) => [
            styles.saveButton,
            isDisabled && styles.disabledButton,
            pressed &&
              !isDisabled &&
              styles.pressedButton,
          ]}
        >
          <Text style={styles.saveText}>
            Save Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F5F9",
  },

  title: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 30,
    fontWeight: "800",
    color: "#1E293B",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginBottom: 10,
  },

  avatarText: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 25,
  },

  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },

  label: {
    marginBottom: 7,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },

  error: {
    marginTop: 10,
    color: "#DC2626",
    fontWeight: "600",
  },

  successBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#DCFCE7",
  },

  success: {
    color: "#15803D",
    fontWeight: "700",
    textAlign: "center",
  },

  saveButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#94A3B8",
  },

  pressedButton: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});