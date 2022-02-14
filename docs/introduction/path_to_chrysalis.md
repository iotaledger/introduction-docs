# Path to Chrysalis

One of the IOTA Foundation’s primary roles is defining and delivering on a development roadmap that aligns with it's strategy to reach production-readiness and adoption.

The IOTA mainnet has been operational since 2016 and the overall engineering strategy significantly evolved based on industry demand and feedback.

Progress in Coordicide research has resulted in identifying many concepts that could already be implemented on the current IOTA mainnet and provides significant value to users of the protocol before Coordicide. This led to the formalization of an engineering strategy around Chrysalis: a series of upgrades to the protocol that achieves production-readiness before Coordicide.

The benefit of this approach is that many of the protocol properties will remain the same, or almost the same, for Coordicide. That, together with a better set of developer tools, will make the transition to Coordicide much simpler.

The intended outcomes for Chrysalis were:

- **Simpler transition to Coordicide** - With Coordicide making significant progress, we want to ensure that you, developers, and companies that build and deploy on Chrysalis will have as smooth a transition to Coordicide as possible.
- **Substantial performance improvements** - With the changes introduced by Chrysalis, we will see a substantial improvement in the scalability and reliability of the IOTA Mainnet.
- **Improved experiences for you, other users, and developers** - The new protocol features, new libraries, and the new wallet will make IOTA one of the best platforms to build on, removing the friction developers experience today while allowing solutions built on top of the protocol to provide better user experience.
- **Accelerated adoption** - Chrysalis will make IOTA production-ready; becoming a stable protocol, with a reliable set of developer tools and frameworks that will enable startups, corporations, and governments to develop and launch products powered by IOTA.

## The Stages to Chrysalis

![](/Users/charlesthompson/chrysalis-docs/docs/introduction/assets/path_to_chrysalis/01.png)

The Chrysalis upgrade is a complex undertaking. We are coordinating several distinct products to ensure a smooth transition for you and the IOTA partners. In addition to the core node software, we also need to update our wallet software, our libraries, and the entire infrastructure.  

Another important requirement is the ease of transition to the future Coordicide network. By carefully planning the breaking changes introduced along the way, and providing support in our developer tools, we will ensure that our growing ecosystem of developers, startups, and corporations can reliably develop and launch new innovative products on IOTA.  

The plan for implementing Chrysalis is divided into two phases.

**The first phase** consisted of improved tip selection (URTS), milestone selection, and White flag. These were gradually implemented in the node software. This phase required an upgrade of all nodes, including the coordinator node, and did not require a snapshot.  

The first phase of Chrysalis resulted in:

- Transaction confirmation times of around 10 seconds.
- Transactions rarely needing reattachment.
- A substantial TPS increase.
- Performance and reliability improvements for nodes.

**The second phase** of Chrysalis consists of adopting and/or implementing UTXO, atomic transactions, reusable addresses (Ed25519), a transition to a binary transaction layout, and a new set of client libraries and developer tools. These represent significant changes to the core protocol and the way transactions are structured. Once everything was tested, validated, and audited, the Foundation deployed a new Chrysalis network. The upgrade consists of an extended period when the current, legacy network remains operational. This allows you, users, exchanges, and partners to migrate to the Chrysalis network at will. The migration is not time constrained.  

The second phase of Chrysalis consists of:

- Reusable addresses and support for more standard cryptography (EdDSA), making efficient hardware support for all major architectures possible.
- A simplified transaction layout and a reduction in transaction size, further increasing performance and efficiency.
- Significant improvements to the usability and reliability of IOTA.
- A switch to a UTXO based model from the current account model.

The introduction of reusable addresses is an important change for token holders. This vastly improves IOTA’s usability and makes integration into new exchanges, wallets, and payment systems much simpler. A new wallet, called Firefly, was released with Chrysalis. This wallet allows token holders to transition from the current WOTS address scheme to the new EdDSA scheme.  

Our goal was to make this transition as seamless as possible for everyone in the IOTA ecosystem. This includes a variety of improvements and updates to our libraries and software, as well as training and educational sessions for our partners.

### From Plan to Action

With Chrysalis, we had to make decisions on how to best implement all the upcoming changes, ensuring a correct and timely implementation. Below is an overview of the various components we are implementing within this update.

### Specification and Standardization

Specifications are a major part of our new development process. All our new software projects (Node software, Wallet, Identity, Access, Streams, etc.) are based on vetted specifications. Specifications make it possible for external parties to follow a project’s intended functionality, for example for audit purposes, or develop their own implementations in different languages.

