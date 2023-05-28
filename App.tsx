import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import Dialog from 'react-native-dialog';
import {useAppSelector, useAppDispatch, actions} from './store';

function App() {
  const counters = useAppSelector(state => state.value);
  const dispatch = useAppDispatch();
  const addCounter = () => dispatch(actions.addCounter());
  return (
    <View>
      <Button title="Add counter" onPress={addCounter} />
      {counters.map((counter, index) => (
        <Counter key={index} {...counter} index={index} />
      ))}
    </View>
  );
}

const Counter = ({
  count,
  counterName,
  index,
}: {
  count: number;
  counterName: string;
  index: number;
}) => {
  const dispatch = useAppDispatch();

  const increment = () => dispatch(actions.incremented({index}));
  const decrement = () => dispatch(actions.decremented({index}));
  const reset = (resetValue: number) =>
    dispatch(actions.reset({index, resetValue}));

  const [tempStartFrom, setTempStartFrom] = React.useState('0');
  const [tempCounterName, setTempCounterName] = React.useState('Counter');
  const [_counterName, setCounterName] = React.useState('Counter');
  const [counterDialogVisible, setCounterDialogVisible] = React.useState(false);
  const [startFromDialogVisible, setStartFromDialogVisible] =
    React.useState(false);

  const showCounterDialog = () => {
    setTempCounterName(counterName);
    setCounterDialogVisible(true);
  };

  const hideCounterDialog = () => {
    setCounterDialogVisible(false);
  };

  const showStartFromDialog = () => {
    setTempStartFrom('0');
    setStartFromDialogVisible(true);
  };

  const hideStartFromDialog = () => {
    setStartFromDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={counterDialogVisible}>
        <Dialog.Title>Change Counter Name</Dialog.Title>
        <Dialog.Input
          value={tempCounterName}
          onChangeText={setTempCounterName}
        />
        <Dialog.Button label="Cancel" onPress={hideCounterDialog} />
        <Dialog.Button
          label="OK"
          onPress={() => {
            setCounterName(tempCounterName);
            hideCounterDialog();
          }}
        />
      </Dialog.Container>
      <Dialog.Container visible={startFromDialogVisible}>
        <Dialog.Title>Change Start Value</Dialog.Title>
        <Dialog.Input
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          value={tempStartFrom}
          onChangeText={setTempStartFrom}
        />
        <Dialog.Button label="Cancel" onPress={hideStartFromDialog} />
        <Dialog.Button
          label="OK"
          onPress={() => {
            reset(parseInt(tempStartFrom, 10));
            hideStartFromDialog();
          }}
        />
      </Dialog.Container>

      <Text>{counterName}</Text>
      <Text>{count}</Text>
      <View style={styles.buttonRow}>
        <View style={styles.flex1}>
          <Button title="-" onPress={decrement} />
          <Button title="start value" onPress={showStartFromDialog} />
        </View>
        <View style={styles.resetContainer}>
          <Button title="reset" onPress={() => reset(0)} />
        </View>
        <View style={styles.flex1}>
          <Button title="+" onPress={increment} />
          <Button title="change name" onPress={showCounterDialog} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {padding: 20},
  buttonRow: {
    flexDirection: 'row',
  },
  resetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default App;
