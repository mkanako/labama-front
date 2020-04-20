#!/bin/bash

ramdisk='/Volumes/ramdisk/'
src="node_modules/.cache"
if [[ -e $ramdisk ]]; then
  if [[ $(df -kP) =~ "$(pwd)/$src" ]]; then
    echo "'$(pwd)/$src' is mounted."
    read -p "Do you want to umount it? (y/n)" answer
    if [[ $answer == 'y' ]]; then
      umount $src && echo 'ok'
    fi
    exit
  fi
  if [[ ! -z $npm_package_name ]]; then
    dist="$ramdisk$npm_package_name"
    if [[ ! -e $dist ]]; then
      mkdir $dist
    fi
    if [[ ! -e $src ]]; then
      mkdir $src
    fi
    bindfs $dist $src && echo 'ok'
  else
    echo 'env: `npm_package_name` not exist'
  fi
else
  echo "$ramdisk not exist"
fi
