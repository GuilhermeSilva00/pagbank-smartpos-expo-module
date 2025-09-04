import { useEvent } from 'expo';
import PagbankSmartposExpoModule, { PlugPagSuccess, PlugPagError, TransactionResult } from 'pagbank-smartpos-expo-module';
import { Button, SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { 
  ACTIVATION_TEST_CODE, 
  doAsyncInitializeAndActivatePinpad,
} from './PlugPagModule/doAsyncInitializeAndActivatePinpad';
import { doAsyncPayment } from './PlugPagModule/doAsyncPayment';

export default function App() {
  const onChangePayment = useEvent(PagbankSmartposExpoModule, 'onChangePayment');
  const onChangePaymentPassword = useEvent(PagbankSmartposExpoModule, 'onChangePaymentPassword');
  const [result, setResult] = React.useState<PlugPagSuccess | PlugPagError | TransactionResult | null>(null);
  const [loading, setLoading] = React.useState(false);

  console.log('onChangePayment: ', onChangePayment);
  console.log('onChangePaymentPassword: ', onChangePaymentPassword);

  async function handleDoAsyncInitializeAndActivatePinpad() {
    setLoading(true);
    try {
      const result = await doAsyncInitializeAndActivatePinpad(ACTIVATION_TEST_CODE);
      console.log('result: ', result);
      setResult(result);
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
        amount: 1000,
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
      setResult({ code: 'ERROR', message: 'Payment failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Pagbank Providers">
          <Button
            title="InitializeAndActivatePinpad"
            onPress={handleDoAsyncInitializeAndActivatePinpad}
          />
          <Button
            title="DoAsyncPayment"
            onPress={handleDoAsyncPayment}
          />
        </Group>
        <Group name="Result">
          {loading ? <Loader /> : null}
          <Text>{result ? JSON.stringify(result, null, 2) : ''}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

function Loader() {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};