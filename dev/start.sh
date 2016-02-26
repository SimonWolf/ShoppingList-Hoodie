#! /bin/bash

cd `dirname $0`
cd ..

gulp watch &
gulp=$!
hoodie start -no-local-tld --port 6007 &
hoodie=$!

wait $gulp
kill -15 $hoodie
wait $hoodie