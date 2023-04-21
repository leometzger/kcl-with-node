#!bin/bash

source_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )


echo "########### Creating Kinesis Stream ###########"
aws kinesis create-stream \
	--endpoint-url=http://localhost:4566 \
	--stream-name samplestream \
	--shard-count 2 \
	--profile=localstack
