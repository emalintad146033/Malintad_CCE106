import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from "react-native";
  
  export default function LoadingScreen() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
  
        <Text style={styles.text}>
          Restoring session...
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    text: {
      marginTop: 15,
      fontSize: 16,
    },
  });