---
description: The IOTA foundation provides load-balanced public Shimmer Beta endpoints, where MQTT and the HTTP REST API are enabled.
image: /img/logo/Chrysalis_logo_dark.png
keywords:
- devnet
- load-balanced
- HTTP REST API
- MQTT
- reference
---
# Shimmer Beta

Shimmer Beta is a pre-release of the Shimmer network that is currently under development.

## Public Infrastructure

IOTA currently provides a load-balanced public Shimmer Beta endpoint:

:::warning
TODO: Add a list of public Shimmer Beta endpoints.
:::

:::note

We recommend using the load balancer for most scenarios.

:::

We also provide single node endpoints that expose native [MQTT](https://mqtt.org/):

:::warning
TODO: Add a list of public Shimmer Beta MQTT endpoints.
:::

These endpoints have MQTT (via WebSockets and raw TCP) exposed and offer the HTTP REST API (according to this [specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/iotaledger/tips/stardust-api/tips/TIP-0025/core-rest-api.yaml)) over TLS.

## Developer Tools

:::warning
TODO: Add a list of public Shimmer Beta developer tools.
:::

- [Explorer](https://explorer.iota.org/betanet).
- [Online Faucet](https://).
- [cli-wallet](https://github.com/iotaledger/cli-wallet/tree/develop).
- [shimmer-faucet Code (nodejs + svelte)](https://github.com/iotaledger/chrysalis-faucet/tree/hornet).
