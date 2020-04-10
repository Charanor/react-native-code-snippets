import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useGlobalState } from "./global-state";

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

export default Component;