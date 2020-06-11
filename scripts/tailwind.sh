#!/bin/bash

set -o errexit
set -o pipefail

file='tailwind.css'
ramdisk='/Volumes/ramdisk/'

if [[ -e $ramdisk ]]; then
  file="$ramdisk$file"
else
  file="$(pwd)/$file"
fi

tailwind build ./src/styles/tailwind.css -o $file && echo $file
