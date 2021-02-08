# Developer Guide to Chrysalis (IOTA 1.5)

A quick guide to see the changes you will face while developing with the new network.

## A note about seeds and addresses

In Chrysalis all ternary conversions have been removed, which results in a better and faster developer experience.

Also the WOTS-Signarure has beed chaged to the Ed25519 Signarure scheme. That means, you can use an address now multiple times to send and recive tokens. 

So all these changes results into a complete different view of addresses and seeds: 

IOTA 1.0 Address

```bash=
UDYXTZBE9GZGPM9SSQV9LTZNDLJIZMPUVVXYXFYVBLIEUHLSEWFTKZZLXYRHHWVQV9MNNX9KZC9D9UZWZRGJMIGPDW
```

Chrysalis (IOTA 1.5) Address

```bash=
atoi1qykf7rrdjzhgynfkw6z7360avhaaywf5a4vtyvvk6a06gcv5y7sksu7n5cs
```

With the new wallet library, developers dont need to usa a Seed anymore. The Seed is backed up with Stronghold, which is an software security box. It's not possible to get the seed out of this box. It uses encrypted snapshots that can be easily backed up and securely shared between devices. These snapshots are secured by an password.

Read more about Stronghold on the [Stronghold docs page](https://stronghold.docs.iota.org).


## Deep Dive

### Dust Protection
What is Dust? We define the spamming of low value transaction as dust. A low value transaction is a transaction with less than 1Mi value.

> In the UTXO model, each node in the network needs to keep track of all the currently unspent outputs. When the number of outputs gets too large, this can cause performance and memory issues. This RFC proposes a new protocol rule regarding the processing of outputs that transfer a very small amount of IOTA, so-called dust outputs: Dust outputs are only allowed when they are backed up by a certain deposit on the receiving address. This limits the amount of dust outputs, thus making it expensive to proliferate dust. Since a receiver must make a deposit, the protocol makes receiving dust an opt-in feature.

[protocol-rfcs#0032](https://github.com/iotaledger/protocol-rfcs/pull/32)

### Up to 8 Parents.s
An message can be bind to minimal one parent and up to eight parents.

