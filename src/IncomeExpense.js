import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class IncomeExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cost: '',
    
    };
  }

  handleAddIncome = async () => {
    const { name, cost } = this.state;
    const newTodo = { Name: name, Cost: cost };
    try {
      let todos = await AsyncStorage.getItem('todos');
      todos = todos ? JSON.parse(todos) : [];
      todos.push(newTodo);
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      this.props.navigation.navigate('Transaction');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  render() {
    const { name, cost } = this.state;
    const isInputFilled = name !== '' && cost !== '';

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerGrp}>
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('HomeScreen') }}>
              <Image
                style={styles.btnImage}
                source={require('../assets/backbtn.png')} />
            </TouchableOpacity>
            <Text style={styles.headingText}>Add Income-Expense</Text>
          </View>
          <View style={styles.radioGroup}>
            <Text style={styles.radioText}>Income</Text>
            <TouchableOpacity style={styles.radioBtn}>
              <View style={styles.circle} />
            </TouchableOpacity>
            <Text style={[styles.radioText, { color: 'red' }]}>Expense</Text>
            <TouchableOpacity style={[styles.radioBtn, { borderColor: 'red' }]}>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Enter Name'
            placeholderTextColor={'grey'}
            style={styles.inputStyle}
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextInput
            placeholder='Enter Cost'
            placeholderTextColor={'grey'}
            style={styles.inputStyle}
            value={cost}
            onChangeText={(text) => this.setState({ cost: text })}
          />
          <TextInput
          placeholder='description'
            placeholderTextColor={'grey'}
            style={styles.inputStyle}
    
          />
          <TouchableOpacity
            style={[styles.btnStyle, !isInputFilled && { backgroundColor: 'grey' }]} 
          
            onPress={isInputFilled ? this.handleAddIncome : null} 
           
            disabled={!isInputFilled} 
            
          >
            <Text style={styles.btnText}>Add Income</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  headerGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnImage: {
    width: 30,
    height: 30
  },
  btnStyle: {
    backgroundColor: 'black',
    padding: 8,
    color: '#ffff',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontWeight: 'bold',
    color: '#ffff'
  },
  inputStyle: {
    borderWidth: 2,
    padding: 8,
    color: '#ffff',
    marginTop: 10,
    borderRadius: 6,
    color: 'black'
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 240
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderColor: 'green',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5
  },
  radioText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default IncomeExpense;
