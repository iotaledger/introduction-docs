# Developer Guide to Chrysalis (IOTA 1.5)

This is a quick guide meant to help you see the changes you will encounter while developing with the new network.

## A note about seeds and addresses

In Chrysalis, all ternary conversions have been removed which results in a better and faster developer experience.

Additionally, the WOTS-Signature has been changed to the Ed25519 signature scheme. This means that you can now use an address multiple times to send and receive tokens. 

And with all of these changes, the results encompass a completely different view of addresses and seeds:

IOTA 1.0 Address

```bash=
UDYXTZBE9GZGPM9SSQV9LTZNDLJIZMPUVVXYXFYVBLIEUHLSEWFTKZZLXYRHHWVQV9MNNX9KZC9D9UZWZRGJMIGPDW
```

Chrysalis (IOTA 1.5) Address

```bash=
atoi1qykf7rrdjzhgynfkw6z7360avhaaywf5a4vtyvvk6a06gcv5y7sksu7n5cs
```

With the new wallet library, developers do not need to use a seed anymore. The seed is now backed up with Stronghold, a software security box. It is not possible to remove the seed from this box since it uses encrypted snapshots that can be easily backed up and securely shared between devices. These snapshots are further secured by a password.

You can read more about Stronghold on the [Stronghold docs page](https://stronghold.docs.iota.org).


## Deep Dive

### Dust Protection
What is Dust? We define the spamming of a low value transaction as dust. A low value transaction in this case is a transaction with less than 1Mi value.

> In the UTXO model, each node in the network needs to keep track of all the currently unspent outputs. When the number of outputs becomes too large, it can cause performance and memory issues. The RFC found below proposes a new protocol rule regarding the processing of outputs where they transfer a very small amount of IOTA’s so-called dust outputs. Dust outputs are only allowed when they are backed up by a certain deposit on the receiving address. This limits the amount of dust outputs, thus making it expensive to proliferate dust. Since a receiver must make a deposit, the protocol makes receiving dust an opt-in feature.

[protocol-rfcs#0032](https://github.com/iotaledger/protocol-rfcs/pull/32)

### Up to 8 Parents
A message can be bound to minimum of one parent and up to eight parents.

