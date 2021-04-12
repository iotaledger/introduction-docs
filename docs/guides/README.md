# IOTA Chrysalis Guides

- [Developer Guide](./dev_guide.md)
- [Exchange Guide](./exchange_guide.md)
- [Token Migration Guide](./token_guide.md)
- [Hub Migration Guide](./hub_guide.md)


## Overall changes from IOTA 1.0 to 1.5 (Chrysalis) in a nutshell
* The format of the address was changed and it is based on both `derivation path` and `bech32` standards. See [IOTA address anatomy](./dev_guide.md#iota-15-address-anatomy)
* The concepts of `bundles` and `transactions` were replaced with the concepts of `messages` and `payloads`. The `message` is a data structure that is actually being broadcast in the network and represents a node (vertex) in the Tangle graph. See [messages, payload and transactions](./dev_guide.md#messages-payload-and-transactions) and [selected message payloads](./dev_guide.md#selected-message-payloads)
* The IOTA network is based on a DAG (Directed Acyclic Graph) to store individual `messages` (and related `transactions`). However, each `message` can newly reference up to 8 parent messages. See [messages, payload and transactions](./dev_guide.md#messages-payload-and-transactions)
* The signature scheme based on `WOTS` was replaced with with `Ed25519` signature scheme. See [seed and addresses](./dev_guide.md#seed-and-addresses)
* Due to the changed signature scheme, IOTA addresses are reusable without any negative security impact
* In contrary to IOTA 1.0 that was based on ternary, IOTA 1.5 is based on binary and, thus, very effective on all kinds of current hardware devices
* In contrast to IOTA 1.0, IOTA 1.5 addresses are perfectly reusable; even if one spends funds from the given address, it can be used again. See [address/key space](./dev_guide.md#addresskey-space)
* Originally, IOTA 1.0 used an `account-based model` for tracking individual iota tokens. Chrysalis embraced `Unspent Transaction Output` (also known as `UTXO`) model to track tokens and token holders. See [Unspent Transaction Output](./dev_guide.md#unspent-transaction-output-utxo)
* The approach to client libraries was completely reengineered from the ground up. There are new official client libraries that serve as `one-source-code-of-truth` to IOTA users and can be combined in a modular fashion based on particular use cases. All libraries provide a binding to other programming languages. See [client libraries](../libraries/overview.md)
* Our official iota tools, such as wallet software, use the same libraries under the hood and so any developer may taste the same [dog food](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) as we do
* The official client libraries embraced `Hierarchical Deterministic Wallets` approach which is fully `BIP44` compatible. See [address/key space](./dev_guide.md#addresskey-space)
* There is a new official wallet software called Firefly. See [firefly beta release](https://blog.iota.org/firefly-beta-release/)
