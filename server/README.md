# LLaMa server

## Running local


```
yarn install
yarn server <model_file_path>
```

## Docker

```bash
yarn build-docker
docker run --rm ...
```

## Example

Unlike traditional APIs, the completionAPI return [server events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"question": "What is the result of 3 + 12 ?"}' \
http://localhost:8000/chat/completions
```