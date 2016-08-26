/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';
import Login from "./components/Login";
import Track from "./components/Track";
import Configure from "./components/Configure";

class ToiletTrainingTracker extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(route, nav) {
        switch (route.id) {
            case "login":
                return <Login navigator={nav}/>;
            case "track":
                return <Track navigator={nav}/>;
            case "config":
                return <Configure navigator={nav} />;
            default:
                return <Login navigator={nav}/>;
        }
    }

    render() {
        const navBar = <Navigator.NavigationBar routeMapper={{
            LeftButton: (route, navigator, index, navState) => {
                return null;
            },
            RightButton: (route, navigator, index, navState) => {
                switch (route.id) {
                    case "login":
                        return null;
                    case "track":
                        return (<TouchableHighlight onPress={() => {
                            navigator.push({id: "config"})
                        }}>
                            <Text>Configure</Text>
                        </TouchableHighlight>);
                    case "config":
                        return (<TouchableHighlight onPress={() => {
                            navigator.pop()
                        }}><Text>Done</Text></TouchableHighlight>);
                }
            },
            Title: (route, navigator, index, navState) => {
                return (<Text style={styles.description}>Toilet Training Tracker</Text>);
            }
        }}/>;
        const configScene = (route) => {
            if (route.sceneConfig) {
                return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight
        };
        return (
            <Navigator style={styles.container}
                       initialRoute={{id: "login"}}
                       renderScene={this.renderScene}
                       configureScene={configScene}
                       navigationBar={navBar}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    }
});

AppRegistry.registerComponent('ToiletTrainingTracker', () => ToiletTrainingTracker);
