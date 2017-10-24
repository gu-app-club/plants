#!/usr/bin/env bash

# Make non-zero exit codes & other errors fatal.
set -euo pipefail

# Suppress prompts during apt-get invocations.
export DEBIAN_FRONTEND=noninteractive

# Remove the old MySQL 5.6 PPA repository, if this is an existing Vagrant instance.
sudo rm -f /etc/apt/sources.list.d/ondrej-ubuntu-mysql-5_6-xenial.list

if [[ ! -f /etc/apt/sources.list.d/nodesource.list ]]; then
    echo '-----> Adding APT repository for Node.js'
    curl -sSf https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
    echo 'deb https://deb.nodesource.com/node_7.x xenial main' | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null
fi


# Install node
echo '-----> Installing/updating APT packages'
sudo -E apt-get -yqq update
sudo -E apt-get -yqq install --no-install-recommends \
    git \
    libmemcached-dev \
    libmysqlclient-dev \
    mysql-server-5.7 \
    nodejs \
    dos2unix \

sudo npm update -g npm
sudo npm install -g yarn

echo '-----> Configuring Git 2.0'
git config --global push.default simple

echo '-----> Configuring NPM'
sudo chown -R $USER:$(id -gn $USER) /home/vagrant/.config

echo '-----> Adding Super Important Doggo'
cat << "EOF"
       __,-----._                       ,-. 
     ,'   ,-.    \`---.          ,-----<._/ 
    (,.-. o:.`    )),"\\-._    ,'         `. 
   ('"-` .\       \`:_ )\  `-;'-._          \ 
  ,,-.    \` ;  :  \( `-'     ) -._     :   `: 
 (    \ `._\\ ` ;             ;    `    :    ) 
  \`.  `-.    __   ,         /  \        ;, ( 
   `.`-.___--'  `-          /    ;     | :   | 
     `-' `-.`--._          '           ;     | 
           (`--._`.                ;   /\    | 
            \     '                \  ,  )   : 
            |  `--::----            \'   ;  ;| 
            \    .__,-      (        )   :  :| 
             \    : `------; \      |    |   ; 
              \   :       / , )     |    |  ( 
     -hrr-     \   \      `-^-|     |   / , ,\ 
                )  )          | -^- ;   `-^-^' 
             _,' _ ;          |    | 
            / , , ,'         /---. : 
            `-^-^'          (  :  :,' 
                             `-^--' 
                Dis dogoo believes
                in yo code skills and programs
                donut disappoint