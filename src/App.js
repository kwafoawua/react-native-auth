import React, { Component } from 'react';
import { View } from 'react-native';
import {Button, Header, Spinner} from './components/common';
import firebase from 'firebase';
import  LoginForm  from './components/LoginForm';

class App extends Component {

    state = { loggedIn : null};
    componentWillMount() {
        firebase.initializeApp({
            apiKey: '',
            authDomain: 'authrn-858b8.firebaseapp.com',
            databaseURL: 'https://authrn-858b8.firebaseio.com',
            projectId: 'authrn-858b8',
            storageBucket: '',
            messagingSenderId: '1061739786467'
        });
        //si el usuario se desloguea user pasa a ser null o undefined, sirve para saber si un usuario esta ao no logueado
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({loggedIn: true});
            }else {
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    //puse el view porq no se ve el boton si no wtf
                    <View style={{flexDirection:'row', paddingTop:10}}>
                        <Button onPress={()=>{firebase.auth().signOut()}}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={{alignSelf:"center"}}>
                        <Spinner size="large"/>
                    </View>);
        }
    }
    render() {
        return (
            <View>
                <Header headerText="Autentication" />
                {this.renderContent()}
            </View>
        )
    }
}

export default App;