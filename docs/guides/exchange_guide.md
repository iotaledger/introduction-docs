# Exchange guide

## The IOTA Wallet Library

> Easily integrate IOTA with your exchange, custody solution, or product

IOTA is built on an architecture that was designed to be the backbone of the Internet of Things (IoT) environment of the future. This architecture has made it more challenging for service providers like exchanges to integrate IOTA compared to traditional blockchain-based distributed ledgers.

With the Chrysalis update (also know as IOTA 1.5), some building blocks have been changed to be more approachable and more aligned with existing standards being leveraged these days. We also ship many [client libraries](../libraries/overview.md) to help developers implement IOTA into their applications:
![layers](assets/wallet_rs_layers.svg)

## How do I implement it to my exchange?

In [wallet.rs](../libraries/wallet.html), we use an account model, so you can create an account for each of your users. The other approach would be to use one account and generate many addresses, which you can link to your users in your database. The wallet library is designed to be as flexible as possible to back up any of your use cases.

Since IOTA addresses in Chrysalis network are perfectly reusable, addresses can be mapped to your users in a clear and concise way.

- Create an account for every user -> `Multi Account` approach
- Create one account with many addresses -> `Single account` approach

The library supports derivation for multiple accounts from a single seed. An account is simply a deterministic identifier from which multiple addresses can be further derived. 

The following illustrates the relationships between seed, accounts and addresses. The library allows consumers to assign a meaningful alias to each account. In addition to that, generated individual accounts can be also searched via generated addresses and so it does not matter whether alias or address are known, the searching for the related account is very straightforward affair with `wallet.rs` library.

It also leaves the choice to users if they want to segregate their funds across multiple accounts or multiple addresses. 

![accounts](assets/accounts.svg)

### Multi account approach

The multi account approach is to create an account for each individual user. The created accounts can then be linked to the internal user ids as an account alias and are clearly separated.

### Single account approach

The single account approach is to just use one account and create addresses for each individual user. The associated addresses are then linked to the internal user ids and store who owns which address in the database. Most exchanges are more familiar with the single account approach and find it easier to use, implement, and backup.

## Implementation guide

This guide explains how to use the IOTA Wallet Library to successfully implement IOTA into an exchange. If you already implemented the IOTA Hub, please visit the [Hub Migration Guide](./hub_guide.md).

Features of the Wallet Library:
- Secure seed management
- Account management (with multiple accounts and multiple addresses)
- Confirmation monitoring
- Deposit address monitoring
- Backup and restore functionality

## How does it work?

The Wallet Library is a stateful package with a standardized interface for developers to build applications involving IOTA value transactions. It offers abstractions to handle IOTA payments and can optionally interact with IOTA Stronghold for seed handling, seed storage, and state backup. Alternatively, you can use a SQLite database, however using the Stronghold component is highly recommended due to the most advanced level of security applied.

