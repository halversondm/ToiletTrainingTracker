"use strict";

import React, {Component} from 'react';
import {
    AppRegistry
} from "react-native";
import AppHome from "./components/AppHome";

class ToiletTrainingTracker extends Component {

    render() {
        return (<AppHome/>);
    }
}

AppRegistry.registerComponent('ToiletTrainingTracker', () => ToiletTrainingTracker);
