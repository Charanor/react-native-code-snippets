/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This hook makes it easy to call async functions from your functional components.
 *     Especially useful when you need to fetch data from a server (or similar).
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import React, { useReducer, useCallback, useEffect, Reducer, useMemo, DependencyList } from "react";

type Status = "ready" | "running" | "success" | "error";

type Response<T, R> = {
    status: Status;
    response?: R | string;
    start: (data?: T) => void;
};

type State<R> = {
    status: Status;
    result?: R;
    error?: string;
};

const INITIAL_STATE: State<any> = {
    status: "ready",
    result: undefined,
    error: undefined
};

type Action<R> =
    | { type: "start" }
    | { type: "success", result: R }
    | { type: "error", error: string }
    | { type: "reset" };

/**
 * @param fn a function returning a Promise.
 * @param dependencies list of dependencies that "fn" relies on.
 * @param autostart if true, starts the promise without having to call start()
 */
function useAsyncFunction<T, R>(fn: (data?: T) => Promise<R>, dependencies: DependencyList = [], autostart: boolean = false): Response<T, R> {
    const memoizedFunction = useCallback(fn, dependencies);

    const [{ status, result, error }, dispatch] = useReducer((state: State<R>, action: Action<R>): State<R> => {
        switch (action.type) {
            case "reset":
                return { status: "ready", result: undefined, error: undefined };
            case "start":
                return { ...state, status: "running", result: undefined, error: undefined };
            case "success":
                return { ...state, status: "success", result: action.result, error: undefined };
            case "error":
                return { ...state, status: "error", error: action.error, result: undefined };
        }
    }, INITIAL_STATE);

    // If the function changes we reset
    useEffect(() => dispatch({ type: "reset" }), [memoizedFunction]);

    const waitForData = useCallback(async () => {
        dispatch({ type: "start" });
        try {
            const result = await memoizedFunction();
            dispatch({ type: "success", result });
        } catch (error) {
            dispatch({ type: "error", error });
        }
    }, [memoizedFunction]);

    // autostart
    useEffect(() => {
        // Only autostart if we haven't run this function already
        if (status !== "ready" || !autostart) return;
        waitForData();
    }, [autostart, waitForData, status]);

    // manual start
    const start = useCallback(() => {
        // Only start if we aren't currently running
        if (status === "running") return;
        waitForData();
    }, [waitForData, status]);

    const response = result ?? error;
    return { start, status, response };
}

export default useAsyncFunction;