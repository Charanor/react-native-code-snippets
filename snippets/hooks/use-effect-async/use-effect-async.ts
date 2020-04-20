/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This hook makes it easy to call useEffect with async functions.
 *     If your async function returns a cleanup function it will be called as normal.
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import { useEffect, EffectCallback, DependencyList } from "react";

/**
 * Calls useEffect with an async function. If the effect returns a cleanup function the cleanup function will be called, as a normal useEffect would.
 * @param effect the effect to run, returning a promise.
 * @param deps the dependencies of this effect.
 */
function useEffectAsync(effect: () => Promise<ReturnType<EffectCallback>>, deps?: DependencyList | undefined) {
    useEffect(() => {
        const promise = effect();
        return () => {
            promise.then(val => {
                if (typeof (val) === "function") {
                    val();
                }
            });
        };
    }, deps);
}

export default useEffectAsync;