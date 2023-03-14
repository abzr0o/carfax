#!/bin/bash -ex

sudo npm i -g yarn
sudo rm packge-lock.json
sudo yarn install
sudo yarn prisma generate
sudo yarn run build
sudo apt-get update && sudo apt-get install curl gnupg -y \
    && sudo curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - \
    && sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && sudo apt-get update \
    && sudo apt-get install google-chrome-stable -y --no-install-recommends \
    && sudo rm -rf /var/lib/apt/lists/*
# start the app
sudo node dist/index.js > /dev/null 2>&1 &