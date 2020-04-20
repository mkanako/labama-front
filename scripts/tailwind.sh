#!/bin/bash

output='output.css'
ramdisk='/Volumes/ramdisk/'
if [[ -e $ramdisk ]]; then
  output="$ramdisk$output"
else
  output="$(pwd)/$output"
fi
tailwind build ./src/styles/tailwind.css -o $output && echo $output
