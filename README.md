# Masklassify

Completely based off of [maskfy](https://github.com/tboerc/maskfy) by [tboerc](https://github.com/tboerc)

The project aims to provide a simple API that can be used to mask, unmask or validate day-to-day values like phone numbers and money, but mostly focused on serving brazilian users out-of-the-box, since they need a way to deal with CPF, CNPJ, CEP and more.

tboerc's version is more production-ready. This fork is mostly a little refactoring, tinkering around and adding unit tests here and there.

## Navigation

- [Introduction](#masklassyfy)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Mask](#mask)
  - [Mask.custom.value(string, mask)](#maskcustomvalue)
- [Tests](#tests)

## Installation

```
yarn add FelipeSSDev/Masklassify
```

## Usage

You can use maskfy just to mask a string:

```javascript
import {Mask} from '@tboerc/maskfy';

// Masking a string using a provided mask
// The sample bellow will output (85) 2741-1509
Mask.phone.value('8527411509');
```

But you can also use it alongside with a input component:

```javascript
import React from 'react';
import {Mask} from '@tboerc/maskfy';

const SomeScreen = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <input value={value} onChange={e => setValue(Mask.phone.value(e.target.value))} />
    </>
  );
};
```

It can be used with React Native too, but you will need to change some properties, like `onChange` to `onChangeText`.

## API

### Mask

All base masks are wrapped on this object, and alongside with it, there are the custom options and some helpers if nedded.

Currently, it ships by default masks to: `{cep, cnpj, cpf, money, phone}`.

The usage on all those mask will follow the same pattern with thoose three methods: `value`, `raw` and `validate`.

#### value(string, settings?)

Return the string with applied mask over it. Sometimes you can provide custom settings too.

#### raw(string, settings?)

Return the string without any applied mask. Sometimes you can provide custom settings too.

#### validate(string)

Tries to validate the string following some simple rules, generaly is based on the length of mask. But in some cases have complex validations, like in CPF mask.

### Mask.custom.value

#### Mask.custom.value(string, mask)

If you need to use a custom mask, you can use the `custom` method. Just pass your string and the mask pattern to apply over it. The pattern rules are defined bellow.

    9 - Accept digit;
    A - Accept alpha;
    S - Accept alphanumeric;
    * - Accept all, EXCEPT white space.

## Tests

Tests will run on the folder `__tests__` in the **root folder**, Jest will look for all files ending in `spec.ts`. It will generate coverage by default, but it is not currently working properly.

To run tests, run the following command:

```
yarn test
```

## Thanks to

- [vanilla-masker](https://github.com/BankFacil/vanilla-masker);
- [react-native-masked-text](https://github.com/benhurott/react-native-masked-text).
- [@tboerc/maskfy](https://github.com/tboerc/maskfy)
