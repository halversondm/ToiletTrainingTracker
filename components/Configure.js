/**
 * Created by halversondm on 8/25/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text, View,
    ScrollView, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import Heading from "./Heading";
import styles from "./ToiletStyle";
import {connect} from "react-redux";
import {endpointBuilder} from "./environment";

class Configure extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.data, {message: "", isLoading: false});
        this.onSavePressed = this.onSavePressed.bind(this);
    }

    onSavePressed() {
        var currentState = this.state;
        this.setState({isLoading: true});
        var dataToSend = Object.assign({}, currentState, {emailAddress: this.props.data.loginForm.email});
        var data = JSON.stringify(dataToSend);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpointBuilder("/saveConfig"));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                this.setState({isLoading: false});
            } else {
                this.setState({isLoading: false, message: "Oops! Something went wrong. Please try again."});
                console.log("unsucc ", xhr.responseText);
            }
        };
        xhr.onerror = () => {
            this.setState({isLoading: false, message: "Please check your Internet connection and try again."});
            console.log(xhr);
        };
        xhr.send(data);

        setInterval(() => {this.setState({message: ""})}, 2000);
    }

    render() {
        var spinner = this.state.isLoading ? <ActivityIndicator size="large"/> : <View />;
        return (
            <ScrollView style={styles.container}>
                <Heading label="Interval Between Dry Checks" needArrow={false}/>
                <TextInput style={styles.input} onChangeText={(minutes) => {
                    let config = this.state.config;
                    config.intervalBetweenDryCheck = minutes;
                    this.setState({config: config});
                }} value={this.state.config.intervalBetweenDryCheck} placeholder="in minutes" keyboardType={"numeric"}/>

                <Heading label="Interval Between Toilet Visits" needArrow={false}/>
                <TextInput style={styles.input} onChangeText={(minutes) => {
                    let config = this.state.config;
                    config.intervalBetweenToiletVisit = minutes;
                    this.setState({config: config});
                }} value={this.state.config.intervalBetweenToiletVisit} placeholder="in minutes" keyboardType={"numeric"}/>

                <Heading label="Trainee Duration on Toilet" needArrow={false}/>
                <TextInput style={styles.input} onChangeText={(minutes) => {
                    let config = this.state.config;
                    config.traineeDurationOnToilet = minutes;
                    this.setState({config: config});
                }} value={this.state.config.traineeDurationOnToilet} placeholder="in minutes" keyboardType={"numeric"}/>

                <Heading label="Reward For Voiding" needArrow={false}/>
                <TextInput style={styles.input} onChangeText={(reward) => {
                    let config = this.state.config;
                    config.rewardForVoiding = reward;
                    this.setState({config: config});
                }} value={this.state.config.rewardForVoiding} />

                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSavePressed}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </ScrollView>
        );
    }
}

function select(state) {
    return {
        data: state
    };
}

export default connect(select)(Configure);