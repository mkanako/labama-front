#!/bin/bash

if [[ ! -e './src/views/Test.dev.vue' ]]; then
  cp './public/Test.dev.vue' './src/views/Test.dev.vue'
fi
for file in $(ls ./scripts/*.sh); do
  chmod a+x $file
done
