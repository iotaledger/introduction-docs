# Testnet

## Public Infrastructure
The IOTA Foundation provides the following loadbalanced public testnet endpoint:

- api.lb-0.testnet.chrysalis2.com

> We recommend using the load balancer for most scenarios.

Single node endpoints that expose native MQTT, in case you need them, are:

- api.hornet-0.testnet.chrysalis2.com.
- api.hornet-1.testnet.chrysalis2.com.
- api.hornet-2.testnet.chrysalis2.com.
- api.hornet-3.testnet.chrysalis2.com.

These endpoints have MQTT (via WebSockets and raw TCP) exposed and offer the HTTP REST API
(according to this [specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/rufsam/protocol-rfcs/master/text/0026-rest-api/rest-api.yaml)) over TLS.

## Developer Tools
- [Explorer](https://explorer.iota.org/chrysalis).
- [Online Faucet](https://faucet.testnet.chrysalis2.com/).
- [cli-wallet](https://github.com/iotaledger/cli-wallet).
- [chrysalis-faucet Code (nodejs + svelte)](https://github.com/iotaledger/chrysalis-faucet).

