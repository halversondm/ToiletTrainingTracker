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
        }, 2000);
    }

    render() {
        var spinner = this.state.isLoading ? <ActivityIndicator size="large"/> : <View />;
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter Email Address" autoCapitalize="none"
                           keyboardType="email-address"
                           onChangeText={(text) => this.setState({email: text})}/>
                <TextInput style={styles.input} placeholder="Enter Password" autoCapitalize="none"
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

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    input: {
        height: 36,
        padding: 4,
        margin: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    }
});

export default Login;
