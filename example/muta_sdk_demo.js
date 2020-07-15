const lodash = require('lodash');
const muta_sdk = require('@mutadev/muta-sdk');
const Muta = muta_sdk.Muta;
const muta = new muta_sdk.Muta();
const client = muta.client();
const mnemonic = Muta.hdWallet.generateMnemonic();
const wallet = new Muta.hdWallet(mnemonic);
const accounts = lodash.range(20).map(i => wallet.deriveAccount(i));

async function main() {
    console.log('----- start -----');

    console.log('\nbasic operation:\n');
    console.log(await client.getLatestBlockHeight());
    console.log(await client.getBlock('0x1'));

    console.log('\nasset service:\n');
    const account = accounts[0];
    const create_asset_tx = await client.composeTransaction({
        method: 'create_asset',
        payload: {
            name: 'MUTA Token',
            supply: 1000000000,
            symbol: 'MT',
            precision: 2,
        },
        serviceName: 'asset',
        sender: account.address,
    });
    let txHash = await client.sendTransaction(account.signTransaction(create_asset_tx));
    let receipt = await client.getReceipt(txHash);
    console.log(receipt);
    const MT = JSON.parse(receipt.response.ret);
    const asset_id = MT.id;
    // console.log(await service.getBalance(HT.asset_id, account.address));
    let balance = await client.queryService({
        serviceName: 'asset',
        method: 'get_balance',
        payload: JSON.stringify({asset_id, user: account.address}),
    });
    console.log(balance);
    const to = accounts[1].address;
    const transfer_tx = await client.composeTransaction({
        method: 'transfer',
        payload: {
            asset_id,
            to,
            value: 100,
        },
        serviceName: 'asset',
    });
    txHash = await client.sendTransaction(account.signTransaction(transfer_tx));
    receipt = await client.getReceipt(txHash);
    console.log(receipt);
    balance = await client.queryService({
        serviceName: 'asset',
        method: 'get_balance',
        payload: JSON.stringify({asset_id, user: account.address}),
    });
    console.log(balance);
    balance = await client.queryService({
        serviceName: 'asset',
        method: 'get_balance',
        payload: JSON.stringify({asset_id, user: to}),
    });
    console.log(balance);

    // 链上管理
    const admin = Muta.account.fromPrivateKey('2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2');
    console.log(admin.address);
    metadata_raw = await client.queryService({
        serviceName: 'metadata',
        method: 'get_metadata',
        payload: '',
    });
    metadata = JSON.parse(metadata_raw.ret);
    console.log(metadata);
    const update_metadata_tx = await client.composeTransaction({
        method: 'update_interval',
        payload: {
            interval: metadata.interval - 1,
        },
        serviceName: 'node_manager',
    });
    hash = await client.sendTransaction(admin.signTransaction(update_metadata_tx));
    receipt = await client.getReceipt(hash);
    console.log(receipt);
    metadata_raw = await client.queryService({
        serviceName: 'metadata',
        method: 'get_metadata',
        payload: '',
    });
    metadata = JSON.parse(metadata_raw.ret);
    console.log(metadata);

    // 部署合约
    client.options.defaultCyclesLimit = '0xffffff';
    const fs = require('fs');
    const code = fs.readFileSync('example/simple_storage');
    const tx = await client.composeTransaction({
        method: 'deploy',
        payload: {
            intp_type: 'Binary',
            init_args: '',
            code: code.toString('hex'),
        },
        serviceName: 'riscv',
    });
    txHash = await client.sendTransaction(account.signTransaction(tx));
    receipt = await client.getReceipt(txHash);
    console.log(receipt);
    const address = JSON.parse(receipt.response.ret).address;
    console.log(await client.queryService({
        serviceName: 'riscv',
        method: 'call',
        payload: JSON.stringify({
            address,
            args: 'get k',
        })
    }));
    const set_tx = await client.composeTransaction({
        method: 'exec',
        payload: {
            address,
            args: 'set k v',
        },
        serviceName: 'riscv',
    });
    const set_tx_hash = await client.sendTransaction(account.signTransaction(set_tx));
    await client.getReceipt(set_tx_hash);
    console.log(await client.queryService({
        serviceName: 'riscv',
        method: 'call',
        payload: JSON.stringify({
            address,
            args: 'get k',
        })
    }));

    console.log('-----  end  -----');
}

main();
