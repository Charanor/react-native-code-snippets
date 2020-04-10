import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EventRouter from "./event-router";

type State = "one" | "two";

class ClassWithEvent {
    private _state: State = "one";
    private onStateChangedRouter: EventRouter<State>;

    constructor() {
        this.onStateChangedRouter = new EventRouter();
    }

    public get state() {
        return this._state;
    }

    public set state(newState: State) {
        this.state = newState;
        this.onStateChangedRouter.trigger(newState);
    }

    public get onStateChanged() {
        return this.onStateChangedRouter.subscribe;
    }
}

function Component() {
    const ref = useRef();
    function getInstance() {
        if(!ref.current) ref.current = new ClassWithEvent();
        return ref.current;
    }

    const [state, setState] = useState<State>(undefined);
    useEffect(() => {
        const sub = getInstance().onStateChanged(setState);
        return sub.remove;
    }, [ref.current]);

    return (
        <View>
            <Text>{state ?? "No state yet..."}</Text>
            <TouchableOpacity onPress={() => getInstance().state = "two"}>
                <Text>Set state</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Component;