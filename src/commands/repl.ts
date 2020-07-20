import {Command, flags} from '@oclif/command'

export default class REPL extends Command {
  static description = 'muta client REPL'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
    endpoint: flags.string({char: 'e', description: 'chain endpoint to connect'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(REPL);

    // const name = flags.name || 'world'
    // this.log(`hello ${name} from ./src/commands/hello.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
    // process.env.NODE_OPTIONS = '--experimental-repl-await';
    const repl = require("repl");
    const vm = require("vm");
    const { processTopLevelAwait } = require("node-repl-await");

    function isRecoverableError(error) {
        if (error.name === 'SyntaxError') {
            return /^(Unexpected end of input|Unexpected token)/.test(error.message);
        }
        return false;
    }

    async function myEval(code, context, filename, callback) {
        code = processTopLevelAwait(code) || code;

        try {
            let result = await vm.runInNewContext(code, context);
            callback(null, result);
        } catch (e) {
            if (isRecoverableError(e)) {
                callback(new repl.Recoverable(e));
            } else {
                console.log(e);
            }
        }
    }

    const endpoint = flags.endpoint || 'http://127.0.0.1:8000/graphql';

    const c = repl.start({ prompt: '> ', eval: myEval }).context;
    const lodash = require('lodash');
    const service = require('@mutadev/service');
    c.lodash = lodash;
    c.muta_sdk = require('@mutadev/muta-sdk');
    c.client = new c.muta_sdk.Client({ endpoint });
    const mnemonic = c.muta_sdk.Muta.hdWallet.generateMnemonic();
    c.wallet = new c.muta_sdk.Muta.hdWallet(mnemonic);
    c.accounts = lodash.range(20).map(i => c.wallet.deriveAccount(i));
    c.service = service;
  }
}
