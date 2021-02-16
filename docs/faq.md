# FAQ


## Which Libraries are available for Chrysalis?
At this time, there are a handful of libraries available for Chrysalis which can be found below:

A low level library called iota.rs is a client library meant to connect with an IOTA node for core interactions with the Tangle. It is written in Rust and there are currently two bindings for Node.js and Python. 

For Value Transactions there is the wallet.rs library which provides helpful functionalities to implement a IOTA Wallet into an application. It is also written in Rust and there are currently two bindings for Node.js and Python. 

Additionally, there is also a native C ([iota.c](https://github.com/iotaledger/iota.c)) and a native javascript ([iota.js](https://github.com/iotaledger/iota.js/tree/chrysalis)) client library. 

## What is Dust Protection and does it works?
Since IOTA is feeless and has the ability to send microtransactions, attackers could use this to spam the network, which we call Dust. To avoid this, you need to have a 1Mi amount of IOTA tokens on an address where you want to receive microtransactions.

You can read more about Dust Protection [in the RFC here](https://github.com/iotaledger/protocol-rfcs/pull/32).

## What's happening with Coordicide?
Chrysalis is a stage of the IOTA network that is still built on the Coordinator. With Coordicice, the IOTA Network will get rid of the Coordinator and become a completely decentralized network. There are three stages to reach Cooridice, which resolves in three Test neworks: Pollen, Nectar, and Honey. The Pollen Network runs in a research state on the goShimmer Node.

## When is a tx on the Chrysalis network irreversible?
Confirmation times on the new network are great, average around 10 seconds to final. Once a transaction is set to confirmed it’s final instantly, you don’t have block confirmations like with blockchain.

## Hornet or bee? Which node should I use?
You can pick Bee or Hornet, we currently recommend Hornet since it’s the more complete version of the node software, Bee is still missing some optional features you might want to have.
