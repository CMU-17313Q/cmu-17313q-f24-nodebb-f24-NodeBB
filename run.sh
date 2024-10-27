#!/bin/bash

./nodebb stop
rm -rf node_modules
./nodebb build
./nodebb start
./nodebb log