import React from "react";
import { View, Text } from "react-native";
import { init, translate } from "./i18n";

init(); // ONCE before using

function Component() {
    return (
        <View>
            <Text>{translate("some-key")}</Text>
            <Text>{translate("nested.object")}</Text>
        </View>
    );
}

export default Component;