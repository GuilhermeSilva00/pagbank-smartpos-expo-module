import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Container from "./container";
import Button from "./button";

type Props = {
  onActivateTerminal: () => void;
  loading?: boolean;
}

export default function Activation({ onActivateTerminal, loading }: Props) {
  return (
    <Container>
      <View style={styles.box}>
        <Text style={styles.title}>É necessário ativar o terminal para realizar vendas</Text>
        <Button label="Ativar terminal" onPress={onActivateTerminal} loading={loading} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  title: {
    fontSize: 18,
    margin: 20,
    textAlign: "center"
  }
})

