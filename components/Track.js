/**
 * Created by halversondm on 8/24/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet, ScrollView,
    Text, DatePickerIOS, Picker, Modal,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import WithLabel from "./WithLabel";
import Heading from "./Heading";
import styles from "./ToiletStyle";

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.onSavePressed = this.onSavePressed.bind(this);
    }

    onSavePressed() {
        console.log(this.state);
    }

    render() {
        let toiletVisitAddOn;
        switch (this.state.data.typeOfActivity) {
            case "":
                toiletVisitAddOn = <View />;
                break;
            case "Toilet Visit":
                toiletVisitAddOn = <View>
                    <Heading label="Time Duration of Toilet Visit" needArrow={false} />
                    <TextInput style={styles.input} onChangeText={(duration) => {
                        let data = this.state.data;
                        data.duration = duration;
                        this.setState({data: data});
                    }} placeholder="in minutes"/>
                    <TouchableHighlight onPress={() => {
                        this.setState({showVoidOfTypePicker: true})
                    }}>
                        <View>
                            <Heading label="Type of Void"/>
                        </View>
                    </TouchableHighlight>
                    <Modal animationType={"slide"} visible={this.state.showVoidOfTypePicker}>
                        <View style={{marginTop: 22}}>
                            <View>
                                <TouchableHighlight onPress={() => {
                                    this.setState({showVoidOfTypePicker: false});
                                }}>
                                    <Text style={{padding: 4}}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Picker selectedValue={this.state.data.typeOfVoid}
                                onValueChange={(typeOfVoid) => {
                                    let data = this.state.data;
                                    data.typeOfVoid = typeOfVoid;
                                    this.setState({data: data})
                                }}>
                            <Picker.Item label="" value=""/>
                            <Picker.Item label="Urine" value="Urine"/>
                            <Picker.Item label="Bowel Movement" value="Bowel Movement"/>
                            <Picker.Item label="Both" value="Both"/>
                            <Picker.Item label="None" value="None"/>
                        </Picker>
                    </Modal>
                    <TouchableHighlight onPress={() => {
                        this.setState({showPromptedVisitPicker: true})
                    }}>
                        <View>
                            <Heading label="Prompted Visit?"/>
                        </View>
                    </TouchableHighlight>
                    <Modal animationType={"slide"} visible={this.state.showPromptedVisitPicker}>
                        <View style={{marginTop: 22}}>
                            <View>
                                <TouchableHighlight onPress={() => {
                                    this.setState({showPromptedVisitPicker: false});
                                }}>
                                    <Text style={{padding: 4}}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Picker selectedValue={this.state.data.promptedVisit}
                                onValueChange={(promptedVisit) => {
                                    let data = this.state.data;
                                    data.promptedVisit = promptedVisit;
                                    this.setState({data: data})
                                }}>
                            <Picker.Item label="" value=""/>
                            <Picker.Item label="Yes" value="Yes"/>
                            <Picker.Item label="No" value="No"/>
                        </Picker>
                    </Modal>
                </View>;
                break;
            default:
                toiletVisitAddOn =
                    <View>
                        <TouchableHighlight onPress={() => {
                            this.setState({showTypeOfVoidPicker: true})
                        }}>
                            <View>
                                <Heading label="Wet or Dry?"/>
                            </View>
                        </TouchableHighlight>
                        <Modal animationType={"slide"} visible={this.state.showTypeOfVoidPicker}>
                            <View style={{marginTop: 22}}>
                                <View>
                                    <TouchableHighlight onPress={() => {
                                        this.setState({showTypeOfVoidPicker: false});
                                    }}>
                                        <Text style={{padding: 4}}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Picker selectedValue={this.state.data.typeOfVoid}
                                    onValueChange={(typeOfVoid) => {
                                        let data = this.state.data;
                                        data.typeOfVoid = typeOfVoid;
                                        this.setState({data: data})
                                    }}>
                                <Picker.Item label="" value=""/>
                                <Picker.Item label="Wet" value="Wet"/>
                                <Picker.Item label="Dry" value="Dry"/>
                            </Picker>
                        </Modal>
                    </View>;
                break;
        }
        return (
            <ScrollView style={styles.container}>
                <TouchableHighlight onPress={() => {
                    this.setState({showDatePicker: true})
                }}>
                    <View>
                        <Heading label="Date"/>
                    </View>
                </TouchableHighlight>
                <Modal animationType={"slide"} visible={this.state.showDatePicker}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight onPress={() => {
                                this.setState({showDatePicker: false});
                            }}>
                                <Text style={{padding: 4}}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <DatePickerIOS date={this.state.data.date} mode="datetime"
                                   onDateChange={(date) => {
                                       let data = this.state.data;
                                       data.date = date;
                                       this.setState({data: data});
                                   }}/>
                </Modal>
                <TouchableHighlight onPress={() => {
                    this.setState({showTypePicker: true})
                }}>
                    <View>
                        <Heading label="Type of Activity"/>
                    </View>
                </TouchableHighlight>
                <Modal animationType={"slide"} visible={this.state.showTypePicker}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight onPress={() => {
                                this.setState({showTypePicker: false});
                            }}>
                                <Text style={{padding: 4}}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Picker selectedValue={this.state.data.typeOfActivity}
                            onValueChange={(typeOfActivity) => {
                                let data = this.state.data;
                                data.typeOfActivity = typeOfActivity;
                                this.setState({data: data})
                            }}>
                        <Picker.Item label="" value=""/>
                        <Picker.Item label="Toilet Visit" value="Toilet Visit"/>
                        <Picker.Item label="Underwear Check" value="Underwear Check"/>
                    </Picker>
                </Modal>
                {toiletVisitAddOn}
                <WithLabel label="Notes">
                    <TextInput style={styles.input} onChangeText={(text) => {
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

export default Track;
