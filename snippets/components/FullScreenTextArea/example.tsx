import React, { useState } from "react";
import FullScreenTextArea from "./FullScreenTextArea";

function Component() {
    const [text, setText] = useState("");
    return <FullScreenTextArea value={text} onTextChange={setText} />;
}

export default Component;