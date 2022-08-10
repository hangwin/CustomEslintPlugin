# eslint-plugin-custom

校验某些语句上面是否有注释的插件

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-custom`:

```sh
npm install eslint-plugin-custom --save-dev
```

## Usage

Add `custom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "custom"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "custom/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


