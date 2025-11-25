#!/bin/bash
cd /home/kavia/workspace/code-generation/fresh-fruit-market-45552-151048/FreshFruitMarketFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

