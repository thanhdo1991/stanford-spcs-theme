#!/bin/bash

BUILD_DIR=$(pwd)
JSON=composer.json
EXE=composer

FOUND=`which $EXE`

# generate styleguide from pattern lab

if [ -d "$BUILD_DIR/pattern-lab" ]
then
  cd "$BUILD_DIR/pattern-lab"
  M | $FOUND install --no-dev
  php core/console --generate

  echo -e "\n${txtylw}Delete vendor ${txtrst}"
  rm -rf vendor
fi
