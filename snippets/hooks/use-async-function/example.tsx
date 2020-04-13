import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useAsyncFunction from "./use-async-function";

function Component() {
    function fetchDataFromServer() {
        // Simulate fetching data from server
        return new Promise<number>((res, rej) => {
            setTimeout(() => {
                res(Math.random());
            }, 1000);
        });
    }

    // By passing "true" as the 3rd argument we can autostart the function without having to call start()
    const { start, status, response } = useAsyncFunction(fetchDataFromServer, [], true);

    const isRunning = status === "running";
    const success = status === "success";
    const error = status === "error";

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {success && <Text>Function resolved with data {response}</Text>}
            {error && <Text>Function failed with error "{response}"</Text>}
            <TouchableOpacity onPress={start} disabled={isRunning}>
                <Text>{isRunning ? "Running" : "Fetch data from server"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Component;