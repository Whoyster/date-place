#!/bin/bash
for file in $( find ./place_data -type f -name "place.txt.*" )
do
  node blog_crawler.js 2 $file
done
