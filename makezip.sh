#!/bin/bash

temp=$(mktemp -d)

# Build regexer
cd regexer
cargo build --release
cp -r target/release/regexer $temp
cd ..

# Get lambda expression
cp lambda/index.js $temp

# Zip
(cd $temp; zip build.zip * **/*)
cp $temp/build.zip ./
rm -rf $temp
