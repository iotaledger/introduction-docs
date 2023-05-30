---
description: Node software is the backbone of the IOTA and Shimmer networks.
image: /img/logo/preview.png
keywords:
- Node
- Hornet
- Golang
- explanation
---
# Node Software

Node software is the backbone of the IOTA and Shimmer networks. Individual nodes run the software to help maintain the state of the ledger through peer-to-peer communication. Nodes are also entry points to the network for users. The node software implements the core protocol that defines the network rules.

## Hornet

Hornet started out as an EDF-supported community node written in go and matured into the official node software
implementation maintained and developed by the IOTA Foundation. It has already proven itself to be a stable and
performant implementation, furthermore its [IOTA Node Extension (INX)](https://TODO_link_to_INX_page) framework introduced
for Stardust eases the development of application specific node extensions.

- [Official GitHub Repository](https://github.com/iotaledger/hornet)
- [Documentation](https://wiki.iota.org/hornet/develop/welcome)


## Node API Specification

- [Core rest-api specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/iotaledger/tips/stardust-api/tips/TIP-0025/core-rest-api.yaml).
- [UTXO Indexer rest-api specification](https://github.com/iotaledger/tips/blob/main/tips/TIP-0026/tip-0026.md).
- [Event API (MQTT) specification](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/iotaledger/tips/stardust-event-api/tips/TIP-0028/event-api.yml).

