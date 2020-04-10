/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This is a hook that makes "useInterval" declarative!
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import {useRef, useEffect} from "react";

type Callback = () => void;

function useInterval(callback: Callback, delayInMs: number) {
    const callbackRef = useRef<Callback>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delayInMs) {
            let id = setInterval(() => callbackRef.current(), delayInMs);
            return () => clearInterval(id);
        }
    }, [delayInMs]);
}

export default useInterval;