import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useGlobalState, GlobalStateProvider } from "./global-state";

function Component() {
    const { state, dispatch } = useGlobalState();
    return (
        <View>
            <Text>{state.data}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: "EXAMPLE", data: "Hello, world!" })}>
                <Text>Set data</Text>
            </TouchableOpacity>
        </View>
    );
}

function Core() {
    return (
        // Any component that calls "useGlobalState" must be wrapped inside GlobalStateProvider.
        // Have 1 GlobalStateProvider at the root of your app, do not wrap each component individually.
        <GlobalStateProvider>
            <Component />
        </GlobalStateProvider>  
    );
}

export default Core;
