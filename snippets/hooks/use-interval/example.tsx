import React, { useState } from "react";
import { Text } from "react-native";
import useInterval from "./use-interval";

function Component() {
    const [number, setNumber] = useState<number>(0);
    useInterval(() => setNumber(prev => prev + 1), 100);
    return <Text>{number}</Text>;
}

export default Component;