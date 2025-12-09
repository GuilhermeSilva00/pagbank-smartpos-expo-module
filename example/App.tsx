import { TransactionResult, onChangePayload, PrintResult, PagbankSmartposExpoModule } from 'pagbank-smartpos-expo-module';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { 
  ACTIVATION_TEST_CODE, 
  doAsyncInitializeAndActivatePinpad,
} from './PlugPagModule/doAsyncInitializeAndActivatePinpad';
import { doAsyncPayment } from './PlugPagModule/doAsyncPayment';
import { doAsyncVoidPayment } from './PlugPagModule/doAsyncVoidPayment';
import { doAsyncAbort } from './PlugPagModule/doAsyncAbort';
import { doAsyncPrintFile } from './PlugPagModule/doAsyncPrintFile';
import { getSerialNumber as getSerial } from './PlugPagModule/getSerialNumber';
import Feather from '@expo/vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

import Activation from './components/activation';
import Button from './components/button';

const pagseguro_image = require("./assets/pagseguro-logo.png");

export default function App() {

  const [result, setResult] = React.useState<TransactionResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [onChangePaymentMessage, setOnChangePaymentMessage] = React.useState("");

  React.useEffect(() => {
    const paymentSubscription = PagbankSmartposExpoModule.addListener(
      "onChangePayment",
      (event: onChangePayload) => {
        console.log("📡 Pagamento:", event);
        setOnChangePaymentMessage(event?.data?.customMessage ?? "");
      }
    );

    const passwordSubscription = PagbankSmartposExpoModule.addListener(
      "onChangePaymentPassword",
      (event: onChangePayload) => {
        console.log("🔑 Senha:", event);
      }
    );

    const printSubscription = PagbankSmartposExpoModule.addListener(
      "onChangePaymentPrint",
      (event: PrintResult) => {
        console.log("🖨 Impressão:", event);
      }
    );

    return () => {
      paymentSubscription.remove();
      passwordSubscription.remove();
      printSubscription.remove();
    }

  }, []);

  const INSERT_CARD_MESSAGE = "APROXIME, INSIRA OU PASSE O CARTÃO";
  const abortIsAvailable = onChangePaymentMessage === INSERT_CARD_MESSAGE

  React.useEffect(() => {
    async function terminalIsActive() {
      const storage = await AsyncStorage.getItem("@pagbank-smartpos-expo-module:isActive");
      const formatedStorage = storage ? JSON.parse(storage) : null;
      console.log(formatedStorage);
      setIsActive(formatedStorage)
    }

    terminalIsActive();
  }, []);

  function isTransactionResult(result: any): result is TransactionResult {
    return result && typeof result === 'object' && 'data' in result;
  }

  async function handleDoAsyncInitializeAndActivatePinpad() {
    setLoading(true);
    try {
      const result = await doAsyncInitializeAndActivatePinpad(ACTIVATION_TEST_CODE);
      console.log('result: ', result);
      AsyncStorage.setItem("@pagbank-smartpos-expo-module:isActive", JSON.stringify(result.status === "success"))
      setIsActive(result.status === "success")
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDoAsyncPayment() {
    setLoading(true);
    try {
      const result = await doAsyncPayment({
        type: 2,
        amount: 100,
        installmentType: 1,
        installments: 1,
        userReference: "user123",
        printReceipt: true,
        partialPay: false,
        isCarne: false,
      });
      console.log('Payment result: ', result);
      setResult(result);
    } catch (error) {
      console.log('Payment error: ', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDoAsyncVoidPayment() {
    console.log("result: ", result)
    if (!isTransactionResult(result) || !result.data.transactionCode || !result.data.transactionId) {
      console.log('Não há transação válida para estorno');
      return;
    }

    setLoading(true);
    try {
      const response = await doAsyncVoidPayment({
        transactionCode: result.data.transactionCode,
        transactionId: result.data.transactionId,
        printReceipt: true,
      });
      console.log('VoidPayment result: ', response);
    } catch (error) {
      console.log('VoidPayment error: ', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDoAsyncAbort() {
    setLoading(true);
    try {
      const response = await doAsyncAbort();
      console.log('AbortPayment result: ', response);
    } catch (error) {
      console.log('AbortPayment error: ', error);
    } finally {
      setLoading(false);
    }
  }

  function getSerialNumber() {
    const serial = getSerial();
    console.log('Serial Number: ', serial);
    return serial;
  }

  async function getLocalAssetFile(assetModule: number) { // <-- Create a print path to local image
    const asset = Asset.fromModule(assetModule);

    await asset.downloadAsync();

    const destPath = FileSystem.documentDirectory + asset.name;

    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: destPath,
    });

    return destPath.replace("file://", "");
  }

  async function handleDoAsyncPrintFile() {
    try {
      const filePath = await getLocalAssetFile(pagseguro_image);
      console.log("filePath: ", filePath)
      const response = await doAsyncPrintFile(filePath);
      console.log("PrintFile response: ", response)
    } catch (error) {
      console.log("PrintFile error: ", error)
    }
  }

  if(!isActive) {
    return <Activation onActivateTerminal={handleDoAsyncInitializeAndActivatePinpad} loading={loading}  />
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.printButton}
        onPress={handleDoAsyncPrintFile}
        disabled={loading}
      >
        <Feather name="printer" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.resultContainer}>
        <Image source={require("./assets/pagseguro-logo.png")} resizeMode="center" style={styles.logo}/>
        <Text style={styles.label}>{onChangePaymentMessage}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button label='Vender R$ 1,00' loading={loading} onPress={handleDoAsyncPayment}/>
        {abortIsAvailable && (
          <Button label='Cancelar venda' backgroundColor='#ef4444' onPress={handleDoAsyncAbort}/>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 280,
    height: 100
  },
  label: {
    fontSize: 18,
    fontWeight: 700
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 60,
    gap: 12,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    margin: 6
  },
  printButton: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fce42c",
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
})