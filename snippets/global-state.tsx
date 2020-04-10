/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This is a module that allows your app to have a global state without using Redux. You can interract with
 *     the global state using hooks or a context consumer.
 * 
 * Usage:
 *     import { useGlobalState } from "./global-state";
 *     function Component() {
 *         const { state, reducer } = useGlobalState();
 *         return <Text>{state.data}</Text>;
 *     }
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import React, { createContext, useReducer, useContext } from "react";

//////////////////////////////////////////////////
/// These are the only things you need to edit ///
//////////////////////////////////////////////////

// This is your initial state. The exported type is automatically determined from this.
const INITIAL_STATE = {
    data: ""
};
type GlobalStateType = typeof INITIAL_STATE;

// Change this to match your actions. "type" should be present on all actions.
type ExampleAction = { type: "EXAMPLE", data: "hello, world!" };
type Action = ExampleAction;

function reducer(state: GlobalStateType, action: Action): GlobalStateType {
    let newState: GlobalStateType = null;
    switch (action.type) {
        case "EXAMPLE": {
            const { data } = action;
            newState = { ...state, data }; // Do this for every action.
            break;
        }
        default:
            // Note: This should NEVER happen but because JS is dynamic and 
            // still compiles when TS has syntax errors it can...
            throw new Error(`GlobalState cannot handle action ${action}`);
    }
    listeners.forEach(listener => listener(newState));
    return newState;
}

///////////////////////////////////////
/// Static stuff, no need to change ///
///////////////////////////////////////

type DispatchFunc = (action: Action) => void;

type GlobalStateProviderType = {
    state: GlobalStateType,
    dispatch: DispatchFunc;
}

type StateListener = (state: GlobalStateType) => void;

const GlobalStateContext = createContext<GlobalStateProviderType>(null);
const listeners: StateListener[] = [];

function GlobalStateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

function addListener(listener: StateListener) {
    listeners.push(listener);
    return () => {
        // Must calculate here, can't use return value from 'push'
        const idx = listeners.indexOf(listener);
        if (idx >= 0) listeners.splice(idx, 1);
    };
}

function useGlobalState() {
    return useContext(GlobalStateContext);
}

export {
    GlobalStateProvider,
    GlobalStateContext,
    GlobalStateProviderType,
    GlobalStateType,
    DispatchFunc,
    Action,
    addListener,
    useGlobalState
};