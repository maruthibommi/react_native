import React, { useState, useEffect } from 'react';
import { View,Platform , Text, TextInput, TouchableOpacity, StyleSheet, DatePickerAndroid} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';




const HomePage = ({ route }) => {
  const { username } = route.params;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [shortNote, setShortNote] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fieldsFilled =
      name !== '' &&
      !isNaN(parseFloat(amount)) &&
      amount >= 0 &&
      type !== '' &&
      shortNote !== '' &&
      date !== '';

    setIsButtonDisabled(!fieldsFilled);
  }, [name, amount, type, shortNote, date]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${username}/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    const expense = {
      Name: name,
      Amount: parseFloat(amount),
      Type: type,
      ShortNote: shortNote,
      Date: date
    };

    try {
      const response = await axios.get(`http://localhost:5000/api/${username}/expenses`);
      const existingExpenses = response.data;
      const updatedExpenses = [...existingExpenses, expense];

      await axios.post(`http://localhost:5000/api/${username}/expenses`, { expenses: updatedExpenses });

      fetchExpenses();

      setName('');
      setAmount('');
      setType('');
      setShortNote('');
      setDate('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Short Note"
        value={shortNote}
        onChangeText={setShortNote}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
        onPress={handleAddExpense}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      {expenses.map((expense, index) => (
        <View key={index}>
          <Text>{expense.Name}</Text>
          <Text>{expense.Amount}</Text>
          <Text>{expense.Type}</Text>
          <Text>{expense.ShortNote}</Text>
          <Text>{expense.Date}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
