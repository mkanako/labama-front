#!/bin/bash

if [[ ! -e './src/views/DevTest.vue' ]]; then
  cp './public/DevTest.vue' './src/views/DevTest.vue'
fi
for file in $(ls ./scripts/*.sh); do
  chmod a+x $file
done
