#!/bin/bash

bmdcapture -C ${INPUT_NUMBER} -A 2 -V 4 -m ${FORMAT_MODE} -F nut -o strict=experimental:syncpoints=none -f pipe:1 | ffmpeg -loglevel warning -i - -c:v libx264 -preset fast -vb ${VIDEO_BITRATE} -pix_fmt yuv420p -c:a libfdk_aac -ab ${AUDIO_BITRATE} -ar ${AUDIO_SAMPLE_RATE} -ac 2 -f flv "${STREAM_URL}"