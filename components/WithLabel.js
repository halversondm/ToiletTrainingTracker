/**
 * Created by halversondm on 8/25/16.
 */
"use strict";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

class WithLabel extends Component {
    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>{this.props.label}</Text>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        marginVertical: 2,
        alignItems: 'center'
    },
    labelView: {
        marginRight: 10,
        paddingTop: 2
    },
    labelText: {
        fontWeight: "bold"
    }
});

export default WithLabel;