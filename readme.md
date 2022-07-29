# Build
docker-compose build
# Copy node_modules
docker cp $(docker run --rm -d $(basename $(pwd))_node-k sleep 1m):/home/node/app/node_modules/ ./
# Copy package.lock
docker cp $(docker run --rm -d $(basename $(pwd))_node-k sleep 1m):/home/node/app/package-lock.json ./
# Up
docker-compose up