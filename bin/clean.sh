#!/bin/bash

files_to_delete=$(find . -maxdepth 1 -type f -name "*.zip")

if [ -n "$files_to_delete" ]; then
    for file in $files_to_delete; do
        rm "$file"
        echo "Deleted: $file"
    done
fi
