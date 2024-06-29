#!/bin/bash

# BEGIN Create cluster
kind create cluster --name wedding --config kind.yml
# END Create cluster

# BEGIN Build images
docker build -t frontend:1.0 ./src/frontend/
docker build -t photo-retrieval:1.0 ./src/photo-retrieval/
docker build -t upload:1.0 ./src/upload/
# END Build images

# BEGIN Load images
kind --name wedding load docker-image frontend:1.0
kind --name wedding load docker-image photo-retrieval:1.0
kind --name wedding load docker-image upload:1.0
# END Load images

# BEGIN Apply configs
kubectl apply -f manifests
# END Apply configs
