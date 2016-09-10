/**
 * Created by halversondm on 8/23/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text, Linking,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import styles from "./ToiletStyle";
import {connect} from "react-redux";
import {updateForm, authenticated, notAuthenticated, setConfig} from "./actions";
import {endpointBuilder} from "./environment";

const disconnected = "It doesn't appear that you are connected to the Internet. Please connect and try again.";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", key: "", isLoading: false, message: ""};
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    onLoginPressed() {
        const notAuth = "Invalid email and/or password";
        this.setState({isLoading: true});
        this.props.dispatch(updateForm(this.state.email, this.state.key));
        var data = JSON.stringify(this.state);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpointBuilder("/loginService"));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                const response = JSON.parse(xhr.responseText);
                this.props.dispatch(authenticated());
                this.props.dispatch(setConfig(response.config, response.profileId));
                this.setState({isLoading: false});
                this.props.navigator.replace({id: "track"});
            } else {
                console.log("unsucc ", xhr.responseText);
                this.props.dispatch(notAuthenticated());
                this.setState({isLoading: false, message: notAuth});
            }
        };
        xhr.onerror = () => {
            console.log(xhr);
            this.setState({isLoading: false, message: disconnected});
        };
        xhr.send(data);
    }

    onSignupPressed() {
        const url = endpointBuilder("/signup");
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                this.setState({message: disconnected});
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => this.setState({message: disconnected}));
    }

    render() {
        var spinner = this.state.isLoading ? <ActivityIndicator size="large"/> : <View />;
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="email address" autoCapitalize="none"
                           keyboardType="email-address" autoCorrect={false}
                           onChangeText={(text) => this.setState({email: text})}/>
                <TextInput style={styles.input} placeholder="password" autoCapitalize="none"
                           onChangeText={(text) => this.setState({key: text})} secureTextEntry={true}/>
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onLoginPressed}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                {spinner}
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSignupPressed}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableHighlight>
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

function select(state) {
    return {
        data: state
    };
}

export default connect(select)(Login);
