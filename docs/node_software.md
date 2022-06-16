---
description: Hornet is an EDF-supported community node written in Go. Bee is an IOTA Node implemented by the Foundation and written in Rust. We recommend using Hornet since it has several optional features that are not implemented in Bee.
image: /img/logo/Chrysalis_logo_dark.png
keywords:
- Node
- Hornet
- Bee
- Golang
- Rust
- explanation
---
# Node Software

:::warning
TODO: Update for Stardust/Shimmer.
:::

We have been running the network exclusively on the Go powered Hornet node since the summer of 2020. For Chrysalis, we introduced the options of using an updated version of Hornet or our new Rust-based Bee node.

## Hornet and Bee

Both Hornet and Bee are the officially supported nodes for IOTA.

Hornet is an EDF-supported community node written in Go and has already proven itself to be a stable and performant implementation. 

Bee is an IOTA Node implemented by the Foundation and written in Rust.

:::info

At this stage, we recommend using Hornet since it has several optional features that are not implemented in Bee so far.

:::

## Hornet

- [Official GitHub Repository](https://github.com/iotaledger/hornet).
- [Documentation](https://wiki.iota.org/hornet/welcome).

## Bee
- [Official GitHub Repository](https://github.com/iotaledger/bee/tree/shimmer-develop).
- [Documentation](https://wiki.iota.org/bee/welcome).

## Node API Specification

- [rest-api specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/iotaledger/tips/stardust-api/tips/TIP-0025/core-rest-api.yaml).
- [UTXO indexer rest-api specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/iotaledger/tips/indexer-api/tips/TIP-0026/indexer-rest-api.yaml).
- [event-api (MQTT) specification](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/iotaledger/tips/stardust-event-api/tips/TIP-0028/event-api.yml).

