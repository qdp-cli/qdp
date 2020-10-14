#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

program
    .version(`qdp ${require('../package').version}`, '-v, --version', 'output the current version')
    .usage('<command> [options]')

program
    .command('create <app-name>')
    .description('create a new project powered by Project accumulation!')
    .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
    .action((name, cmd) => {
        console.log(name, cleanArgs(cmd))
    })

program.on('--help', () => {
    console.log()
    console.log(`${chalk.yellow.bold("Tips:")}`)
    console.log(`  Run ${chalk.yellow(`qdp <command> --help`)} for detailed usage of given command!`)
    console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

function cleanArgs(cmd) {
    const args = {}
    const options = cmd.options;
    options.forEach(o => {
        const key = o.long.replace(/^--/, '').replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}
