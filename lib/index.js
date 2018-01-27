#!/usr/bin/env node

'use strict';

const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const subquest = require('subquest');

console.log(`
   _______  __   __  _______  _______  __   __  _______  _______  _______
  |       ||  | |  ||  _    ||       ||  | |  ||       ||       ||       |
  |  _____||  | |  || |_|   ||   _   ||  | |  ||    ___||  _____||_     _|
  | |_____ |  |_|  ||       ||  | |  ||  |_|  ||   |___ | |_____   |   |
  |_____  ||       ||  _    ||  |_|  ||       ||    ___||_____  |  |   |
   _____| ||       || |_|   ||       ||       ||   |___  _____| |  |   |
  |_______||_______||_______||____||_||_______||_______||_______|  |___|
`);

// Init program details
program
  .name('subquest')
  .version(version)
  .description('Fast, reliable, elegant subdomain enumerator.');

// Action: List various module components
program
  .command('list <type>')
  .description('List module built in resources. (dictionaries, resolvers)')
  .action(function(type) {
    switch (type) {
      // Show the dictionaries list
      case 'dictionaries': {
        let dictionaries = subquest.getDictionaryNames();
        console.log(` There are ${dictionaries.length} dictionaries:\n`);
        dictionaries.forEach(v => {
          console.log(` - ${v}`);
        });
        break;
      }
      // Show the default resolverslist
      case 'resolvers': {
        subquest.getResolvers(resolvers => {
          console.log(` There are ${resolvers.length} resolvers:\n`);
          resolvers.forEach(v => {
            console.log(` - ${v}`);
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
  .description('Test an address as valid DNS server.')
  .option(
    '-t, --timeout [millis]',
    'The timeout for the DNS test call',
    v => parseInt(v, 10),
    4000
  )
  .action((server, options) => {
    console.log(' Testing DNS server:', server);
    console.log(` Request timeout: ${options.timeout}ms`, '\n');
    // Run the method
    subquest.isValidDnsServer(server, options.timeout, err => {
      if (err) {
        console.log(' The DNS Server is not valid.');
      } else {
        console.log(' The DNS Server is valid.');
      }
    });
  });

// Action: Scan a domain for subdomains
program
  .command('scan <host>')
  .description('Scan the input to enumerate all subdomains.')
  .option('-s, --server <address>', 'Specify a custom DNS server')
  .option('-d, --dictionary <name>', 'Use a different dictionary')
  .option('-o, --output [path]', 'Save the output to a directory')
  .action((host, options) => {
    console.time(' Scan execution time');
    console.log(' Scanning domain:', host);

    // Validate dictionary
    if (options.dictionary) {
      let dictionaries = subquest.getDictionaryNames();
      if (!dictionaries.includes(options.dictionary + '.txt')) {
        throw new Error(
          `The dictionary ${
            options.dictionary
          } does not exist, be sure to use on of the listed possibilities.`
        );
      }
      console.log(' Using the:', options.dictionary, 'dictionary.');
    } else {
      console.log(' Using the default dictionary.');
    }

    // Inform that custom server is used
    if (options.server) {
      console.log(' Using:', options.server, 'as main DNS resolver.');
    }

    // Start the scan
    subquest.getSubDomains(
      {
        host,
        dictionary: options.dictionary,
        dnsServer: options.server
      },
      (err, results) => {
        if (err) {
          console.log(' An error occurred:');
          console.log(err);
          return;
        }

        // Stop if no results
        if (results.length === 0) {
          console.log(' No subdomains were found.');
          return;
        }

        console.log(`\n The scan found ${results.length} subdomains: \n`);
        results.forEach(v => {
          console.log(' ', 'Hostname:'.padEnd(12), v.hostname);
          console.log(' ', 'Address:'.padEnd(12), v.address[0]);
          if (v.nameserver) {
            console.log(' ', 'Nameserver:'.padEnd(12), v.nameserver[0]);
          }
          console.log('\n');
        });

        // Optionally save output to file
        if (options.output) {
          let filename = `${host}-subdomains.json`;
          let filepath =
            typeof options.output === 'string'
              ? path.join(options.output, filename)
              : path.join(__dirname, filename);

          console.log(' Saving output to:', filepath, '\n');
          fs.writeFileSync(
            filepath,
            JSON.stringify(
              {
                hostname: host,
                scannedAt: Date.now(),
                data: results
              },
              null,
              2
            ),
            'utf-8'
          );
        }

        console.timeEnd(' Scan execution time');
      }
    );
  });

// Parse process arguments
program.parse(process.argv);
