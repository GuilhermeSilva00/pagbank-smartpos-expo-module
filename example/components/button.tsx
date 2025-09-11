import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  backgroundColor?: string;
};

export default function Button({ label, onPress, loading, backgroundColor = "#fce42c" }: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor }]}
    >
      {loading 
        ? (<ActivityIndicator size="large" color="#000" style={{ justifyContent: "center" }} />) 
        : (<Text style={styles.buttonText}>{label}</Text>)
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 18,
    borderRadius: 30,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
