/**
 * Created by halversondm on 8/24/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet, ScrollView,
    Text, DatePickerIOS, Picker,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import WithLabel from "./WithLabel";
import Heading from "./Heading";

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            typeOfActivity: "",
            duration: 0,
            typeOfVoid: "",
            promptedVisit: "",
            notes: ""
        };
        this.onSavePressed = this.onSavePressed.bind(this);
    }

    onSavePressed() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Heading label="Date"/>
                <DatePickerIOS date={this.state.date} mode="datetime"
                               onDateChange={(date) => this.setState({date: date})}/>
                <Heading label="Type of Activity"/>
                <Picker selectedValue={this.state.typeOfActivity}
                        onValueChange={(typeOfActivity) => {
                            this.setState({typeOfActivity: typeOfActivity})
                        }}>
                    <Picker.Item label="" value=""/>
                    <Picker.Item label="Toilet Visit" value="Toilet Visit"/>
                    <Picker.Item label="Underwear Check" value="Underwear Check"/>
                </Picker>
                <WithLabel label="Notes">
                    <TextInput style={styles.input} onChangeText={(text) => {
                        this.setState({notes: text})
                    }}/>
                </WithLabel>
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSavePressed}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
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
    }
});

export default Track;