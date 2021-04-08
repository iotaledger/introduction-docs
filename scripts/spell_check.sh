#!/bin/bash
# file ignores are broken in .spelling, list them in this script instead

npx mdspell \
    'docs/**/*.md' \
    --ignore-numbers \
    --en-us \
    --report
