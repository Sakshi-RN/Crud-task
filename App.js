import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import Transaction from './src/Transaction';
import IncomeExpense from './src/IncomeExpense'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="IncomeExpense" component={IncomeExpense} options={{ headerShown: false }} />
        <Stack.Screen name="Transaction" component={Transaction} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
