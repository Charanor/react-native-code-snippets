/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project Github: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * Required extra node modules: "react-native-locaize", "i18n-js"
 * 
 * To install all required modules you can copy+paste this code:
 * With yarn:
 *     yarn add react-native-localize i18n-js
 * With npm:
 *     npm install --save react-native-localize i18n-js
 * 
 * Description:
 *     This is a module that allows you to seamlessly translate your app in real-time.
 * 
 * Usage:
 *     import {init as initI18n, translate as $} from "./i18n";
 *     
 *     initI18n(); // ONCE before using
 * 
 *     const message1 = $("some-key");
 *     const message2 = $("nested.object");
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import I18n, { Scope, TranslateOptions } from "i18n-js";

//////////////////////////////////////////////////
/// These are the only things you need to edit ///
//////////////////////////////////////////////////

// The key is a language code ("en", "fr", "en-gb", "sv", etc.)
// The value is the "require"d path to a JSON file containing the translation
// (check example json files in project).
const SUPPORTED_LANGUAGES = {
    en: require("./example-en.json"),
    sv: require("./example-sv.json"),
};

const FALLBACK = { languageTag: "en", isRTL: false };

///////////////////////////////////////
/// Static stuff, no need to change ///
///////////////////////////////////////

async function init() {
    const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(SUPPORTED_LANGUAGES)) ||
        FALLBACK;

    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    I18n.translations = { [languageTag]: SUPPORTED_LANGUAGES[languageTag] };
    I18n.locale = languageTag;

    I18n.HAS_INIT = true;
}

function translate(key: Scope, opt?: TranslateOptions): string {
    if (!I18n.HAS_INIT) return "<error: initialize i18n before using>";
    return I18n.translate(key, opt);
}

export { init, translate };