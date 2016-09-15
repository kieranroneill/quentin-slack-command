#!/usr/bin/env bash

cd ..

echo 'Pulling from git...'

git pull

echo 'Updating Node modules...'

npm prune && npm update

echo 'Restarting app in production mode...'

NODE_ENV=production pm2 restart server.js

