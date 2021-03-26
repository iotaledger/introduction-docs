# Developer guide to Chrysalis

This is a quick guide meant to help you navigate through some of the differences you will encounter while migrating to IOTA Chrysalis.

## A note about seeds and addresses

In Chrysalis, all ternary conversions apart from PoW have been removed which results in a better, faster developer experience.

Additionally, the WOTS-Signature has been replaced by a Ed25519 signature scheme. This means that you can now use an address multiple times to send and receive coins if you wish. 

With these changes, and the further adoption of industry standards, both seeds and addresses will look completely different in IOTA Chrysalis:

IOTA 1.0 Address

```bash=
UDYXTZBE9GZGPM9SSQV9LTZNDLJIZMPUVVXYXFYVBLIEUHLSEWFTKZZLXYRHHWVQV9MNNX9KZC9D9UZWZRGJMIGPDW
```

Chrysalis address (bech32 standard)

```bash=
iota11qykf7rrdjzhgynfkw6z7360avhaaywf5a4vtyvvk6a06gcv5y7sksu7n5cs
```

With the new [wallet library](../libraries/wallet.md), developers do not need to use a self-generated seed anymore. By default, the seed is created and stored in Stronghold, our in-house built security enclave. It is not possible to extract the seed from Stronghold for security purposes. Stronghold uses encrypted snapshots that can easily be backed up and securely shared between devices. These snapshots are then further secured with a password.

More information about IOTA Wallet Library is available on [Wallet docs page](https://wallet-lib.docs.iota.org) or in the [Exchange guide](exchange_guide.md), which is mainly focused on value transactions.

In addition to these resources, you can also read more about Stronghold on the [Stronghold docs page](https://stronghold.docs.iota.org).


## Deep dive

### Dust protection

Since IOTA is feeless and has the ability to send microtransactions, attackers could use this to spam the network with very low value transactions, which we call dust. To avoid this, we only allow microtransaction below 1Mi (dust) of IOTA tokens to another address if you already have at least 1Mi as a dust allowance output on that address. The number of allowed dust outputs on an address is the amount of the dust allowance outputs divided by 100,000 and rounded down, i.e. 10 outputs for each 1 Mi deposited, with a maximum of 100 dust outputs in total.

> In the UTXO model, each node in the network needs to keep track of all the currently unspent outputs. When the number of outputs becomes too large, it can cause performance and memory issues. The RFC found below proposes a new protocol rule regarding the processing of outputs where they transfer a very small amount of IOTA’s so-called dust outputs. Dust outputs are only allowed when they are backed up by a certain deposit on the receiving address. This limits the amount of dust outputs, thus making it expensive to proliferate dust. Since a receiver must make a deposit, the protocol makes receiving dust an opt-in feature.

[Protocol-rfcs#0032](https://github.com/iotaledger/protocol-rfcs/pull/32)

### Up to 8 Parents

With IOTA 1.0, you always had to reference 2 parent transactions. With Chrysalis, we introduce a more dynamic number of parent nodes where you can reference up to 8 parents. We recommend you reference at least 2 unique parents at all times for the best possible results.
