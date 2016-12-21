'use strict';
const dns = require('dns');
const chalk = require('chalk');
const domain = process.argv[2];
let reg = new RegExp('[^a-z0-9-.]', 'i');

if (process.argv[2] === 'help') { //help command
    console.log(chalk.green('d2ip') + ' is designed to be used as fast as possible')
    console.log(chalk.blue('usage: node d2ip domain.com'));
    console.log(chalk.red('Please read README at github.com/skawm/domain2ip-cli before using this software'));
    process.exit()
}


console.log('resolving IPs at ' + chalk.green(dns.getServers()[0]) + ' (custom dns will be added soon)');
if (reg.test(domain)) {
    //invalid characters found
    console.log(chalk.bold.red('Please enter a valid domain name'));
} else {
    //invalid characters not found
    dns.resolve4(domain, function(err, addresses) { //resolve IPv4
        if (err) return console.log(chalk.blue(domain + ' has no IPv4'));
        console.log(chalk.blue("IPv4:"));
        console.log(addresses)
    });
    dns.resolve6(domain, function(err, addresses) { //resolve IPv6
        if (err) return console.log(chalk.blue(domain + ' has no IPv6'));
        console.log(chalk.blue("IPv6:"));
        console.log(addresses);
    });

}