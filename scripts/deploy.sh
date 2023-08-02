#!/bin/bash
. ./scripts/colors.sh

WEB_PATH='/var/www'
DEPLOY_URL=''
DEPLOY_PATH=''

die() { echo "$*" >&2; exit 2; }  

needs_arg() { if [ -z "$OPTARG" ]; then die "No arg for --$OPT option"; fi; }

get_result()
{
  if [ $? -eq "0" ]
  then
    echo "${BGreen}Success${CO}"
  else
    echo "${BRed}Failed${CO}"
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
    deploy-url )  DEPLOY_URL=$OPTARG ;;
    ??* )          die "Illegal option --$OPT" ;;
    ? )            exit 2 ;;
  esac
done
shift $((OPTIND-1))

# ENV VARIABLES LOAD 

echo "${Cyan}Checking environment variables...${CO} \n"

if [ ! -z $DEPLOY_URL ]
then 
  echo "${Cyan}Using variables from arguments.${CO} \n"
else
  if [ -f .env ]
  then
    DEPLOY_URL=`cat .env | grep DEPLOY_URL | sed 's/^.*=//g'`
    if [ -z $DEPLOY_URL ]
    then
      echo "${BRed}WARNING:${CO} ${Red}Missing environment variable${CO}\n" >&2
      echo "You need to define ${UCyan}PUBLIC_DEPLOY_URL${CO} variable in .env file.\n" >&2
      exit 1;
    fi
    echo "${Cyan}Using variables from environment file${CO} \n"
  else
    echo "${BRed}WARNING:${CO} ${Red}Missing ${URed}.env${Red} file.${CO}\n" >&2
    echo "Create ${UCyan}.env${CO} file." >&2
    echo "You can do so by copying ${UCyan}.env.example${CO} to ${UCyan}.env${CO} and putting in proper values.\n" >&2
    exit 1;
  fi
fi

DEPLOY_PATH=$WEB_PATH/$DEPLOY_URL

# WEB PATH CHECK

if [ ! -d $WEB_PATH ]
then
  echo "${Cyan}Creating directory: ${UWhite}${WEB_PATH}${CO}"
  sudo mkdir /var/www
  echo "$(get_result)\n"
fi

# DEPLOY PATH CHECK 

  echo $DEPLOY_PATH
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
