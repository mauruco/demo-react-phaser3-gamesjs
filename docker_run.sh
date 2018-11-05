#!/bin/bash
docker run --detach --tty --publish 3000:3000 --volume $PWD:/var/www/html --workdir /var/www/html --name games ubuntu:18.04