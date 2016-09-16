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
} from "react-native";
import Login from "./components/Login";
import Track from "./components/Track";
import Configure from "./components/Configure";
import SignUp from "./components/SignUp";
import {Provider} from "react-redux";
import {createStore} from "redux";
import trackerStore from "./components/reducers";
import styles from "./components/ToiletStyle";

let store = createStore(trackerStore);

class ToiletTrainingTracker extends Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, nav) {
        switch (route.id) {
            case "login":
                return <Login navigator={nav}/>;
            case "track":
                return <Track navigator={nav}/>;
            case "config":
                return <Configure navigator={nav}/>;
            case "signup":
                return <SignUp navigator={nav}/>;
            default:
                return <Login navigator={nav}/>;
        }
    }

    leftButton(route, navigator, index, navState) {
        switch (route.id) {
            case "config":
                return (<TouchableHighlight onPress={() => {
                    navigator.pop()
                }}><Text style={styles.navLink}>Done</Text></TouchableHighlight>);
            case "track":
                return (<TouchableHighlight onPress={() => {
                    navigator.push({id: "login"});
                }}><Text style={styles.navLink}>Logout</Text></TouchableHighlight>);
            case "signup":
                return (<TouchableHighlight onPress={() => {
                    navigator.pop();
                }}><Text style={styles.navLink}>Login</Text></TouchableHighlight>);
            default:
                return null;
        }
    }

    rightButton(route, navigator, index, navState) {
        switch (route.id) {
            case "login":
                return (<TouchableHighlight onPress={() => {
                    navigator.push({id: "signup"})
                }}>
                    <Text style={styles.navLink}>Signup</Text>
                </TouchableHighlight>);
            case "track":
                return (<TouchableHighlight onPress={() => {
                    navigator.push({id: "config"})
                }}>
                    <Text style={styles.navLink}>Configure</Text>
                </TouchableHighlight>);
            default:
                return null;
        }
    }

    title(route, navigator, index, navState) {
        return (<Text style={styles.navDescription}>Toilet Training Tracker</Text>);
    }

    render() {
        const navBar = <Navigator.NavigationBar routeMapper={{
            LeftButton: (route, navigator, index, navState) => {
                return this.leftButton(route, navigator, index, navState);
            },
            RightButton: (route, navigator, index, navState) => {
                return this.rightButton(route, navigator, index, navState);
            },
            Title: (route, navigator, index, navState) => {
                return this.title(route, navigator, index, navState);
            }
        }}/>;
        const configScene = (route) => {
            if (route.sceneConfig) {
                return route.sceneConfig;
            }
            return Navigator.SceneConfigs.PushFromRight
        };
        return (
            <Provider store={store}>
                <Navigator style={styles.navContainer}
                           initialRoute={{id: "login"}}
                           renderScene={this.renderScene}
                           configureScene={configScene}
                           navigationBar={navBar}
                />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ToiletTrainingTracker', () => ToiletTrainingTracker);
