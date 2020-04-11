#!/bin/bash

# Author: Jesper Sporron
# Author GitHub: https://github.com/Charanor
# Project GitHub: https://github.com/Charanor/react-native-code-snippets
# License: Creative Commons Zero v1.0 Universal (CC0)
# 
# Description:
#     This is a bash script that will open your AVD (Android Emulator). Useful when you don't want to open
#     Android Studio to open your Emulator.
# 
# Please keep this comment at the top of the file to show support (even though you are free to remove it) :)

################################
# These things you should edit #
################################

EMULATOR_NAME="my_emulators_name"

#################################
# Static stuff, no need to change
#################################

"$ANDROID_HOME\emulator\emulator" -avd $EMULATOR_NAME