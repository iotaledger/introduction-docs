# Chrysalis Migration

With the advent of the Chrysalis migration, a number of aspects at IOTA are changing for the better. With easier ways to manage and secure your experience, IOTA will seamlessly integrate these innovations with no service interruptions.

With Chrysalis, we make a clear cut from the current IOTA protocol, and start a new with a much better, and more mature network. The new network will support many new use cases and create a foundation for IOTA’s upcoming Coordicide.

This includes one of the innovations that directly impacts one of the most crucial aspects of your experience: funds.

Because of its complexity, the migration process for the next phase of Chrysalis consists of two phases; we are currently in phase one where you initiate the migration of your funds in one week and which will then be available on our new network upon launch.

Do note that migrating is a continuous effort that can be done at any time after the initial migration start date.

## Token Migration Overview

Below is an overview of how the migration will take place:

- You enter your seed in Firefly.
- Firefly creates you a new seed and generates an EdDSA address for the new network.
- Firefly sends your funds to a predetermined migration address on the old network.
- Your funds become available on the network, in the EdDSA address Firefly created for you. 
- If you migrate before Chrysalis launch, your funds become available at Chrysalis launch. 
- If you migrate after Chrysalis launch, your funds will become available shortly after you migrate.
- The process will be the same for Ledger Nano users. 
  - Note: The Ledger will not be supported prior to the Chrysalis launch, but after
- You simply connect your device and Firefly guides you through the process.
- Firefly will initially only be available on Mac, Linux and Windows.
- Your funds are successfully migrated.

For further information on the migration process, see our [blog post](https://blog.iota.org/firefly-token-migration/).




## Exchanges Migration Guide 

To transfer your user's tokens securely to the new Chrysalis (IOTA 1.5) network, we provide this helpful guide. 

There are potentially three ways with which you can migrate your funds from from old (legacy) to new (chrysalis) network:


1. Via **Firefly**. This procedure is explained [in this blog entry](https://blog.iota.org/firefly-token-migration/). This guide will just cover the programmatically approach to migrate.

2. Via a **Migration Address** Use wallet library solely for migrating funds from old to new network (in this case, you will have to generate and manage your new seed and migration address);

3. Via a **legacy Seed**. Use wallet library for generating, managing your new seed and migration process;



#### Migration Guide - Via an Migration Address

With this scenario, you generate your recovery phrase yourself. Then generate an address from it, generate migration address (as in the example below) and then use the same steps performed in section 1 for migrating.

With this approach, its very easy to migrate funds to the new Chrysalis network. You just generate a new Chrysalis address and convert it to the old Trinary Format. 
If you send Funds to this migration address, it bridges the network and you have the funds available in the Chrysalis network.

#### generate migration address
This is an example, how to create a Migration Address with Node.js:

```javascript=
function run() {
  const { AccountManager } = require('../lib')
  const manager = new AccountManager()
  let address = "atoi1qpheapgshz9saf8mc6zdly96xyz5qdc2qspsv7ezem6fw8lv869ms3amw0g";
  let migration_address = manager.generateMigrationAddress(address);
  console.log(migration_address)
}
run()
```

Code: https://github.com/iotaledger/wallet.rs/blob/develop/bindings/nodejs/tests/migration.js


### Be safe!

Please take care that you...
- ... dont create outputs that are lower that 1 Mi (to prevent Dust Protection).
- ... you use a limited amount of inputs (<10) and create small Bundles (otherwise your PoW will just takes to long).
- ... use the [bundle-miner](https://github.com/iotaledger/iota.rs/tree/migration/iota-bundle-miner), if old bundle hashes include spent address. The bundle-miner will create bundles that reveal as few new parts of the private key as possible.

If you have spent addresses (which can be checked via the wereAddressesSpentFrom endpoint in the legacy network), we recommend to get the bundle hashes from the previous outgoing transactions for these addresses and use the bundle miner to create a bundle that reveals as few new parts of the private key as possible.

More information about the migration bundle can be found in the [RFC-0035](https://github.com/luca-moser/protocol-rfcs/blob/rfc/wotsicide/text/0035-wotsicide/0035-wotsicide.md#migration-bundle).


### Migration Guide via Seed
The new recovery phrase and the migration address will be handled by the wallet library.

Our IOTA Wallet Firefly is basically using wallet rs for the migration. There are three main methods exposed from wallet.rs:
- [getMigrationData](https://github.com/iotaledger/firefly/blob/develop/packages/backend/bindings/node/index.ts#L203)
- [createMigrationBundle](https://github.com/iotaledger/firefly/blob/develop/packages/backend/bindings/node/index.ts#L215)
- [sendMigrationBundle](https://github.com/iotaledger/firefly/blob/develop/packages/backend/bindings/node/index.ts#L219)

#### Fetch migration data by a seed
First, with a user provided legacy seed, we fetch migration data using getMigrationData(). It returns to us with the addresses and it's balance. It also returns address metadata such as if an address is spent. To be precise, [this](https://github.com/iotaledger/firefly/blob/develop/packages/shared/lib/typings/migration.ts#L12-L16) is what getMigrationData() returns.

#### Create a Migration Bundle
Then, for the addresses we receive, we basically split them into chunks / bundles. We could create a single bundle for all addresses and migrate them, but we want to avoid that and cap the number of address a single bundle can contain, which happens [here](https://github.com/iotaledger/firefly/blob/develop/packages/shared/lib/migration.ts#L279-L300). Note that for spent addresses, we only have a single input per bundle.

#### Check for spent addresses
The next step is to check if there are spent addresses on a user's seed. If there are, we bundle mine those addresses. This is done through createMigrationBundle by setting the third param mine to true. For the rest of the bundles, we will keep this param to false. createMigrationBundle will return us the migration bundle.

#### Send them to the new network
The last step is to simply use sendMigrationBundle and broadcast them to the network.

Another important point is how we select inputs. You can see how Firefly accomplishes this [here](https://github.com/iotaledger/firefly/blob/develop/packages/shared/lib/migration.ts#L228-L277).


Basically, we need to make sure we create bundles that have accumulative balance >= 1Mi.

#### Migration Code Example with Node.js
This example creates a new database, account, and migrates funds from the legacy network to the chrysalis network.

 
```javascript=
require('dotenv').config()

async function run() {
    const { AccountManager, SignerType } = require('@iota/wallet')
    const manager = new AccountManager({
        storagePath: './migration-database',
    })
    manager.setStrongholdPassword(process.env.SH_PASSWORD)
    manager.storeMnemonic(SignerType.Stronghold)

    const account = await manager.createAccount({
        clientOptions: { node: "https://api.lb-0.testnet.chrysalis2.com", localPow: true },
        alias: 'Migration',
    })

    console.log('Account created:', account.alias())

    const nodes = ['https://nodes.devnet.iota.org']
    const seed = process.env.MIGRATION_SEED
    const migrationData = await manager.getMigrationData(
      nodes,
      seed,
      {
        permanode: 'https://chronicle.iota.org/api'
      }
    )
    console.log(migrationData)
    const bundle = await manager.createMigrationBundle(seed, migrationData.inputs.map(input => input.index), {
      logFileName: 'iota-migration.log'
    })
    await manager.sendMigrationBundle(nodes, bundle.bundleHash)
}

run()
```
If you are now to [wallet.rs](https://github.com/iotaledger/wallet.rs), please check out our [Wallet Library Documentation](https://chrysalis.docs.iota.org/libraries/wallet.html).
