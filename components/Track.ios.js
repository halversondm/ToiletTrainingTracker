/**
 * Created by halversondm on 8/24/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet, ScrollView,
    Text, DatePickerIOS, PickerIOS, Modal,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';
import WithLabel from "./WithLabel";
import Heading from "./Heading";
import styles from "./ToiletStyle";
import {connect} from "react-redux";
import {endpointBuilder} from "./environment";
import {typeOfVoid1, promptedVisit, typeOfVoid2, typeOfVisit} from "./data";

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
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
                    <TouchableHighlight onPress={() => {
                        this.setState({showVoidOfTypePicker: true});
                    }}>
                        <View>
                            <Heading label="Type of Void" value={this.state.data.typeOfVoid}/>
                        </View>
                    </TouchableHighlight>
                    <Modal animationType={"slide"} visible={this.state.showVoidOfTypePicker} onRequestClose={() => {
                    }}>
                        <View style={styles.modalView}>
                            <View>
                                <TouchableHighlight onPress={() => {
                                    this.setState({showVoidOfTypePicker: false});
                                }}>
                                    <Text style={styles.modalText}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <PickerIOS selectedValue={this.state.data.typeOfVoid}
                                onValueChange={(typeOfVoid) => {
                                    let data = this.state.data;
                                    data.typeOfVoid = typeOfVoid;
                                    this.setState({data: data})
                                }}>
                            {
                                typeOfVoid1.map((typeOfVoid, key) => {
                                    return <PickerIOS.Item label={typeOfVoid} value={typeOfVoid} key={key}/>;
                                })
                            }
                        </PickerIOS>
                    </Modal>
                    <TouchableHighlight onPress={() => {
                        this.setState({showPromptedVisitPicker: true})
                    }}>
                        <View>
                            <Heading label="Prompted Visit?" value={this.state.data.promptedVisit}/>
                        </View>
                    </TouchableHighlight>
                    <Modal animationType={"slide"} visible={this.state.showPromptedVisitPicker} onRequestClose={() => {
                    }}>
                        <View style={styles.modalView}>
                            <View>
                                <TouchableHighlight onPress={() => {
                                    this.setState({showPromptedVisitPicker: false});
                                }}>
                                    <Text style={styles.modalText}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <PickerIOS selectedValue={this.state.data.promptedVisit}
                                onValueChange={(promptedVisit) => {
                                    let data = this.state.data;
                                    data.promptedVisit = promptedVisit;
                                    this.setState({data: data})
                                }}>
                            {
                                promptedVisit.map((promptedVisit, key) => {
                                    return <PickerIOS.Item label={promptedVisit} value={promptedVisit} key={key}/>;
                                })
                            }
                        </PickerIOS>
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
                                <Heading label="Wet or Dry?" value={this.state.data.typeOfVoid}/>
                            </View>
                        </TouchableHighlight>
                        <Modal animationType={"slide"} visible={this.state.showTypeOfVoidPicker} onRequestClose={() => {
                        }}>
                            <View style={styles.modalView}>
                                <View>
                                    <TouchableHighlight onPress={() => {
                                        this.setState({showTypeOfVoidPicker: false});
                                    }}>
                                        <Text style={styles.modalText}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <PickerIOS selectedValue={this.state.data.typeOfVoid}
                                    onValueChange={(typeOfVoid) => {
                                        let data = this.state.data;
                                        data.typeOfVoid = typeOfVoid;
                                        this.setState({data: data})
                                    }}>
                                {
                                    typeOfVoid2.map((typeOfVoid, key) => {
                                        return <PickerIOS.Item label={typeOfVoid} value={typeOfVoid} key={key}/>;
                                    })
                                }
                            </PickerIOS>
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
                        <Heading label="Date and Time" value={this.state.data.date.toLocaleString()}/>
                    </View>
                </TouchableHighlight>
                <Modal animationType={"slide"} visible={this.state.showDatePicker}>
                    <View style={styles.modalView}>
                        <View>
                            <TouchableHighlight onPress={() => {
                                this.setState({showDatePicker: false});
                            }}>
                                <Text style={styles.modalText}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <DatePickerIOS date={this.state.data.date} mode="datetime"
                                   onDateChange={(date) => {
                                       var data = this.state.data;
                                       data.date = date;
                                       this.setState({data: data});
                                   }}/>
                </Modal>
                <TouchableHighlight onPress={() => {
                    this.setState({showTypePicker: true})
                }}>
                    <View>
                        <Heading label="Type of Activity" value={this.state.data.typeOfActivity}/>
                    </View>
                </TouchableHighlight>
                <Modal animationType={"slide"} visible={this.state.showTypePicker} onRequestClose={() => {
                }}>
                    <View style={styles.modalView}>
                        <View>
                            <TouchableHighlight onPress={() => {
                                this.setState({showTypePicker: false});
                            }}>
                                <Text style={styles.modalText}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <PickerIOS selectedValue={this.state.data.typeOfActivity}
                            onValueChange={(typeOfActivity) => {
                                let data = this.state.data;
                                data.typeOfActivity = typeOfActivity;
                                data.typeOfVoid = "";
                                this.setState({data: data})
                            }}>
                        {
                            typeOfVisit.map((typeOfVisit, key) => {
                                return <PickerIOS.Item label={typeOfVisit} value={typeOfVisit} key={key}/>;
                            })
                        }
                    </PickerIOS>
                </Modal>
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
