#!/bin/bash
docker run -v ${PWD}:/shared --rm -it openapitools/openapi-generator-cli:latest generate --generator-name html2 --output /shared --input-spec /shared/openapi-doc.yaml

