import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EventRouter from "./event-router";

type State = "one" | "two";

class ClassWithEvent {
    private _state: State = "one";
    private onStateChangedRouter: EventRouter<State>;

    public get state() {
        return this._state;
    }

    public set state(newState: State) {
        this.state = newState;
        this.onStateChangedRouter.trigger(newState);
    }

    public get onStateChanged() {
        return this.onStateChangedRouter.asEventFuncs();
    }
}

const instance = new ClassWithEvent();

function Component() {
    const [state, setState] = useState<State>(undefined);
    useEffect(() => {
        const sub = instance.onStateChanged.subscribe(setState);
        return sub.remove;
    }, []);

    return (
        <View>
            <Text>{state ?? "No state yet..."}</Text>
            <TouchableOpacity onPress={() => instance.state = "two"}>
                <Text>Set state</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Component;