/**
 * Created by halversondm on 8/24/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet, ScrollView, Platform, TimePickerAndroid,
    Text, DatePickerIOS, Picker, Modal, DatePickerAndroid,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import WithLabel from "./WithLabel";
import Heading from "./Heading";
import PickerHeading from "./PickerHeading";
import styles from "./ToiletStyle";
import {connect} from "react-redux";
import {endpointBuilder} from "./environment";
import {typeOfVoid1, promptedVisit, typeOfVoid2, typeOfVisit} from "./data";

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.renderDatePicker = this.renderDatePicker.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.showTimePicker = this.showTimePicker.bind(this);
    }

    onSavePressed = () => {
        var currentState = this.state.data;
        var dataToSend = Object.assign({}, currentState, {profileId: this.props.profileId});
        var data = JSON.stringify(dataToSend);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpointBuilder("/saveTrack"));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                this.setState(this.initialState());
            } else {
                console.log("unsucc ", xhr.responseText);
            }
        };
        xhr.onerror = () => {
            console.log(xhr);
        };
        xhr.send(data);
    };

    initialState = () => {
        return {
            data: {
                date: new Date(),
                typeOfActivity: "",
                duration: 0,
                typeOfVoid: "",
                promptedVisit: "",
                notes: ""
            },
            showDatePicker: false,
            showTypePicker: false,
            showTypeOfVoidPicker: false,
            showVoidOfTypePicker: false,
            showPromptedVisitPicker: false
        };
    };

    renderDatePicker() {
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    this.showDatePicker();
                }}>
                    <View>
                        <Heading label="Date" value={this.state.data.date.toLocaleString()}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    this.showTimePicker();
                }}>
                    <View>
                        <Heading label="Time" value={this.state.data.date.toLocaleString()}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    showDatePicker = async() => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.data.date
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var data = this.state.data;
                data.date = new Date(year, month, day);
                this.setState({data: data});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    showTimePicker = async() => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: this.state.data.date.getHours(),
                minute: this.state.data.date.getMinutes(),
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    };

    render() {
        var toiletVisitAddOn;
        switch (this.state.data.typeOfActivity) {
            case "":
                toiletVisitAddOn = <View />;
                break;
            case "Toilet Visit":
                toiletVisitAddOn = <View>
                    <Heading label="Time Duration of Toilet Visit" needArrow={false}/>
                    <TextInput style={styles.input} onChangeText={(duration) => {
                        let data = this.state.data;
                        data.duration = duration;
                        this.setState({data: data});
                    }} placeholder="in minutes"/>
                    <PickerHeading label="Type of Void">
                        <Picker selectedValue={this.state.data.typeOfVoid}
                                onValueChange={(typeOfVoid) => {
                                    let data = this.state.data;
                                    data.typeOfVoid = typeOfVoid;
                                    this.setState({data: data})
                                }}>
                            {
                                typeOfVoid1.map((typeOfVoid, key) => {
                                    return <Picker.Item label={typeOfVoid} value={typeOfVoid} key={key}/>;
                                })
                            }
                        </Picker>
                    </PickerHeading>
                    <TouchableHighlight onPress={() => {
                        this.setState({showPromptedVisitPicker: true})
                    }}>
                        <View>
                            <PickerHeading label="Prompted Visit?">
                                <Picker selectedValue={this.state.data.promptedVisit}
                                        onValueChange={(promptedVisit) => {
                                            let data = this.state.data;
                                            data.promptedVisit = promptedVisit;
                                            this.setState({data: data})
                                        }}>
                                    {
                                        promptedVisit.map((promptedVisit, key) => {
                                            return <Picker.Item label={promptedVisit} value={promptedVisit} key={key}/>;
                                        })
                                    }
                                </Picker>
                            </PickerHeading>
                        </View>
                    </TouchableHighlight>
                </View>;
                break;
            default:
                toiletVisitAddOn =
                    <View>
                        <PickerHeading label="Wet or Dry?">
                            <Picker selectedValue={this.state.data.typeOfVoid}
                                    onValueChange={(typeOfVoid) => {
                                        let data = this.state.data;
                                        data.typeOfVoid = typeOfVoid;
                                        this.setState({data: data})
                                    }}>
                                {
                                    typeOfVoid2.map((typeOfVoid, key) => {
                                        return <Picker.Item label={typeOfVoid} value={typeOfVoid} key={key}/>;
                                    })
                                }
                            </Picker>
                        </PickerHeading>
                    </View>;
                break;
        }
        return (
            <ScrollView style={styles.container}>
                {this.renderDatePicker()}
                <PickerHeading label="Type of Activity">
                    <Picker selectedValue={this.state.data.typeOfActivity}
                            onValueChange={(typeOfActivity) => {
                                let data = this.state.data;
                                data.typeOfActivity = typeOfActivity;
                                data.typeOfVoid = "";
                                this.setState({data: data})
                            }}>
                        {
                            typeOfVisit.map((typeOfVisit, key) => {
                                return <Picker.Item label={typeOfVisit} value={typeOfVisit} key={key}/>;
                            })
                        }
                    </Picker>
                </PickerHeading>
                {toiletVisitAddOn}
                <WithLabel label="Notes">
                    <TextInput style={styles.input} value={this.state.data.notes} onChangeText={(text) => {
                        let data = this.state.data;
                        data.notes = text;
                        this.setState({data: data});
                    }} multiline={true} numberOfLines={3}/>
                </WithLabel>
                <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSavePressed}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

function select(state) {
    return {
        profileId: state.profileId
    };
}

export default connect(select)(Track);
