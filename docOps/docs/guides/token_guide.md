# Chrysalis Migration

By the end of the Chrysalis migration, a number of aspects at IOTA changed for the better. With easier ways to
manage and secure your experience, IOTA seamlessly integrated these innovations with no service interruptions.

With Chrysalis, we made a clear-cut from the current IOTA protocol, and started a new with a much better, and more mature
network. The network supports many new use cases and created a foundation for IOTA’s upcoming Coordicide.

This included one of the innovations that directly impacted one of the most crucial aspects of your experience: funds.

## Token Migration Overview

Below is an overview of how the migration will take place for normal token holders:

1. You enter your seed in Firefly.
2. Firefly creates you a new seed and generates an EdDSA address for the new network.
3. Firefly sends your funds to a specific migration address (which encapsulates your EdDSA address) on the old network.
4. Your funds become available on the new network on the EdDSA address Firefly created for you.
5. Your funds are successfully migrated.

Note that:

- If you migrate after the Chrysalis launch, your funds will become available shortly after you migrate (within less
  than 5 minutes).

> Firefly will initially only be available on desktop operating systems such as: macOS, Linux and Windows and not support
> migrations for Ledger devices or using a Ledger device.

For further information on the migration process, see our [blog post](https://blog.iota.org/firefly-token-migration/).

For a detailed explaination on how the migration process works technically, see [migration-mechanism](./migration-mechanism.md)

## Exchange Token Migration Guide

To help you successfully transfer your tokens securely to the  Chrysalis network, we created this guide as
an overview of the migration process and its intricacies.

Note: On the 28th of April, Chrysalis Phase 2 was released (with its corresponding node software, libraries and tooling).
After this, the legacy network only supports migration transfers moving further (this is accompanied by a legacy
node release). This means that both a legacy (albeit only for migrations), and a new Chrysalis Phase 2 network will
co-exist. 

There are two ways with which you can migrate your funds from the old legacy to the Chrysalis Phase 2 network:

1. You can either use our Firefly wallet (which allows migrating from either an 81-tryte seed or seed vault file)
   (check out this [blog post](https://blog.iota.org/firefly-token-migration/) on how to do this)(.
2. Or you can craft a migration bundle yourself which transfers your funds to a special migration address under your
   control (programmatic approach).

This guide will further only explain how to create a migration bundle, and the rules imposed on it.

### Migrating Funds by Issuing Migration Bundles

Note that as mentioned above, there was a special release for the legacy node software on the 28th of April, which
will only further support migration bundles. In case you're operating a node yourself you must upgrade to that version,
as otherwise you will no longer be synchronized with the network.

#### Migration bundle

With this limited legacy network, only migration bundles will further confirm. A migration bundle is nothing else than a
normal value bundle/transfer which has some additional restrictions. If you craft a bundle which obeys to the following
rules, then it falls under what we define as a migration bundle:

- It contains exactly one output transaction of which the destination address is a valid migration address and is
  positioned as the tail transaction within the bundle (meaning `currentIndex` 0). **The output transaction value is at
  least 1'000'000 tokens (1 Mi).**
- It does not contain any zero-value transactions which do not hold signature fragments. This means that transactions
  other than the tail transaction must always be part of an input.
- Input transactions must not use migration addresses.

If in doubt whether your bundle is an actual migration bundle, you can use [ValidBundle(bundle, true)](https://github.com/iotaledger/iota.go/blob/2618d56d58105dfc2f3b7f1eb3481d9f89a1d6bc/bundle/bundle.go#L335)
function of our iota.go library to validate this. In case you're not acquainted with Go, you can also contact us on
Discord or Slack to ensure that your crafted bundles are valid migration bundles.

Things to consider:

- You must not broadcast your own migration bundles unless you're 100% sure that they are indeed valid migration
  bundles.
- If one of your input transactions spends funds from an already used address (meaning it is subject to key re-use), we
  recommend that you use the [bundle miner tool](https://github.com/iotaledger/iota.rs/tree/migration/iota-bundle-miner) to craft a bundle with the most applicable security given the already exposed parts of the given address' private key.
- Do not use too many input transactions as this will increase the overall Proof-of-Work time needed for a single
  bundle. Rather, split your input addresses over multiple migration bundles.
- Your code must include logic to await for the migration bundle's confirmation. If you find that your migration bundle
  is not confirming, consider re-attaching it (re-attaching is **not** the same as re-signing the bundle).
- If you submit a migration bundle for broadcasting via the `broadcastTransactions` API command and you're using the
  updated legacy node software (which you must on/after the 28th of April), then it will additionally check up on
  submission whether your submitted bundle really adheres to the rules outlined above as an additional safe guard.

For further information about the migration bundles, have a look at [RFC-0035](https://github.com/luca-moser/protocol-rfcs/blob/rfc/wotsicide/text/0035-wotsicide/0035-wotsicide.md#migration-bundle).

As an example, [this bundle](https://explorer.iota.org/mainnet/bundle/ZRAFFSEPRKDYGGA9DJQBWCXG9CGODUNZUBOWHVFQY9DK9HCHJQTHHSYBQRGZHGXWAPXDTJPPFJ9XFUALW) is a valid migration bundle. It spends 1 Mi

- from:
  `YVLQWMRUZ9RCQODQZFYDNRVXHERUFPSDVLDRQLHEWGJLRTMEAQNX9OHZJVTONDHMUJQECDCUAR9PUIGAZPAAEHTZXB`
- to:
  `TRANSFERTBIXPEWWYZZWBWPWJCB9XYMC9AGYH9X9AYAYADVXTYGYB9G9J9PEF9O9KYZXS9D9MANWTZOD9B9HMRQFWZ` where the destination address encodes the target Bech32 address `iota1qqhmslysuwfedz2mqtr4ux73pr7uhjmd4tpazqs8pf7qdax44muqgw0fz25` respectively the hex Ed25519 address `2fb87c90e39396895b02c75e1bd108fdcbcb6daac3d102070a7c06f4d5aef804` on which the these funds will be made available in the new network.

##### Migration address

As mentioned above, a migration bundle must have as its single destination/output address a migration address. A
migration address is in essence an EdDSA address (to which you hold the keys on the new network) encoded in a legacy
tryte address. You can create such an address in the following way:

- Compute the [BLAKE2b-256](https://tools.ietf.org/html/rfc7693) hash `H` of your Ed25519 address `A` (this address is the one you control in the new network; note that an Ed25519 address is the Blake2b-256 hash of your Ed25519 public key).
- Append the first 4 bytes of `H` to `A`, resulting in 36 bytes.
- Convert `A` to trytes using the `b1t6` encoding (as described
  in [RFC-15](https://github.com/iotaledger/protocol-rfcs/blob/master/text/0015-binary-to-ternary-encoding/0015-binary-to-ternary-encoding.md)). This results in `A`<sub>tri</sub> consisting of 72 trytes.
- Prepend the 8-tryte prefix `TRANSFER` to `A`<sub>tri</sub>.
- Finally, pad `A`<sub>tri</sub> with the single tryte `9` to get a legacy 81-tryte address.

Example:

- Ed25519 address (32-byte): `6f9e8510b88b0ea4fbc684df90ba310540370a0403067b22cef4971fec3e8bb8`
- Migration address including 9-tryte checksum (
  90-tryte): `TRANSFERCDJWLVPAIXRWNAPXV9WYKVUZWWKXVBE9JBABJ9D9C9F9OEGADYO9CWDAGZHBRWIXLXG9MAJV9RJEOLXSJW`

Since nobody holds keys to such migration addresses, funds are effectively burned and can no longer be used in the
legacy network.