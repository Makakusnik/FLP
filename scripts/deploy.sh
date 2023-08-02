#!/bin/bash
. ./scripts/colors.sh

get_result()
{
  if [ $? -eq "0" ]
  then
    echo "${BGreen}Success${CO}"
  else
    echo "${BRed}Failed${CO}"
  fi
}

WEB_PATH='/var/www'
DEPLOY_URL=''
DEPLOY_PATH=''

# ENV VARIABLES LOAD 

if [ -f .env ]
then
  DEPLOY_URL=`cat .env | grep DEPLOY_URL | sed 's/^.*=//g'`
  if [ -z $DEPLOY_URL ]
  then
    echo "${BRed}WARNING:${CO} ${Red}Missing environment variable${CO}\n" >&2
    echo "You need to define ${UCyan}PUBLIC_DEPLOY_URL${CO} variable in .env file.\n" >&2
    exit 1;
  fi
  DEPLOY_PATH=$WEB_PATH/$DEPLOY_URL
else
  echo "${BRed}WARNING:${CO} ${Red}Missing ${URed}.env${Red} file.${CO}\n" >&2
  echo "Create ${UCyan}.env${CO} file." >&2
  echo "You can do so by copying ${UCyan}.env.exmaple${CO} to ${UCyan}.env${CO} and putting in proper values.\n" >&2
  exit 1;
fi

# WEB PATH CHECK

if [ ! -d $WEB_PATH ]
then
  sudo mkdir /var/www
  echo "${Cyan}Creating directory: ${UWhite}${WEB_PATH}${CO} - $(get_result)\n"
fi

# DEPLOY PATH CHECK 

if [ ! -d $DEPLOY_PATH ]
then
  sudo mkdir $DEPLOY_PATH
  echo "${Cyan}Creating directory: ${UWhite}${DEPLOY_PATH}${CO} - $(get_result)\n"
else
  sudo rm -rf $DEPLOY_PATH/*
  echo "${Cyan}Erasing directory: ${UWhite}${DEPLOY_PATH}${CO} - $(get_result)\n"
fi

# BUILDING APPLICATION 

echo "${BCyan}Building application: ${CO}"

pnpm run build

# COPYING BUILD FILES

sudo cp -R ./build/* ${DEPLOY_PATH}
echo "\n${Cyan}Copying build files to: ${UWhite}${DEPLOY_PATH}${CO} - $(get_result)\n"
