# subquest-cli

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

MIT © [Filippo Conti](https://b4dnewz.github.io/)
