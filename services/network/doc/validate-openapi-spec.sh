#!/bin/bash
docker run -v ${PWD}:/shared --rm -it openapitools/openapi-generator-cli:latest validate --input-spec /shared/openapi-doc.yaml
