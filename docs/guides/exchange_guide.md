# Exchange Guide

## The IOTA Wallet Library
> Easily integrate IOTA with your exchange, custody solution, or product

IOTA is built on a architecture that was designed to be the Backbone of the Internet of Things (IoT) environment of the future in mind. This architecture has made it more challenging for service providers like exchanges to integrate IOTA compared to traditional blockchains. With the Chrysalis update, we also ship many Libraries to help developers implement IOTA into their applications.

## Single account approach
A "hot wallet" is an address used for receiving transactions which gets displayed for users. 

The Single account approach is using an hotwallet address and store who owns which address in the database.

## How create an hot wallet address?
In wallet.rs, we used an account model. So you can create an account for each of your users. The other approach would be to use one account and generaty many addresses, which you can link to your users in your database.

- 1. Create an account for every user
- 2. Create one account with many adresses

## Implementation Guide
This guide explains, how to use the IOTA Library into an Exchange. If you already implemented the IOTA Hub, please visit the [Hub Migration Guide](./hub_guide.md).

Features of the Wallet Library:

- Secure Seed management
- Account management, with multiple accounts
- Confirmation monitoring
- Deposit address monitoring
- Backup and restore functionality


## How does it work?
The wallet library is a stateful package with a standardised interface for developers to build applications involving IOTA value transactions. It offers abstractions to handle IOTA payments and can optionally interact with IOTA Stronghold for seed handling, seed storage and state backup. Alternatively you can use a SQLite database. See the full specification here.

We recommend to implement IOTA Deposits. This means creating an account for every user to handle their tokens.

1. Setup the Wallet Library
2. Create an accont for each user
3. Generate an User address for deposit funds
4. Listen to events
5. Check the user balance
6. Enable withdrawals

If you looking for other languages, read the [library overview](library/overview.md).

### 1. Setup the Wallet Library

Install the Wallet Library and dotenv for password management. Read more about backup & security [here](backup_security.md).
```bash
npm install @iota/Wallet dotenv
touch .env
```

Input your password to the `.env` file like so:

```bash
SH_PASSWORD="here is your super sucure password"
```


Import the Wallet Library and create a manager.
```javascript
    const { AccountManager, SignerType } = require('@iota/wallet')

    // Setup IOTA Wallet Library
    const manager = new AccountManager({
        storagePath: './storage'
    })
    manager.setStrongholdPassword(process.env.SH_PASSWORD)
    manager.storeMnemonic(SignerType.Stronghold, manager.generateMnemonic())

```


### 2. Create an accont for an user
Creating an account for every user and storing it as main scenario.
```javascript
    let account = await manager.createAccount({
        alias: user_id, // an unique id from your exisitng user
        clientOptions: { node: 'http://api.lb-0.testnet.chrysalis2.com', localPow: false }
    })
```


### 3. Generate an User address for deposit funds (How Wallet Address).
```javascript
    // Always sync before account interactions
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')


    const addresses = account.listAddresses(true) // true =  unspent addresses
    let unspent_addr = '';
    if (addresses.length == 0) {
        unspent_addr = account.generateAddress().address
    } else {
        unspent_addr = addresses[0].address
    }
    console.log('Need a refill? Send it this address:', unspent_addr)
```

### 4. Listen to events
Fetching existing accounts and listening to transaction events coming into the account.

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

Read more about Events in the [API reference](https://wallet-lib.docs.iota.org/libraries/nodejs/api_reference.html#addeventlistenerevent-cb).

### 5. Check the user balance

Get the available account balance

```javascript
    // Always sync before account interactions
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')
    let balance = account.balance().available
    console.log('available balance', balance)
```

### 6. Enable withdrawals
Allowing withdrawals - checking if address is valid and sending to it

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
