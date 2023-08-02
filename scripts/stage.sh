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
STAGING_URL=''
STAGING_PATH=''

# ENV VARIABLES LOAD 

if [ -f .env ]
then
  STAGING_URL=`cat .env | grep STAGING_URL | sed 's/^.*=//g'`
  if [ -z $STAGING_URL ]
  then
    echo "${BRed}WARNING:${CO} ${Red}Missing environment variable${CO}\n" >&2
    echo "You need to define ${UCyan}PUBLIC_STAGING_URL${CO} variable in .env file.\n" >&2
    exit 1;
  fi
  STAGING_PATH=$WEB_PATH/$STAGING_URL
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

# STAGING PATH CHECK 

if [ ! -d $STAGING_PATH ]
then
  sudo mkdir $STAGING_PATH
  echo "${Cyan}Creating directory: ${UWhite}${STAGING_PATH}${CO} - $(get_result)\n"
else
  sudo rm -rf $STAGING_PATH/*
  echo "${Cyan}Erasing directory: ${UWhite}${STAGING_PATH}${CO} - $(get_result)\n"
fi

# BUILDING APPLICATION 

echo "${BCyan}Building application: ${CO}"

pnpm run build

# COPYING BUILD FILES

sudo cp -R ./build/* ${STAGING_PATH}
echo "\n${Cyan}Copying build files to: ${UWhite}${STAGING_PATH}${CO} - $(get_result)\n"
