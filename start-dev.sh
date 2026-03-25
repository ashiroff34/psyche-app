#!/bin/bash
export PATH="/Users/ariannashiroff/.nvm/versions/node/v24.14.0/bin:$PATH"
cd /Users/ariannashiroff/Documents/Claude/psyche-app
exec node node_modules/next/dist/bin/next dev --turbopack -p 3001
