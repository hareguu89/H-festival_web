#!/bin/bash

docker-compose down
docker rmi h-festival
cd ~/h-festival/server
docker build . -t h-festival
docker-compose up -d
