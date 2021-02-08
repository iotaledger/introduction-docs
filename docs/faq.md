# FAQ


## Which Libraries are available for Chrysalis?
There is a low level library iota.rs, which is a client library to connect with an IOTA Node for core interactions with the Tangle. It's written in Rust and there are currently to bindings for Node.js and Python. 

For Value Transactions there is the wallet.rs library, which provides helpful functionality to implement an IOTA Wallet into a application. It's also written in Rust and there are currently to bindings for Node.js and Python. 

Also there is a native C ([iota.c](https://github.com/iotaledger/iota.c)) and a native javascript ([iota.js](https://github.com/iotaledger/iota.js/tree/chrysalis)) client library. 

## What is Dust Protection and does it works?
Since IOTA is feeless and has to ability to send microntrasactions, attackers could use this to spam the network, which we called Dust. To avoid this, you need to have 1Mi amount of IOTA tokens
on a address where you want to receive microtransactions.

Read more about the Dust Protection [in the RFC here]().

## What's happening with Coordicide?
Chrysalis is a stage of the IOTA Network, which is still build on the Coordinator. With Coordicice, the IOTA Network get rid of the Coordinator and is a complete dezetralized Network. There are three stages to reach Cooridice, which resolves in three Test neworks: Pollen, Nectar and Honey. The Pollen Network runs in a research state on the goShimmer Node.