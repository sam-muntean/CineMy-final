import React, { Component } from 'react';
import {View, Text, Button, TextInput, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

export class LoginForm extends Component {
    static navigationOptions = {
        header:null,
    };
    state = { email: '', password: '', error: '' };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View>
                    <Text>  MOVIES  </Text>
                </View>
                <TextInput
                    label='USER'
                    placeholder='user/mail'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    label='PASSWORD'
                    autoCorrect={false}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                <Button color="#123456" onPress={ () =>
                {
                    const { email, password } = this.state;
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(() => { this.setState({ error: '', email:"", password:"" });navigate('Movies')})
                        .catch(() => { console.log("LOGIN ERROR")
                            this.setState({ error: 'Authentication failed.'});
                        });
                }
                }
                        title="LOG IN" />
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#123456',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    header:{
        backgroundColor: '#111111',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        //marginTop:-40,

    },
    headerText:{
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
};