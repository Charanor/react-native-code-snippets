/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project GitHub: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * Required extra node modules: "firebase"
 * 
 * To install all required modules you can copy+paste this code:
 * With yarn:
 *     yarn add firebase
 * With npm:
 *     npm install --save firebase
 * 
 * Description:
 *     This is a how-to-use tutorial on how to use the npm package "firebase". I prefer to use the firebase SDK
 *     over using 'react-native-firebase' since I've found the firebase SDK to be more stable.
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// When importing firebase modules, always follow this convention. First you import the "core" module like below.
import firebase from "firebase";
// Then you import all other modules like below. E.g. "firebase/database", "firebase/auth", etc.
import "firebase/database";

const USING_FIRESTORE = true;
const DATA_DOC = "some_folder";
const DATA_ID = "data";
const DATA_REF = `${DATA_DOC}/${DATA_ID}`;

// This has to be filled out with your firebase config data. This is found in your firebase project desktop.
const FIREBASE_CONFIG = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};

// This should be done ONCE! This should probably be placed in your "app.js" file along with the config above.
firebase.initializeApp(FIREBASE_CONFIG);

function App() {
    const [dirty, setDirty] = useState<boolean>(true);
    const [data, setData] = useState<string>(undefined);

    // If you're NOT using firestore, use this effect.
    // For full documentation, see https://firebase.google.com/docs/database/web/start
    useEffect(() => {
        if (USING_FIRESTORE) return;

        // Psst! This can be made cleaner using "use-async-function" or "use-effect-async" from this github repo ;)
        (async function () {
            // First we get a reference to the data we want. No calls to the online database yet.
            const ref = firebase.database().ref(DATA_REF);

            // Now we fetch the data we want. `once("value")` means that we want to fetch the value once (duh!).
            // There are ways to subscribe to changes in the data, so we don't have to manually fetch the value.
            // However for this simple example fetching the data every single time is just fine for us.
            const value = await ref.once("value"); // Fetch the value of DATA_REF once.

            // The value won't have a type, of course. There are ways to transform values using transformers, 
            // but for this simple example we won't explore that. Casting the value is just fine for us.
            const data = value.val() as { value: string };
            setData(data.value);
            setDirty(false);
        })();
    }, [dirty]);

    // If you're using firestore, use this effect.
    // No explanations here, because it's the same thought process as the non-firestore process.
    // For full documentation, see https://firebase.google.com/docs/firestore
    useEffect(() => {
        if (!USING_FIRESTORE) return;
        (async function () {
            const doc = firebase.firestore().doc(DATA_DOC);
            const value = await doc.get();
            const data = value.get(DATA_ID) as { value: string };
            setData(data.value);
            setDirty(false);
        })();
    }, [dirty]);

    async function addData() {
        const data = { value: "Lite data!" };
        if (USING_FIRESTORE) {
            const doc = firebase.firestore().doc(DATA_DOC);
            await doc.set(data);
        } else {
            // We get the ref just like above.
            const ref = firebase.database().ref(DATA_REF);
            // Then we set the data!
            await ref.set(data);
        }
        setDirty(true);
    }

    return (
        <View>
            <Text>Data från firebase:</Text>
            <Text>{data ?? "Laddar data..."}</Text>
            <TouchableOpacity onPress={addData}>
                <Text>Lägg till data</Text>
            </TouchableOpacity>
        </View>
    );
}
export default App;