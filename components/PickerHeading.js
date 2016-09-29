/**
 * Created by halversondm on 8/25/16.
 */
"use strict";
import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import styles from "./ToiletStyle";

class PickerHeading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let arrow;
        if (this.props.needArrow) {
            arrow = <Text style={styles.arrow}>&gt;</Text>;
        } else {
            arrow = <Text />;
        }
        return (
            <View style={{
                height: 60,
                padding: 4,
                backgroundColor: "#f6f7f8",
                borderBottomWidth: 1,
                borderColor: "black",
                margin: 2
            }}>
                <Text style={{fontWeight: "bold",
                    fontSize: 14}}>
                    {this.props.label}
                </Text>
                {arrow}
                {this.props.children}
            </View>
        );
    }
}

PickerHeading.propTypes = {
    needArrow: PropTypes.bool,
    label: PropTypes.string

};

PickerHeading.defaultProps = {
    needArrow: true,
    label: ""
};

export default PickerHeading;
