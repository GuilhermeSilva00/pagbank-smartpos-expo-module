import { useEvent } from 'expo';
import PagbankSmartposExpoModule, { PlugPagSuccess, PlugPagError } from 'pagbank-smartpos-expo-module';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { 
  ACTIVATION_TEST_CODE, 
  doAsyncInitializeAndActivatePinpad 
} from './PlugPagModule/doAsyncInitializeAndActivatePinpad';

export default function App() {
  //const onChangePayload = useEvent(PagbankSmartposExpoModule, 'onChange');

  async function handleDoAsyncInitializeAndActivatePinpad() {
    try {
      const result = await doAsyncInitializeAndActivatePinpad(ACTIVATION_TEST_CODE);
      console.log('result: ', result);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Async functions">
          <Button
            title="InitializeAndActivatePinpad"
            onPress={handleDoAsyncInitializeAndActivatePinpad}
          />
        </Group>
        <Group name="Result"></Group>
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

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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