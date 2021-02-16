# Exchange Guide


## The IOTA Wallet Library
> Easily integrate IOTA with your exchange, custody solution, or product

IOTA is built on a architecture that was designed to be the Backbone of the Internet of Things (IoT) environment of the future in mind. This architecture has made it more challenging for service providers like exchanges to integrate IOTA compared to traditional blockchains. With the Chrysalis update, we also ship many Libraries to help developers implement IOTA into their applications.

This guide explains how to use the IOTA Library in an Exchange. If you already implemented the IOTA Hub, please visit the Hub Migration Guide.

Features of the Wallet Library:

- Secure Seed management
- Account managemnt, with multiple accounts
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
const manager = new AccountManager({
    storagePath: './iota-wallet-database',
})
manager.setStrongholdPassword(process.env.SH_PASSWORD)
manager.storeMnemonic(SignerType.Stronghold)
```


### 2. Create an accont for each user
Creating an account for every user and storing it as a main scenario.

:::info:
TODO: An implementation example will be input soon.
:::

### 3. Generate a User address for deposit funds
:::info:
TODO: An implementation example will be input soon.
:::


### 4. Listen to events
Fetching existing accounts and listening to transaction events coming into the account.

:::info:
TODO: An implementation example will be input soon.
:::

addEventListener(event, cb)
Adds a new event listener with a callback in the form of (err, data) => {}. Supported event names:

ErrorThrown
BalanceChange
NewTransaction
ConfirmationStateChange
Reattachment
Broadcast


### 5. Check the user balance
:::info:
TODO: An implementation example will be input soon.
:::

### 6. Enable withdrawals
Allowing withdrawals - checking if address is valid and sending to it

:::info:
TODO: An implementation example will be input soon.
:::