#!/bin/bash
for file in $( find ./place -type f -name "place.txt.*" )
do
  node blog_crawler.js $file
done
