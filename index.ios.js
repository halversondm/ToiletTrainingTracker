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
import {Provider} from "react-redux";
import {createStore} from "redux";
import trackerStore from "./components/reducers";

let store = createStore(trackerStore);

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
                return <Configure navigator={nav}/>;
            default:
                return <Login navigator={nav}/>;
        }
    }

    render() {
        const navBar = <Navigator.NavigationBar routeMapper={{
            LeftButton: (route, navigator, index, navState) => {
                if (route.id === "config") {
                    return (<TouchableHighlight onPress={() => {
                        navigator.pop()
                    }}><Text style={{padding: 4}}>Done</Text></TouchableHighlight>);
                }
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
                            <Text style={{padding: 4}}>Configure</Text>
                        </TouchableHighlight>);
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
            <Provider store={store}>
                <Navigator style={styles.container}
                           initialRoute={{id: "login"}}
                           renderScene={this.renderScene}
                           configureScene={configScene}
                           navigationBar={navBar}
                />
            </Provider>
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
