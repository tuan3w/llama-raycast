#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"question": "What is the result of 3 + 12 ?"}' http://localhost:8000/chat/completions