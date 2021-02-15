# Exchange Guide


## The IOTA Wallet Library
> Easily Integrate IOTA With Your Exchange, Custody Solution, Or Product

IOTA is built on a architecture that was designed to be the Backbone of the Internet of Things (IoT) environment of the future in mind. This architecture has made it more challenging for service providers like exchanges to integrate IOTA compared to traditional blockchains. With the Chrysalis Update, we also ship many Libraries to help developers implement IOTA into their applications.

This guide explains, how to use the IOTA Library into an Exchange. IF you already implemented the IOTA Hub, please visit thee Hub Migration Guide.

Features of the Wallet Library

- Secure Seed management
- Account Managemnt, with multiple accounts
- Confirmation monitoring
- Deposit address monitoring
- Backup and Restore functionality


## How does it work?
The wallet library is a stateful package with a standardised interface for developers to build applications involving IOTA value transactions. It offers abstractions to handle IOTA payments and can optionally interact with IOTA Stronghold for seed handling, seed storage and state backup. Alternatively you can use a SQLite database. See the full specification here.


We recommend to implement IOTA Deposits. That means, creating an account for every user to handle their tokens.

1. Setup the Wallet Library
2. Create an accont for each user
3. Generate an User address for deposit funds.
4. Listen to events
5. Check the user balance
6. Enable withdrawals

If you looking for other languages, read the [library overview](library/overview.md).

### 1. Setup the Wallet Library

Install the Wallet Library and dotenv for passwort management. Read more about backup & security [here](backup_security.md).
```bash
npm install @iota/Wallet dotenv
touch .env
```

Input your password to the `.env` file like this:

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
Creating an account for every user and storing it as main scenario.
<todo>add js example</todo>

### 3. Generat an User address for deposit funds.
<todo>add js example</todo>


### 4. Listen to events
Fetching existing accounts and listening to transaction events coming into the account

<todo>add js example</todo>

addEventListener(event, cb)
Adds a new event listener with a callback in the form of (err, data) => {}. Supported event names:

ErrorThrown
BalanceChange
NewTransaction
ConfirmationStateChange
Reattachment
Broadcast


### 5. Check the user balance
<todo>add js example</todo>

### 6. Enable withdrawals
Allowing withdrawals - checking if address is valid and sending to it
<todo>add js example</todo>



###  References and Input
<todo>Remove this</todo>


- Allowing withdrawals - checking if address is valid and sending to it
- Deposits (main way) - creating an account for every user and storing it as main scenario,
- Fetching existing accounts and listening to transaction events coming into the account
- Deposits (secondary) - creating a main account for all the users and keeping track which users belong to which addresses
- Consolidation will be available in wallet.rs later


Here's the fake exchange repo I (Dave) made, 1 without implementation and a branch with implementation (so the master branch is just a fake exchange without any real implementation in it yet): https://github.com/fijter/fakexchange
Here's the video where I do the actual implementation: https://www.youtube.com/watch?v=O2ukIXqJTls


This uses Hub, but the principles are the same, creating addresses for users, monitoring those, sweeping the funds away from those addresses after arriving (and adding funds to the user account on the exchange platform) and sending funds on a withdrawal.