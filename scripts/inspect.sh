#!/bin/bash

set -o errexit
set -o pipefail

if [[ ${1:0:3} == 'dev' ]]; then
  mode='development'
else
  mode='production'
fi

file='webpack.config.js'
ramdisk='/Volumes/ramdisk/'

if [[ -e $ramdisk ]]; then
  file="$ramdisk$file"
else
  file="$(pwd)/$file"
fi

output=$(vue-cli-service inspect --mode $mode)
printf "/* eslint-disable */\nmodule.exports =$output" | sed -e "s/\(native code\)/\/* \1 *\//g" >$file && echo $file
