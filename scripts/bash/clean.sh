#!/bin/bash

# Removes zombie Node processes
pid=$(lsof -iTCP -sTCP:LISTEN -P | grep '5000' | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')
if [[ -n "$pid" ]]; then
  kill $pid
  echo Process $pid killed
fi
