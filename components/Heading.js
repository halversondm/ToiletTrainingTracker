/**
 * Created by halversondm on 8/25/16.
 */
"use strict";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

class Heading extends React.Component {
    render() {
        return (
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {this.props.label}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default Heading;