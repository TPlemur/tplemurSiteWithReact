#!/usr/bin/env bash
# Generate an ffmpeg FFMETADATA1 chapters file from a folder of mp3s.
# Usage: ./gen_chapters.sh /path/to/mp3folder > chapters.txt
# Chapters are ordered by natural/alphabetical filename sort and
# titled using each file's ID3 "title" tag if present, else the filename.

set -euo pipefail

folder="${1:-.}"
timebase=1000  # milliseconds

echo ";FFMETADATA1"

start=0
chapter_num=1

# Natural sort so "Track 2" comes before "Track 10"
while IFS= read -r -d '' f; do
    # Duration in seconds (float) via ffprobe
    dur_sec=$(ffprobe -v error -show_entries format=duration \
        -of default=noprint_wrappers=1:nokey=1 "$f")
    dur_ms=$(awk -v d="$dur_sec" 'BEGIN { printf "%d", d * 1000 }')

    title="Chapter ${chapter_num}"
    chapter_num=$((chapter_num + 1))

    end=$((start + dur_ms))

    printf '[CHAPTER]\nTIMEBASE=1/%s\nSTART=%s\nEND=%s\nTITLE=%s\n' \
        "$timebase" "$start" "$end" "$title"

    start=$end
done < <(find "$folder" -maxdepth 1 -type f -iname '*.mp3' -print0 | sort -zV)
