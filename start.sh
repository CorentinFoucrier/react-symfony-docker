#!/bin/bash

if [ -e .env ]; then
    source .env
else
    echo "Please set up your .env file before starting your environment."
    exit 1
fi

docker-compose build

docker-compose -f docker-compose.yml up -d

sleep 4;

docker exec $CONTAINER_NAME /bin/sh -c 'cd /var/www/ && composer update'
docker exec $CONTAINER_NAME /bin/sh -c 'cd /var/www/ && php bin/console doctrine:migrations:migrate'
docker exec $CONTAINER_NAME /bin/sh -c 'cd /var/www/ && php bin/console doctrine:fixture:load'

echo
echo "#-----------------------------------------------------------"
echo "#"
echo "# Please check your browser at http://localhost:$APP_PORT"
echo "# And do 'yarn dev --watch' in the constainer $CONTAINER_NAME"
echo "#"
echo "#-----------------------------------------------------------"
echo

exit 0