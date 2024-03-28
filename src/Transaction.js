import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    SafeAreaView,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            editingIndex: -1,
        };
    }

    async componentDidMount() {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                this.setState({ todos: JSON.parse(storedTodos) });
            }
        } catch (error) {
            console.error('Error retrieving todos:', error);
        }
    }

    handleDelete = async (index) => {
        try {
            const { todos } = this.state;
            const updatedTodos = todos.filter((_, i) => i !== index);
            await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
            this.setState({ todos: updatedTodos });
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };


    handleEdit = (index) => {
        this.setState({ editingIndex: index });
    };

    handleSave = async (index) => {
        const { todos } = this.state;
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], ...this.state.todos[index] };
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        this.setState({ editingIndex: -1 });
    };

    render() {
        const { editingIndex } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.headerGrp}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image
                                style={styles.btnImage}
                                source={require('../assets/backbtn.png')} />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Transaction</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                        <Text>Index</Text>
                        <Text>Name</Text>
                        <Text>Cost</Text>
                        <Text>Actions</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'black', marginTop: 10 }} />
                    {this.state.todos.map((todo, index) => (
                        <View style={styles.listView} key={index}>
                            <Text style={{ width: 80 }}>{index + 1}</Text>
                            {editingIndex === index ? (
                                <>
                                    <TextInput
                                        style={{ width: 50 }}
                                        value={todo.Name}
                                        onChangeText={(text) => this.setState((prevState) => ({
                                            todos: prevState.todos.map((item, i) => (i === index ? { ...item, Name: text } : item)),
                                        }))}
                                    />
                                    <TextInput
                                        style={{ width: 50 }}
                                        value={todo.Cost}
                                        onChangeText={(text) => this.setState((prevState) => ({
                                            todos: prevState.todos.map((item, i) => (i === index ? { ...item, Cost: text } : item)),
                                        }))}
                                    />
                                </>
                            ) : (
                                <>
                                    <Text style={{ width: 50 }}>{todo.Name}</Text>
                                    <Text style={{ width: 50 }}>{todo.Cost}</Text>
                                </>
                            )}
                            <TouchableOpacity
                                style={styles.btnEdit}
                                onPress={() => (editingIndex === index ? this.handleSave(index) : this.handleEdit(index))}
                            >
                                <Text>{editingIndex === index ? 'Save' : 'Edit'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnDelete}
                                onPress={() => this.handleDelete(index)}
                            >
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headerGrp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 240,
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    btnImage: {
        width: 30,
        height: 30,
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 20,
    },
    btnEdit: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDelete: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Transaction;
