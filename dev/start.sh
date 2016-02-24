#! /bin/bash

cd `dirname $0`
cd ..

gulp watch &
gulp=$!
hoodie start -no-local-tld &
hoodie=$!

wait $gulp
kill -15 $hoodie
wait $hoodie