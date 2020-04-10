/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project GitHub: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This is a TextArea that will open up into full-screen when focused by the user.
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import React, { useState, useEffect } from "react";
import { TextInput, TextInputProps, StyleSheet, Keyboard } from "react-native";

type FullScreenTextAreaProps = TextInputProps;

function FullScreenTextArea(textInputProps: FullScreenTextAreaProps) {
    const [focused, setFocused] = useState(false);
    const [style, setStyle] = useState(textInputProps.style);

    useEffect(() => {
        if (focused)
            setStyle([textInputProps.style, styles.fullScreen]);
        else
            setStyle(textInputProps.style);
    }, [textInputProps.style, focused]);

    const onBlur = () => setFocused(false);
    const onFocus = () => setFocused(true);

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", onFocus);
        const hideSub = Keyboard.addListener("keyboardDidHide", onBlur);
        return () => {
            hideSub.remove();
            showSub.remove();
        };
    }, []);

    return <TextInput {...textInputProps} {...{ onFocus, onBlur, style }} />;
}

const styles = StyleSheet.create({
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        elevation: 1000,
    }
});

export default FullScreenTextArea;