# How can I contribute?
Simply fork this repo and create a pull request! There are a few requirements:
- **The code must be yours.** Do not just copy+paste code snippets from Stack Overflow.
- **The snippet must be non-trivial.** E.g. very simple style changes (big red text component) is not allowed. Creating a text component that animates the text like a typewriter is fine.
- **The file name must be descriptive of the snippet.** `CoolText` is bad. `TypewriterAnimatedText` is good.
- **The snippet must be self-contained.** One file = one snippet. A snippet should never be split into multiple files, except for example files (see: `i18n` snippet for acceptable separation). If a snippet contains several self-contained items, e.g. a `text-components` snippet, separate those into separate snippets. E.g. `TypewriterAnimatedText` and `LineFollowingText`.
- **Follow the naming convention.** Snippet naming convention are of the form `my-snippet`. Component snippets are an exception and follows PascalCase (e.g. `TypewriterAnimatedText`).
- **Place the snippets in the correct folder.** Look through the repository to see what folder your snippet should be placed in. E.g. components should be placed into `snippets/components/` and hooks into `snippets/hooks/`.

## File header
In addition to these rules, you should place this file header at the top of your snippet. If one of the headers does not apply to you (e.g. no website) simply remove that line.
`Required extra node modules` should not include `react` or `react-native` since those are implied (but SHOULD include `expo`, if needed). If there are no required node modules you can remove the "To install all required modules..." lines.
```javascript
/**
 * Author: {Your Name}
 * Author GitHub: https://github.com/{your github}
 * Author GitLab: https://gitlab.com/{your gitlab}
 * Author [other service]: https://[website of other]/{your other}
 * Author Website: https://[name of website]
 * Project GitHub: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * Required extra node modules: {comma-separated modules, e.g. "react-native-reanimated" or "react-native-localization"}
 *
 * To install all required modules you can copy+paste this code:
 * With yarn:
 *     yarn add {space-separated modules, e.g. "react-native-reanimated react-native-localization"}
 * With npm:
 *     npm install --save {space-separated modules, e.g. "react-native-reanimated react-native-localization"}
 * 
 * Usage:
 *     {Example of usage. The more complete the better.}
 *     import { useGlobalState } from "./global-state";
 *     function Component() {
 *         const { state, reducer } = useGlobalState();
 *         return <Text>{state.data}</Text>;
 *     }
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */
```
