/**
 * Created by halversondm on 8/25/16.
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableHighlight, TextInput, ActivityIndicator
} from 'react-native';

class Configure extends Component {

    render() {
        return (
            <View style={styles.container}><Text style={styles.description}>Test Configure</Text></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    }
});

export default Configure;