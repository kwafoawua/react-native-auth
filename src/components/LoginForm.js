import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner} from "./common";

class LoginForm extends Component {

    state = { email: '', password: '', error:'', loading: false};

    onLogin () {
        const { email, password } = this.state;
        this.setState({error:'', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                //no sabemos el contexto en el cual va a ser llamado por eso usamos el bind
                this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error:''
        })
    }

    onLoginFail() {
        this.setState({
            error: 'Fallo la Autenticacion',
            loading: false
        });
    }

    renderButton () {
        //component lvl state
        if( this.state.loading) {
            return <Spinner size="small"/>;
        }else {
            return (
                <Button onPress={this.onLogin.bind(this)}>
                    Log in
                </Button>
            );
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder='usuario@gmail.com'
                        label='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        autoCorrect={false}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        placeholder='password'
                        label='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;