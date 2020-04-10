/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * Required extra node modules: nothing
 * 
 * Usage:
 *     import useInterval from "./use-interval";
 *     function Component() {
 *         const [number, setNumber] = useState<number>(0);
 *         useInterval(() => setNumber(prev => prev + 1), 100);
 *         return <Text>{number}</Text>;
 *     }
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