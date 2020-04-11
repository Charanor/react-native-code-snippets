#!/bin/bash

# Author: Jesper Sporron
# Author GitHub: https://github.com/Charanor
# Project GitHub: https://github.com/Charanor/react-native-code-snippets
# License: Creative Commons Zero v1.0 Universal (CC0)
# 
# Description:
#     This is a bash script that will run your app on Android. Also does some cleanup before,
#     like removing the build folder (which can sometimes cause issues when versions change)
#     and "adb reverse"-ing to your connected device or emulator to ensure that it is connected.
# 
# Please keep this comment at the top of the file to show support (even though you are free to remove it) :)

rm -rf ./android/app/build
"$ANDROID_HOME\platform-tools\adb" reverse tcp:8081 tcp:8081
react-native run-android
$SHELL