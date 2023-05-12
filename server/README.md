# LLaMa server

## Running local


```bash
yarn install
yarn server <model_file_path>

# yarn server --help to see all available options
```

## Docker

TODO

## Example

Unlike traditional APIs, the completion API returns [Server Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"question": "What is the result of 3 + 12 ?"}' \
http://localhost:8000/chat/completions
```