import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import firebase from 'firebase';
import  LoginForm  from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAjaHttv4PXDYaUkJEC8LrQU4M3eXY9hds',
            authDomain: 'authrn-858b8.firebaseapp.com',
            databaseURL: 'https://authrn-858b8.firebaseio.com',
            projectId: 'authrn-858b8',
            storageBucket: '',
            messagingSenderId: '1061739786467'
        });
    }
    render() {
        return (
            <View>
                <Header headerText="Autentication" />
                <LoginForm />
            </View>
        )
    }
}

export default App;