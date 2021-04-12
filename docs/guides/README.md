# IOTA Chrysalis Guides

- [Developer Guide](./dev_guide.md)
- [Exchange Guide](./exchange_guide.md)
- [Token Migration Guide](./token_guide.md)
- [Hub Migration Guide](./hub_guide.md)


## IOTA 1.5 (Chrysalis) in a nutshell
* IOTA network uses a DAG (Directed Acyclic Graph) to store its transactions. Each transaction can reference up to 8 parent transactions.
* There is a breaking change moving from IOTA 1.0 to IOTA 1.5 (Chrysalis). IOTA address was originally based on WOTS signature scheme (81 trytes) and it has been replaced by a Ed25519 signature scheme.
* In contrast to IOTA 1.0, IOTA 1.5 addresses are perfectly reusable;  even if one spends funds from the given address it can be used again
* There are new [client libraries](../libraries/overview.md) developed that serve as `one-source-code-of-truth` to IOTA users and providing binding to other programming languages 

