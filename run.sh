#!/usr/bin/env bash
cd $(dirname $0)

while [[ -n "$1" ]]; do
    case "$1" in
    -d|--detached)
        echo "Running detached"
        DETACHED="-d"
        ;;
    *) echo "Option $1 not recognized" ;;
    esac
    shift
done

echo "Starting the containers..."
docker-compose rm -sf
docker-compose up ${DETACHED} --build --force-recreate --remove-orphans
