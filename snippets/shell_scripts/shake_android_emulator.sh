#!/bin/bash

# Author: Jesper Sporron
# Author GitHub: https://github.com/Charanor
# Project GitHub: https://github.com/Charanor/react-native-code-snippets
# License: Creative Commons Zero v1.0 Universal (CC0)
# 
# Description:
#     This is a bash script that will simulate a shake on your Android emulator. Useful for
#     opening the React Native debug menu.
# 
# Please keep this comment at the top of the file to show support (even though you are free to remove it) :)

"$ANDROID_HOME\platform-tools\adb" shell input keyevent 82
