#!/bin/bash

#
# /**
# *@Author Akbar Riyan Nugroho
# */
#


echo "Deploy Run .."

docker build -t siska/yanma .
docker stop yanma
docker rm yanma
docker run -d -p 3000:3000 --name=yanma siska/yanma
