# Devnet

Since the Chrysalis update, the `testnet` is now called `devnet`.  We recommend you use the `devnet` to develop and test your application.  

## Public Infrastructure

The IOTA Foundation provides the following load-balanced public devNet endpoint:

- [https://api.lb-0.h.chrysalis-devnet.iota.cafe/](https://api.lb-0.h.chrysalis-devnet.iota.cafe/)
- [https://api.lb-1.h.chrysalis-devnet.iota.cafe/](https://api.lb-1.h.chrysalis-devnet.iota.cafe/)

:::info
We recommend using the load balancer for most scenarios.
:::

Single node endpoints that expose native [MQTT](https://mqtt.org/), in case you need them, are:

- [https://api.thin-hornet-0.h.chrysalis-devnet.iota.cafe](https://api.thin-hornet-0.h.chrysalis-devnet.iota.cafe)
- [https://api.thin-hornet-1.h.chrysalis-devnet.iota.cafe](https://api.thin-hornet-1.h.chrysalis-devnet.iota.cafe)
- [mqtt.lb-0.h.chrysalis-devnet.iota.cafe:1883](mqtt.lb-0.h.chrysalis-devnet.iota.cafe:1883)
- [mqtt.lb-1.h.chrysalis-devnet.iota.cafe:1883](mqtt.lb-1.h.chrysalis-devnet.iota.cafe:1883)

These endpoints have MQTT (via WebSockets and raw TCP) exposed and offer the HTTP REST API (according to this [specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/rufsam/protocol-rfcs/master/text/0026-rest-api/rest-api.yaml)) over TLS.

## Developer tools

- [Explorer](https://explorer.iota.org/devnet)
- [Online Faucet](https://faucet.chrysalis-devnet.iota.cafe)
- [cli-wallet](https://github.com/iotaledger/cli-wallet)
- [chrysalis-faucet Code (nodejs + svelte)](https://github.com/iotaledger/chrysalis-faucet)
