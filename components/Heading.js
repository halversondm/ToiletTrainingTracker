/**
 * Created by halversondm on 8/25/16.
 */
"use strict";
import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import styles from "./ToiletStyle";

class Heading extends Component {
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
            <View style={styles.headingView}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>
                        {this.props.label}
                    </Text>
                    {arrow}
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingValue}>{this.props.value}</Text>
                </View>
            </View>
        );
    }
}

Heading.propTypes = {
    needArrow: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string

};

Heading.defaultProps = {
    needArrow: true,
    label: "",
    value: ""
};

export default Heading;
