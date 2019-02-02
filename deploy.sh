#!/bin/bash
image="qhacks-docker-image"
project="qhacks-2019-230518"
zone="northamerica-northeast1-a"

# build docker image
echo ""
echo "================================================== building docker image =================================================="
gcloud builds submit --tag "gcr.io/$project/$image" . --project $project

# TODO: restart one vm rather than group
# restart instances (this loads new images)
echo ""
echo "================================================== restarting vm group =================================================="
gcloud beta compute instance-groups managed rolling-action restart $vmGroup --project $project --zone $zone
