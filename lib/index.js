#!/usr/bin/env node

'use strict';

const { version } = require('../package.json');
const program = require('commander');
const subquest = require('subquest');

console.log(`Subquest: Fast, reliable, elegant subdomain scanner.`);

// Init program details
program.name('subquest').version(version);

// Action: List various module components
program
  .command('list <type>')
  .description('List module built in resources by type (dictionaries, resolvers)')
  .action(function(type) {
    switch (type) {
      // Show the dictionaries list
      case 'dictionaries': {
        let dictionaries = subquest.getDictionaryNames();
        console.log(`There are ${dictionaries.length} dictionaries:\n`);
        dictionaries.forEach(v => {
          console.log(`- ${v}`);
        });
        break;
      }
      // Show the default resolverslist
      case 'resolvers': {
        subquest.getResolvers(resolvers => {
          console.log(`There are ${resolvers.length} resolvers:\n`);
          resolvers.forEach(v => {
            console.log(`- ${v}`);
          });
        });
        break;
      }
      default:
        break;
    }
  });

// Action: Test a given server as valid DNS server
program
  .command('test <server>')
  .description('Test the input as a valid DNS server.')
  .action(server => {
    console.log('Testing DNS server:', server);
    subquest.isValidDnsServer(server, err => {
      if (err) {
        console.log('The DNS Server is not valid.');
      } else {
        console.log('The DNS Server is valid.');
      }
    });
  });

// Action: Scan a domain for subdomains
program
  .command('scan <host>')
  .description('Scan the input to enumerate all subdomains.')
  .option('-s, --server [address]', 'Specify a custom DNS server')
  .option(
    '-d, --dictionary [name]',
    'Select the dictionary to use by name (no extension)'
  )
  .action((host, options) => {
    console.time('Subdomain scan execution time');
    console.log('Scanning domain:', host, '\n');
    // Run subquest with given options to enumerate subdomains
    subquest.getSubDomains(
      {
        host,
        dictionary: options.dictionary,
        dnsServer: options.server
      },
      (err, results) => {
        if (err) {
          console.log('An error occurred:');
          console.log(err);
          return;
        }
        console.timeEnd('Subdomain scan execution time');
        console.log(`The scan has found ${results.length} subdomains: \n`);
        results.forEach(v => {
          console.log(v);
        });
      }
    );
  });

// Parse process arguments
program.parse(process.argv);
