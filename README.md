# LLaMa extension for Raycast

A simple extension for Raycast that allows you to interact with [llama.cpp](https://github.com/ggerganov/llama.cpp).

**NOTE**: This is for experimentation purpose only. If you want to work on something similar, please fork this repo.


## Screencast

https://github.com/tuan3w/llama-raycast/assets/2762678/d284549e-2ceb-469d-81b3-71fbe67bf35b

## Start LlaMa server

```bash
cd server
yarn install
yarn server <path_to_ggml_model>
# i.e: yarn server ggml-vic7b-q4_1.bin
```

## Install dependencies & Import extension

Open Raycast launcher and import the extension

![import-extension](assets/import-extension.png)


## License

[MIT](LICENSE)