See the [full documentation here](https://wallet-lib.docs.iota.org).

The following examples cover the *multi account approach* using `NodeJS` binding:

1. Setup the Wallet Library
2. Create an account for each user
3. Generate an user address for deposits
4. Listen to events
5. Check the user balance
6. Enable withdrawals

If you are looking for other languages, please kindly read the [wallet library overview](/libraries/wallet.md).

Anyway, since all `wallet.rs` bindings are based on core principles provided by `wallet.rs` library, the outlined approach is very similar regardless a programming language of your choice.

### 1. Setup the Wallet Library
First of all, let's install components that are needed to use `wallet.rs` and its binding of your choice. It may vary a bit from language to language. In case of `NodeJs` binding, it is quite straightforward since it is distributed via `npm` package manager. We also recommend to use `dotenv` for password management.

Read more about [backup & security here](backup_security.md).

```bash
npm install @iota/wallet dotenv
touch .env
```

Input your password to the `.env` file like this:

```bash
SH_PASSWORD="here is your super secure password"
```

Once you have everything needed to use the `wallet.rs` library, it is necessary to initialize the `AccountManager` instance that creates (open) a secure storage for individual accounts (backed up by `Stronghold` by default).

The storage is encrypted at rest and so you need a strong password and location where to put your storage. 

> Please note: deal with the password with utmost care

Technically speaking, the storage means a single file called `wallet.stronghold`. It is also needed to generate a seed (mnemonic) that serves as a cryptographic key from which all accounts and related addresses are generated.

One of the key principle behind the `stronghold`-based storage is that no one can get a seed from the storage. You deal with all accounts purely via `Account_Manager` instance and all complexities are hidden under the hood and are dealt with in a secure way. In case one would like to store a seed also somewhere else, there is a method `AccountManager.generateMnemonic()` that generates random seed and it can be leveraged before the actual account initialization.

Please note, it is highly recommended to store `stronghold` password and `stronghold` database on separate devices. Please kindly refer to [backup and security guide](backup_security.md) for more information.

Import the Wallet Library and create an account manager:
```javascript
    const { AccountManager, SignerType } = require('@iota/wallet')

    // Setup IOTA Wallet Library
    const manager = new AccountManager({
        storagePath: './storage'
    })
    manager.setStrongholdPassword(process.env.SH_PASSWORD)
    manager.storeMnemonic(SignerType.Stronghold, manager.generateMnemonic()) // seed generation
```

Needless to say, once the stronghold storage is created, it is not needed to generate the seed any more (`manager.storeMnemonic(SignerType.Stronghold, manager.generateMnemonic())`). It has been already saved in the storage together with all account information.

### 2. Create an account for an user

Once the backend storage is created, individual accounts for individual users can be created:

```javascript
    let account = await manager.createAccount({
        alias: user_id,  // an unique id from your existing user
        clientOptions: { node: 'http://api.lb-0.testnet.chrysalis2.com', localPow: false }
    })
```

Each account is related to a specific IOTA network (mainnet / devnet) which is referenced by a node properties, such as node url (in this example, Chrysalis testnet balancer).

For more information about `clientOptions`, please refer to [Wallet NodeJs API Reference](https://wallet-lib.docs.iota.org/libraries/nodejs/api_reference.html).

`Alias` can be whatever fits to the given use case and should be unique. The `alias` is usually used to identify the given account later on. Each account is also represented by `index` which is incremented (by 1) every time new account is created. Any account can be then referred to via `index`, `alias` or one of its generated `addresses`.

Once an account has been created you get an instance of it using the following methods: `AccountManager.getAccount(accountId)`, `AccountManager.getAccountByAlias(alias)` or `AccountManager.getAccounts()`.

The most common methods of `account` instance:
* `account.alias()`: returns an alias of the given account
* `account.listAddresses()`: returns list of addresses related to the account
* `account.getUnusedAddress()`: returns a first unused address
* `account.generateAddress()`: generate a new address for the address index incremented by 1
* `account.balance()`: returns the balance for the given account
* `account.sync()`: sync the account information with the tangle

### 3. Generate an user address to deposit funds
`Wallet.rs` is a stateful library which means it caches all relevant information in the storage to provide performance benefits while dealing with potentially many accounts/addresses.

> Please note: sync the account info with the network during the wallet manipulation to be sure the storage reflects an actual state of the ledger (network) 

Every account can own multiple addresses. Addresses are represented by `index` which is incremented (by 1) every time new address is created. The latest address is accessible via `account.latestAddress()`: 

```javascript
    // Always sync before account interactions
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')

    // By design, the last address of each account is an unused address which can be used as deposit address
    const latestAddress = account.latestAddress()

    console.log('Need a refill? Send it to this address:', latestAddress)
```
Feel free to fill the address with Testnet Tokens with the [IOTA Faucet](https://faucet.testnet.chrysalis2.com/) in order to test it.

Addresses are of two types: `internal` and `public` (external):
* each set of addresses is independent from each other and has independent `index` id
* addresses that are created by `account.generateAddress()` are indicated as `internal=false` (public)
* internal addresses (`internal=true`) are so called `change` addresses and are used to send the excess funds to
* the approach is also known as a *BIP32 Hierarchical Deterministic wallet (HD Wallet)*.

_Note: You may remember IOTA 1.0 network in which addresses were not reusable. It is no longer true and addresses can be reused multiple times in IOTA 1.5 (Chrysalis) network._

### 4. Listen to events
`Wallet.rs` library supports several events to be listened to. As soon as the given event occurs, a provided callback is triggered.

Example of fetching existing accounts and listen to transaction events coming into the account:

```javascript
    const { addEventListener } = require('@iota/wallet')

    const callback = function(err, data) {
        if(err) console.log("err:", err)
        console.log("data:", data)
    }

    //Adds a new event listener with a callback in the form of (err, data) => {}. Supported event names:
    addEventListener("BalanceChange", callback)

    // Possible Event Types:
    //
    // ErrorThrown
    // BalanceChange
    // NewTransaction
    // ConfirmationStateChange
    // Reattachment
    // Broadcast

```

Example output:

```bash
data: {
  accountId: 'wallet-account://1666fc60fc95534090728a345cc5a861301428f68a237bea2b5ba0c844988566',
  address: {
    address: 'atoi1q9c6r2ek5w2yz54en78m8dxwl4qmwd7gmh9u0krm45p8txxyhtfry6apvwj',
    balance: 20000000,
    keyIndex: 0,
    internal: false,
    outputs: [ [Object], [Object] ]
  },
  balance: 20000000
}
```

`accountId` can then be used to identify the given account via `AccountManager.getAccount(accountId)`.

Read more about Events in the [API reference](https://wallet-lib.docs.iota.org/libraries/nodejs/api_reference.html#addeventlistenerevent-cb).

### 5. Check the account balance

Get the available account balance across all addresses of the given account:

```javascript
    // Always sync before account interactions
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')
    let balance = account.balance().available
    console.log('available balance', balance)
```

### 6. Enable withdrawals
Sending tokens is performed via `SyncedAccount` instance that is a results of `account.sync()` function:

```javascript
    console.log('syncing...')
    const synced = await account.sync()
    console.log('available balance', account.balance().available)

    const address = 'atoi1qykf7rrdjzhgynfkw6z7360avhaaywf5a4vtyvvk6a06gcv5y7sksu7n5cs'

    // TODO: Check if address is valid.

    const amount = 1000000 // Amount in IOTA: 1000000 == 1 MIOTA

    const node_response = await synced.send(
        address,
        amount
    )

    console.log("Check your message on https://explorer.iota.org/crysalis/message/", node_response.id)
```

The full function signature is `SyncedAccount.send(address, amount[, options])`.
Default options are perfectly fine and do the job done, however additional options can be provided, such as `remainderValueStrategy`:
* `changeAddress`: Send the remainder value to an internal address
* `reuseAddress`: Send the remainder value back to its original address

`SyncedAccount.send()` function returns a `wallet message` that fully describes the given transaction. Especially `messageId` can later be used for checking a confirmation status. Individual messages related to the given account can be obtained via `account.listMessages()` function.

Please note, when sending tokens, a [dust protection](dev_guide.html#dust-protection) mechanism should be considered. 
