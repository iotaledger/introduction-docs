# Testnet

IOTA 1.5 (also known as Chrysalis) is IOTA's intermediate stage before Coordicide is complete. You can read more about the strategy for releasing Chrysalis [here](https://blog.iota.org/release-strategy-for-chrysalis-iota-1-5-4ea8741ea3a1/).

## Infrastructure
Nodes deployed to the testnet can be queried using a load balancer at:

- api.lb-0.testnet.chrysalis2.com

We recommend using the load balancer for most scenarios.

Single node endpoints that expose native MQTT, in case you need them, are:

- api.hornet-0.testnet.chrysalis2.com
- api.hornet-1.testnet.chrysalis2.com
- api.hornet-2.testnet.chrysalis2.com
- api.hornet-3.testnet.chrysalis2.com


The Node API is integrated according to the [following specification](https://editor.swagger.io/?url=https://raw.githubusercontent.com/rufsam/protocol-rfcs/master/text/0026-rest-api/rest-api.yaml).

## Developer tools
- [Explorer](https://explorer.iota.org/chrysalis)
- [Online Faucet](https://faucet.testnet.chrysalis2.com/)
- [cli-wallet](https://github.com/iotaledger/cli-wallet)
- [chrysalis-faucet Code (nodejs + svelte)](https://github.com/iotaledger/chrysalis-faucet)

