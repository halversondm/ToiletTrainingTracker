/**
 * Created by halversondm on 8/25/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';

import Heading from "./Heading";
import styles from "./ToiletStyle";

class Configure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                intervalBetweenDryCheck: 0,
                intervalBetweenToiletVisit: 0,
                traineeDurationOnToilet: 0,
                rewardForVoiding: ""
            },
            profileId: 0
        };
        this.onSavePressed = this.onSavePressed.bind(this);
    }

    onSavePressed() {
        console.log(this.state);
    }

    render() {
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
                <TextInput style={styles.input} onChangeText={(minutes) => {
                    let config = this.state.config;
                    config.rewardForVoiding = minutes;
                    this.setState({config: config});
                }} value={this.state.config.rewardForVoiding} />

                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSavePressed}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

export default Configure;