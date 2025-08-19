import { useEvent } from 'expo';
import PagbankSmartposExpoModule from 'pagbank-smartpos-expo-module';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';

export default function App() {
  //const onChangePayload = useEvent(PagbankSmartposExpoModule, 'onChange');

  const [message, setMessage] = React.useState('');

  async function initializeAndActivatePinpad() {
    try {
      const activationData = await PagbankSmartposExpoModule.doAsyncInitializeAndActivatePinpad('749879');
      console.log('Pinpad activated:', activationData);
      setMessage(`Pinpad activated: ${JSON.stringify(activationData)}`);
    } catch (error) {
      console.error('Error activating pinpad:', error);
      setMessage(`Error activating pinpad: ${error?.message || error}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Async functions">
          <Button
            title="initializeAndActivatePinpad"
            onPress={initializeAndActivatePinpad}
          />
        </Group>
        <Group name="Result">
          <Text>{message}</Text>
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
