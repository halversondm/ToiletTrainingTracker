/**
 * Created by halversondm on 8/29/16.
 */
"use strict";

import React from 'react';
import {StyleSheet} from 'react-native';

const ToiletStyle = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 30,
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
    },
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "black",
        margin: 2
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 14,
        flex: 2
    },
    arrow: {
        textAlign: "right",
        flex: 2
    },
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

export default ToiletStyle;
