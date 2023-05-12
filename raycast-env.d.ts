/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Llama server URL - LLaMa server URL */
  "serverUrl"?: string,
  /** Number of tokens to predict - number of tokens to predict */
  "maxCharacters"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `chat` command */
  export type Chat = ExtensionPreferences & {}
  /** Preferences accessible in the `create-command` command */
  export type CreateCommand = ExtensionPreferences & {}
  /** Preferences accessible in the `list-commands` command */
  export type ListCommands = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `chat` command */
  export type Chat = {}
  /** Arguments passed to the `create-command` command */
  export type CreateCommand = {}
  /** Arguments passed to the `list-commands` command */
  export type ListCommands = {}
}
