#!/bin/bash

mode='production'
if [[ $1 == 'dev' ]]; then
  mode='development'
fi

output='webpack.config.js'
ramdisk='/Volumes/ramdisk/'

if [[ -e $ramdisk ]]; then
  output="$ramdisk$output"
else
  output="$(pwd)/$output"
fi

(printf "/* eslint-disable */\nmodule.exports =" && vue-cli-service inspect --mode $mode) | sed -e "s/native code/\/*native code*\//g" >$output && echo $output
