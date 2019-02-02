#!/bin/bash
image="qhacks-docker-image"
project="qhacks-2019-230518"
zone="northamerica-northeast1-a"

# build docker image
echo ""
echo "================================================== building docker image =================================================="
gcloud builds submit --tag "gcr.io/$project/$image" . --project $project

# restart instances (this loads new images)
echo ""
echo "================================================== restarting vm group =================================================="
gcloud compute instances reset docker-vm --project $project --zone $zone
