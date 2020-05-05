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

set -o pipefail
set -eu

content=$(vue-cli-service inspect --mode $mode)
printf "/* eslint-disable */\nmodule.exports =$content" | sed -e "s/\(native code\)/\/*\1*\//g" >$output && echo $output
