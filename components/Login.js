/**
 * Created by halversondm on 8/23/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import styles from "./ToiletStyle";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", key: "", isLoading: false, message: ""};
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    onLoginPressed() {
        this.setState({isLoading: true});
        setTimeout(() => {
            this.setState({isLoading: false});
            this.props.navigator.replace({id: "track"});
        }, 1000);
    }

    render() {
        var spinner = this.state.isLoading ? <ActivityIndicator size="large"/> : <View />;
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="email address" autoCapitalize="none"
                           keyboardType="email-address"
                           onChangeText={(text) => this.setState({email: text})}/>
                <TextInput style={styles.input} placeholder="password" autoCapitalize="none"
                           onChangeText={(text) => this.setState({key: text})} secureTextEntry={true}/>
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onLoginPressed}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

export default Login;
