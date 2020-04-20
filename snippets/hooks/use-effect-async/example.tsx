import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useEffectAsync from "./use-effect-async";

function Component() {
    const [text, setText] = useState<string>("Nothing yet...");
    const [cleanupCounter, setCleanupCounter] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0); //Just used to "force refresh" the component

    useEffectAsync(() => {
        setText("Running!");
        return new Promise((res, rej) => {
            setTimeout(() => {
                setText("Finished!")
                res(() => {
                    console.log("Cleanup!");
                    setCleanupCounter(c => c + 1);
                });
            }, 1000);
        });
    }, [counter]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{text}</Text>
            <Text>Cleanup counter: {cleanupCounter}</Text>
            <TouchableOpacity onPress={() => setCounter(c => c + 1)}>
                <Text>Reload</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Component;