#!/bin/bash

# Author: Jesper Sporron
# Author GitHub: https://github.com/Charanor
# Project GitHub: https://github.com/Charanor/react-native-code-snippets
# License: Creative Commons Zero v1.0 Universal (CC0)
# 
# Description:
#     This is a bash script that will build your React Native app for Android and place it in a sub-folder
#     names as "[APP_NAME]-[today's date]-v[version count, if more on the same day]"
# 
# Please keep this comment at the top of the file to show support (even though you are free to remove it) :)

################################
# These things you should edit #
################################

APP_NAME=MyApp
OUTPUT_DIR=./releases

#################################
# Static stuff, no need to change
#################################

cd android && ./gradlew assembleRelease
BUILD_FILE=app/build/outputs/apk/release/app-release.apk
mkdir $OUTPUT_DIR
OUTPUT_FILE=$OUTPUT_DIR/$APP_NAME-$(date +%F)

if [[ -e $OUTPUT_FILE.apk ]]; then
    i=2
    while [[ -e $OUTPUT_FILE-v$i.apk ]]; do
        let i++
    done
    OUTPUT_FILE=$OUTPUT_FILE-v$i
fi

mv $BUILD_FILE $OUTPUT_FILE.apk
$SHELL