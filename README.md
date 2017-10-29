# subquest-cli 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> The cli module for subquest scanner.

## Installation

In order to use it from the terminal you must install it as global module:

```sh
$ npm install -g subquest-cli
```

## Commands

+ __list__: It take a string argument that identify the type of resource you want to list. (dictionaries, resolvers)
+ __test__: Test a given address as a valid DNS server.
+ __scan__: Scan a given hostname to enumerate subdomain addresses.

## Usage

```
$ subquest --help

  Usage: subquest [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    list <type>            List module built in resources by type (dictionaries, resolvers)
    test <server>          Test the input as a valid DNS server.
    scan [options] <host>  Scan the input to enumerate all subdomains.
```

## License

MIT © [Filippo Conti]()


[npm-image]: https://badge.fury.io/js/subquest-cli.svg
[npm-url]: https://npmjs.org/package/subquest-cli
[travis-image]: https://travis-ci.org/b4dnewz/subquest-cli.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/subquest-cli
[daviddm-image]: https://david-dm.org/b4dnewz/subquest-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/subquest-cli
[coveralls-image]: https://coveralls.io/repos/b4dnewz/subquest-cli/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/subquest-cli
