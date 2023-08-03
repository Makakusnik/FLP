#!/bin/bash
. ./scripts/colors.sh

WEB_PATH='/var/www'
STAGING_URL=''
STAGING_PATH=''

die() { echo "$*"; exit 2; }
killIfFail() { 
  if [ $1 -eq 1 ];
  then 
    exit 1;
  fi
}  
needs_arg() { if [ -z "$OPTARG" ]; then die "No arg for --$OPT option"; fi; }

get_result()
{
  if [ $1 -eq "0" ]
  then
    echo "${BGreen}Success${CO}\n"
  else
    echo "${BRed}Failed${CO}\n"
  fi
}

while getopts :-: OPT; 
do
  if [ "$OPT" = "-" ]; then  
    OPT="${OPTARG%%=*}"
    OPTARG="${OPTARG#$OPT}"
    OPTARG="${OPTARG#=}"
  fi
  case "$OPT" in
    staging-url )  STAGING_URL=$OPTARG ;;
    ??* )          die "Illegal option --$OPT" ;;
    ? )            exit 2 ;;
  esac
done
shift $((OPTIND-1))

# ENV VARIABLES LOAD 

echo "${Cyan}Checking environment variables...${CO} \n"

if [ ! -z $STAGING_URL ]
then 
  echo "${Cyan}Using variables from arguments.${CO} \n"
else
  if [ -f .env ]
  then
    STAGING_URL=`cat .env | grep STAGING_URL | sed 's/^.*=//g'`
    if [ -z $STAGING_URL ]
    then
      echo "${BRed}WARNING:${CO} ${Red}Missing environment variable${CO}\n"
      echo "You need to define ${UCyan}PUBLIC_STAGING_URL${CO} variable in .env file.\n"
      exit 1;
    fi
    echo "${Cyan}Using variables from environment file${CO} \n"
  else
    echo "${BRed}WARNING:${CO} ${Red}Missing ${URed}.env${Red} file.${CO}\n"
    echo "Create ${UCyan}.env${CO} file from ${UCyan}.env.exmaple${CO} or you can supply ${BCyan}--staging-url${CO} option.\n"
    exit 1;
  fi
fi

STAGING_PATH=$WEB_PATH/$STAGING_URL

# WEB PATH CHECK

if [ ! -d $WEB_PATH ]
then
  echo "${Cyan}Creating directory: ${UWhite}${WEB_PATH}${CO}"
  sudo mkdir /var/www
  RESULT=$?
  get_result $RESULT
  killIfFail $RESULT
fi

# DEPLOY PATH CHECK 

if [ ! -d $STAGING_PATH ]
then
  mkdir $STAGING_PATH
  RESULT=$?
  echo "${Cyan}Creating directory: ${UWhite}${STAGING_PATH}${CO}"
  get_result $RESULT
  killIfFail $RESULT
else
  sudo rm -rf $STAGING_PATH/*
  RESULT=$?
  echo "${Cyan}Erasing directory: ${UWhite}${STAGING_PATH}${CO} - $(get_result)\n"
  get_result $RESULT
fi

# BUILDING APPLICATION 

echo "${BCyan}Building application: ${CO}"

pnpm run build

# COPYING BUILD FILES

sudo cp -R ./build/* ${STAGING_PATH}
RESULT=$?
echo "\n${Cyan}Copying build files to: ${UWhite}${STAGING_PATH}${CO}"
get_result $RESULT
killIfFail $RESULT