The Chrysalis changes are specified in the form of RFCs. You can find all the RFCs in the [protocol-rfcs repository](https://github.com/iotaledger/protocol-rfcs). The list of Chrysalis RFCs includes:

- [Improved tip selection (URTS)](https://github.com/luca-moser/protocol-rfcs/blob/rfc-urts-tip-sel/text/0008-weighted-uniform-random-tip-selection/0008-weighted-uniform-random-tip-selection.md).
- [Milestone selection](https://github.com/iotaledger/protocol-rfcs/blob/milestone-merkle-validation-chrysalis-pt-2/text/0012-milestone-merkle-validation/0012-milestone-merkle-validation.md).
- [White flag](https://github.com/thibault-martinez/protocol-rfcs/blob/rfc-white-flag/text/0005-white-flag/0005-white-flag.md).
- [UTXO](https://github.com/hmoog/protocol-rfcs/blob/master/text/0011-utxo-model/0011-utxo-model.md).
- [Ed25519 Signature Scheme](https://github.com/iotaledger/protocol-rfcs/blob/ee07797acb5940b7dbb5c3411b184ccdc6afdbb1/text/0000-ed25519-signature-scheme/0000-ed25519-signature-scheme.md).
- [Reusable addresses (Ed25519)](https://github.com/Wollac/protocol-rfcs/blob/ed25519/text/0009-ed25519-signature-scheme/0009-ed25519-signature-scheme.md).
- [Message object](https://github.com/GalRogozinski/protocol-rfcs/blob/message/text/0017-message/0017-message.md).
- [Binary transaction layout](https://github.com/luca-moser/protocol-rfcs/blob/signed-tx-payload/text/0000-transaction-payload/0000-transaction-payload.md).
- [Message proof of work](https://github.com/Wollac/protocol-rfcs/blob/message-pow/text/0024-message-pow/0024-message-pow.md).
- [Dust protection](https://github.com/GalRogozinski/protocol-rfcs/blob/dust/text/0032-dust-protection/0032-dust-protection.md).
- [New local snapshot file format](https://github.com/luca-moser/protocol-rfcs/blob/local-snapshot-file-format/text/0000-local-snapshot-file-format/0000-local-snapshot-file-format.md).
- [Bech32 address format](https://github.com/Wollac/protocol-rfcs/blob/bech32-address-format/text/0020-bech32-address-format/0020-bech32-address-format.md).
- [RESTful node API](https://editor.swagger.io/?url=https://raw.githubusercontent.com/rufsam/protocol-rfcs/master/text/0026-rest-api/rest-api.yaml).
- [Eventful node API](https://playground.asyncapi.io/?load=https://raw.githubusercontent.com/luca-moser/protocol-rfcs/rfc/node-event-api/text/0033-node-event-api/0033-node-event-api.yml).

### Wallet Support

The Trinity wallet was a popular IOTA wallet. With Chrysalis, we released a new wallet implementation, [Firefly](https://blog.iota.org/firefly-iota-next-generation-wallet-26bdd4d01510/). The team has been working on a complete reevaluation of the wallet architecture, with a completely redesigned user experience. At its core is a [new wallet library](../libraries/wallet.md) written in Rust. The wallet library is designed to allow other developers to easily implement IOTA wallets within their applications. Another new Rust library utilized by Firefly is Stronghold; Stronghold enables ultra-secure secret handling and storage.  

### Infrastructure

Currently, the IOTA Foundation supports two public Networks: Mainnet and Devnet (Devnet is for PoCs and application tests). Both networks provide public endpoints for you, other users, and partners. You can read more about the networks and how you can participate in our [documentation](https://wiki.iota.org/build/welcome#choose-a-network).  

### Chrysalis Devnet

Nodes deployed to the devnet can be queried using a load balancer at:

- api.lb-0.devnet.chrysalis2.com.

We recommend using the load balancer for most scenarios.

Single node endpoints that expose native MQTT are:

- api.hornet-0.devnet.chrysalis2.com.
- api.hornet-1.devnet.chrysalis2.com.
- api.hornet-2.devnet.chrysalis2.com.
- api.hornet-3.devnet.chrysalis2.com.

## Conclusion

Chrysalis is the most promising series of upgrades made to IOTA yet. It is a major step for our production-readiness, with increased transaction throughput, network stability, improved usability, and enables new features and use cases.
