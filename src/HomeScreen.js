import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';




class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }




  render() {
    const { todos } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headingText}>Income Expense</Text>
        <TouchableOpacity style={[styles.btnStyle, { borderColor: 'green' }]}
        onPress={()=>{this.props.navigation.navigate('IncomeExpense')}}
        >
          <Text style={[styles.btnText, { color: 'green' }]}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyle, { borderColor: 'red' }]}>
          <Text style={[styles.btnText, { color: 'red' }]}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle}
               onPress={()=>{this.props.navigation.navigate('Transaction')}}>
          <Text style={styles.btnText}>Transactions</Text>
        </TouchableOpacity>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20
  },

  btnStyle: {
    borderWidth: 2,
    padding: 20,
    color: '#ffff',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8
  },

  btnText: {
    fontWeight: 'bold'
  }

});

export default HomeScreen;