---
keywords:
- Stardust
- Shimmer
- Upgrades
- Mainnet
- Protocol Improvements
- explanation
description: Specific Stardust Upgrades from IOTA 1.5 Chrysalis.
image: /img/logo/preview.png
---

# What is Stardust?

The previous IOTA protocol, Chrysalis, was optimized for a single application: sending digital money from A to B.
The upcoming Stardust upgrade introduces computation and utility to the ledger:
- making IOTA an **infrastructure and settlement layer** for [second-layer smart contract chains](https://wiki.iota.org/smart-contracts/overview) using IOTA Smart Contracts (ISC)
- transforming IOTA into a **multi-asset ledger** with custom, user-defined tokens using the new tokenisation framework.
Let’s examine each of these separately. 

## Tokenization framework
The tokenization framework enables a lot of new functionality that builders want. Most importantly the ability to mint other tokens and NFTs. Our approach is different to the approach used in most other platforms. The advantages are:
- Tokenization has low energy requirements and no fees.
- Minting is fast and easy and can even be done on Firefly!
- Native tokens and NFTs are first class citizens of the core protocol
-- They benefit from the security of Layer 1.
-- It is simple to fetch all tokens belonging to an account (with Ethereum your ERC balance is stored in the contract state making it difficult to quickly get your balance).
-- Adding native tokens should be extremely easy for exchanges (easier than adding ERC20 tokens for Ethereum).
- Storage deposits are needed for tokenization, which gives significant utility to the IOTA / Shimmer token. The barrier for minting still remains low as you only need a small amount for the initial mint (with additional storage deposits needed for each subsequent wallet holding that token).
- Storage deposits allow for permanent storage of data on the Tangle. If permanence of data is deemed sufficiently important for a given use case it is possible to store data indefinitely with a storage deposit that scales linearly with the amount of data being stored. If you are no longer using the storage, you get the deposit back.
- The storage deposits allow on-chain storage of NFT metadata, so that you are not reliant on an IPFS cluster or a web2 solution being maintained. This is relatively unique for NFTs in the DLT space - you would not store a whole movie, but there is a lot of opportunity for novel use cases, especially about storing important metadata. Alternatively this could be useful for some rare high value NFTs (eg “Ferrari” NFTs) for which one may happily pay for the maximum 32kb storage limit. This would also lock up a larger amount of IOTA tokens, which may be seen as a good thing.
- Unlock conditions - multiple use cases such as time locks. But an important use case is that no one can spam your address with tokens you don’t want. Eg taint your address with Tornado cash tokens (although in our case it would only taint the utxo it is on rather than the whole address).
-- Requirements for transaction claiming also apply to NFTs and ensure no one can spam you with unwanted NSFW content (as per https://decrypt.co/79406/budweiser-dick-pic-nft-ethereum-wallet)  
-- Transaction expiry times can reduce the risk of sending transactions to the wrong address, especially useful for larger amounts. If the funds are not claimed in a certain time frame, the sender can reclaim them. 
*Note: wallets typically block transactions to invalid addresses, but there is still a risk of sending to a valid address owned by the wrong person or that nobody currently owns.*

Disadvantages:
- No programmability as there are no Layer 1 smart contracts currently.
- Different to the standard ERC standards, especially as tokens like algorithmic stablecoins and vesting schemes need smart contracts. but we can have equivalent versions.

## ISC
ISC can be deployed as multiple Layer 2 (L2) chains. This is different to many other projects which offer smart contracts at Layer 1 (aka L1, on the IOTA ledger). The positives of this approach are:
- L1 is not congested with smart contracts.
- L1 is not limited by the speed of the smart contract VM (which can reduce the tps significantly)
- No MEV. No front-running or sandwich attacks, resulting in a “fairer” DeFi environment. There is a set fee and randomization of transactions that are included in blocks, making MEV impossible.
- Native randomness beacon (random number generator, or RNG). This is freely available to all dApps, removing the need for expensive trusted third party RNGs.
- L1 smart contracts are difficult on a DAG as the order of events is not as obvious as on a normal blockchain (where there is no parallel execution).
- We have designed a system where L2 chains can interact using the IOTA L1. Assets can be transferred cross-chain via Layer 1 without collateralised bridges. This is a major advantage of ISC compared to other L2 solutions, and is comparable to the IBC system on Cosmos. 
- ISC is horizontally scalable. When one SC chain becomes saturated you can easily spin up a second chain to handle the additional throughput.
- Every L2 chain can behave as a sovereign ecosystem and can be fully customised, which is very appealing to many projects. Recent examples include DyDx and Dogechain, both of whom are building sovereign chains on Cosmos. 
- L2 chains can be both public or private while still being able to interact with L1 and each other. This is bringing the best of both open chains and corporate private chains together.

The negatives of this approach are:
- Each L2 is relatively independent of IOTA and has flexibility in how they behave. They may leverage the IOTA L1 as little or as much as they want. The L2 chains will use IOTA tokens for:
-- A storage deposit to update data on the main chain. In the future also for mana to guarantee enough bandwidth for writing to the ledger.
-- A storage deposit (and in the future mana) to wrap tokens for transfer between chains.
-- By default the base token (IOTA or SMR depending on the chain) is used for paying for gas on L2 chains. However the chain owner can change this. Any chains spawned by the IOTA Foundation will use IOTA/SMR for gas.
- The security of each L2 chain is dependent on its own validator nodes (Wasp nodes), which are independent of the IOTA mainnet nodes. This means IOTA cannot guarantee their safety unless we find a way to leverage L1 nodes for shared security in the future.
-- There is no current solution for this however, and would require further work.
- As with any interoperability solution, If the majority of economic activity moves to L2, then the value of L1 may be compromised. 

In the following sections, we will go through the new concepts in detail.
