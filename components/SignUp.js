/**
 * Created by halversondm on 9/13/16.
 */
"use strict";

import React, {Component} from "react";
import {View, TextInput, TouchableHighlight, Text, ActivityIndicator} from "react-native";
import {endpointBuilder} from "./environment";
import styles from "./ToiletStyle";

const disconnected = "It doesn't appear that you are connected to the Internet. Please connect and try again.";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", key: "", keyRetype: "", isLoading: false, message: ""};
    }

    onSavePressed = () => {
        if (this.state.key !== this.state.keyRetype) {
            this.setState({message: "Passwords do not match"});
            return;
        }
        this.setState({isLoading: true});
        var data = JSON.stringify(this.state);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpointBuilder("/signup"));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                this.setState({isLoading: false, message: "Signed up! Please login."});
            } else {
                console.log("unsucc ", xhr.responseText);
                this.setState({
                    isLoading: false,
                    message: "Email address already signed up.  Please use another address."
                });
            }
        };
        xhr.onerror = () => {
            console.log(xhr);
            this.setState({isLoading: false, message: disconnected});
        };
        xhr.send(data);
    };

    render() {
        var spinner = this.state.isLoading ? <ActivityIndicator size="large"/> : <View />;
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="name" autoCapitalize="none"
                           onChangeText={(text) => this.setState({name: text})}/>
                <TextInput style={styles.input} placeholder="email address" autoCapitalize="none"
                           keyboardType="email-address" autoCorrect={false}
                           onChangeText={(text) => this.setState({email: text})}/>
                <TextInput style={styles.input} placeholder="password" autoCapitalize="none"
                           onChangeText={(text) => this.setState({key: text, message: ""})} secureTextEntry={true}/>
                <TextInput style={styles.input} placeholder="re-enter password" autoCapitalize="none"
                           onChangeText={(text) => this.setState({keyRetype: text, message: ""})}
                           secureTextEntry={true}/>
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSavePressed}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

export default SignUp;