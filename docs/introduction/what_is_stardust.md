---
keywords:
- Coordicide
- Upgrades
- Mainnet
- Protocol Improvements
- explanation
description: Specific Stardust Upgrades from IOTA 1.5 Chrysalis.
image: /img/logo/Chrysalis_logo_dark.png
---

# What is Stardust?

Stardust is a comprehensive utility upgrade of the IOTA Chrysalis protocol. The main goals of Stardust upgrade are to:
 - make IOTA an **infrastructure and settlement layer** for [second-layer smart contract chains](../../smart-contracts/welcome),
 - transform IOTA into a **multi-asset ledger** with custom, user defined tokens.

The previous IOTA protocol, Chrysalis, is optimized for a single application: sending digital money from A to B.
Stardust makes it possible to program that digital money with any business logic via smart contract chains, furthermore,
you can also print your own unique digital money!

The Chrysalis ledger was redesigned and extended to cater to these goals. In the following, we will go through the new
concepts in detail.

## Rethinking the UTXO Model

Since the Chrysalis upgrade IOTA has been using the [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output)
model for ledger accounting. The essential part of this model are outputs that hold user funds. Whenever a user wishes
to transfer tokens, they create a transaction in which unspent transaction outputs are consumed and new ones are created.

Each output defines who is allowed to unlock them via an address. The protocol only allows consumption of outputs in
transactions if the owner can present a valid digital signature corresponding to the owner address recorded in the output
itself.

![The UTXO Model](/img/introduction/what_is_stardust/utxo.png)

In Chrysalis an output consists of a `{tokens, address}` pair, therefore all you can do with outputs is define their
owner and who is allowed to unlock them. There is no restrictions whatsoever on what one might do with the funds in
a transaction once the output is unlocked. This is what we call the cryptocurrency application, or in simple words,
digital cash.

Stardust introduces new output types that are more expressive:
 - output types define additional fields for outputs,
 - output unlocking is configurable via unlock conditions, moreover, output types might define additional unlocking constraints based on the context of transaction that tries to unlock them.

At first glance, this might look as just a small improvement, but notice that if we can
 - record any state as data in outputs, and
 - program how that state can be manipulated in transactions,
 
we essentially implemented a computer program ran by the protocol itself. The program state is stored in outputs, while
commands to the program are issued via transactions. Could we implement then any program on the UTXO ledger via outputs?

The answer is no. First, we have limited space to store program data in outputs, therefore not any state can be stored.
Second, we have to be overly restrictive about what commands are supported, as their execution takes time and must be
performed on all network nodes. Also, such programs don't have access to the state of other programs present in the
ledger, only to what is in the context of their transaction. This is a deliberate design choice in IOTA which
allows parallel execution and validation of transactions and such programs, unlike the serialized approach in other
protocols such as Ethereum.

As a consequence, Stardust implements a limited set of programs and commands via outputs. The main goal of these
built-in ledger programs is to support second-layer IOTA Smart Contracts, the general, Turing-complete decentralized
application platform on which any smart contract logic can be implemented.

To learn more about the ledger programs and outputs, check out [Anatomy of Stardust Ledger](../protocol/stardust_ledger.md).

## Smart Contract Chain Support

A new ledger account is introduced for smart contract chains, called the Alias Account. Such accounts receive a global and
unique address upon creation, which stays the same for their lifetime. The unique address is owned by the two controllers
of the Alias account that have different privileges.

Smart contract chain validators are assigned to the role of _state controller_ of the alias account through a
threshold signature address. T out of N validator signatures are required to move assets on the base protocol that belong
to the alias account.

Smart contract chain owners are assigned to the role of _governor_ of the alias account. They may replace validators
and are the ones who can eventually destroy the account all together. If the governor and state controller entities are
the same, we talk about a self-governing smart contract chain.

While smart contract chain owners might change or validators might be rotated over time, the address of the chain stays
the same.

## Tokenization

### Native Tokens

Stardust introduces custom, user-defined tokens. Fungible tokens, called **native tokens**, are minted and melted in token
foundries. One does not need to convert base currency into native tokens, they are injected into the ledger out of thin
air. Anyone is free to issue their own tokens, but keep in mind that holding native tokens in one's wallet increases the
required storage deposit in the base currency. We will elaborate on storage deposits [further below](#storage-deposit-system).

### Non-fungible Tokens (NFTs)

Non-fungible tokens, so-called **NFTs**, are different from native tokens because each token must be unique and must have
some immutable data attached to them. As a consequence, NFTs are supported on base protocol level via NFT outputs.

Minting and NFT doesn't require expensive gas fees, all that needs to be in place is the right amount of storage deposit
tokens that are 100% refunded after the NFT is destroyed. The issuer's identity may also be immutable attached to the NFT
next to arbitrary data, making it possible to detect counterfeits. [TIP-27](https://github.com/iotaledger/tips/pull/65)
explains the recommended way of structuring NFT metadata for future verification and dApp interoperability.

## Storage Deposit System

Nodes in any DLT network must have a copy of the most recent ledger to be able to create or verify new transactions. The
more user accounts there are, the more disk space is required on nodes to store the ledger state. Since transactions
are feeless, a malicious user might bloat the ledger size by creating a lot of accounts with just a tiny amount of funds
(dust) on them.

Chrysalis already implemented a mechanism that prevents this attack, but not without caveats:
 - it relies on total ordering of transactions, hence renders it useless for IOTA 2.0,
 - and it doesn't take into account that users can store arbitrary data in accounts too. 

Stardust improves the previous solution and introduces the new **storage deposit** system. One rents storage space in
the ledger by holding the base currency of the protocol. Any ledger entry (a transaction output) must have a minimum
amount of base currency tokens to cover for the storage on nodes. The amount depends solely on the size of the
ledger entry.

The storage deposit is not a fee, because it is fully refunded as soon as the ledger entry is cleaned up. Read more
about the new storage deposit system in [TIP-19](https://github.com/iotaledger/tips/pull/39).

## Data Storage in Outputs

Smart contract support of the base layer implies that transactions and outputs may carry not only funds, but also data
to be interpreted by higher layer applications. Luckily the new storage deposit system makes this possible and regulates
how much data can be stored in outputs.

Why is it so important to store data in the ledger? Any application specific data for higher layer protocols can be
shared via the ledger. The data is available on all network nodes as long as the outputs storing them are unspent.

Arbitrary data storage becomes a general feature of outputs. Some examples of where is it useful:
 - smart contract chains store L2 state commitments in their alias accounts,
 - smart contract users put L2 smart contract call data in transfers sent to the chain's account,
 - NFTs have immutable attached metadata stored on-chain,
 - native token issuers may store token metadata on-chain in foundries,
 - digital identity solutions may store identity related data on-chain that is always available.

## Output Unlock Conditions

As discussed above, the redesigned UTXO model allows for implementing additional logic on transfers. Outputs, that are
technically the results of a transfer, may define special unlocking logic. When these outputs are consumed in subsequent
transfers they have to satisfy all unlock conditions that are defined on them.

### Address

Outputs are locked under addresses that are allowed to unlock them via a signatures. Chrysalis supports only this kind
of output unlocking.

### Storage Deposit Return

Due to the storage deposit rules, it is not possible to create an output with less than the minimum required storage
deposit funds. So how does one send such small amounts?

The new storage deposit return unlock condition allows to specify a return amount that has to be refunded to the
sender's account. Therefore, if one wants to send 1 token to someone but the minimum deposit is 10, they can send 11 tokens
to the recipient and await 10 back. There is no cheating, the recipient has to send 10 tokens back if they wish to own
that 1 token.

### Expiration

In the previous example, what if the recipient never consumes the output? The sender's tokens are locked forever, even
though they are not in the possession of the recipient. A cautious sender would also define an Expiration Unlock Condition
on the output. As the name suggests, such outputs expire after a deadline has been met, meaning that the sender regains
full control of the tokens in the output.

Expiration is also an important feature for smart contracts, as one might decide to cancel an on-ledger smart contract
request if it is not processed within a deadline.

### Timelock

Outputs may be timelocked, meaning no one can unlock them before a specific deadline is passed. With such a feature it
becomes possible to time smart contract requests in the future. An NFT auction organizer for example could prepare an
on-ledger smart contract request that closes the auction at a given date and time, transferring the to-be-sold NFT to
the highest bidder at that moment.

## Output Features

The output features that don't affect the actual unlocking and hence ownership, are called _Output Feature Blocks_. 

### Metadata

The _Metadata Block_ makes it possible to store any data in outputs. Smart contract requests make use of it to encode
the actual request call data that is only interpreted on L2.

Of course, there is a limit on how much data one can store in an output, as outputs are part of transactions that have
a limited size. Anyway, bigger data can always be sliced up into chunks to be stored in outputs.

### Sender

The _Sender Block_ allows to define a sender address directly inside an output. The protocol validates whether the
address was actually signed in the transaction that created the output or not. Smart contract chains identify the
sender account of an on-ledger request based on the information present in the _Sender Block_ of the output.

The combination of the _Sender Block_ with the _Metadata Block_ makes it possible to implement data oracles in the
ledger with verified sources.

### Issuer
The _Issuer Block_ follows the same address verification logic as the _Sender Block_, but it is only available for
NFTs. Upon NFT minting, one might attach the issuer identity to the token if ownership of the issuer address is
proved by unlocking it in the same transaction. Artists that disclose their issuer identities off-chain protect
buyers and traders from fakes.

### Tag
A _Tag Block_ is a small piece of data intended to be used as an indexation tag for the output by custom applications
built around the network. It becomes possible to map data (Metadata Block) stored in the ledger by a specific party
(Sender Block) for a specific purpose (Tag Block).

To read more about outputs, the Stardust ledger and tokenization concepts check out [TIP-18](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md).

## Transaction Replay Protection

Stardust introduces a _Network Identifier_ field in the signed part of transactions to prevent replaying transactions
in any other network. Even if a transaction is otherwise correct, a different network than the intended would
immediately reject it based on the mismatching network identifier.

For more information, browse [TIP-20](https://github.com/iotaledger/tips/pull/40) that describes the updated transaction payload.

## Transaction Inputs Commitment

In a UTXO-based ledger, transactions reference the inputs they wish to consume by their unique identifiers. Clients
gather the content of inputs by accessing the inputs' identifiers in the nodes. If you don’t run your own node, your
wallet probably talks to an explorer or indexer application that in turn fetches data from a network node. Do you fully
trust a third party to give you the correct content of the inputs owned by you to construct a transaction? What if
their infrastructure is hacked?

Luckily, with Stardust, you don’t need to trust third parties. Transactions include an _Inputs Commitment_ field that
(as the name suggests) is a cryptographic commitment to the content of the inputs of the transaction. If for any reason
your wallet was supplied with malicious data and constructed a transaction based on that data, the network will realize
that there is a mismatch between what the network thinks your inputs are and what your wallet does.

This mechanism protects not only users but also smart contract chains. An attacker might be able to eclipse the
connection of L2 validators to L1 nodes and start
[replacing request content to steal user funds](https://github.com/iotaledger/tips/discussions/51), but with this
security mechanism, such malicious transactions would be rejected by the base protocol, causing the chain to realize it
was eclipsed because it didn’t produce a valid state update.

## Removing Data Processing

IOTA is unique in that it provides data-only transactions in the Tangle. However, use-cases that build on this feature
face two major problems:
 - The Tangle is permissionless, therefore anyone can send data messages with any content and the messages are not
   authenticated with signatures like value transactions. The source of the data published through the Tangle is not
   identifiable by the core protocol.
 - Data use-case applications often rely on structured, filtered and processed application-specific data. Such
   functionality puts unnecessary load on network nodes running the core protocol.

Stardust removes any data processing from the core protocol, as supporting use-case specific processing requirements
in the core protocol is unfeasible – and anyway, it would jeopardize node performance and hence transaction throughput
in the network.

Data in Stardust is published via [Tagged Data Payloads](https://github.com/iotaledger/tips/pull/54), which are treated
as binary data by the protocol. It is recommended that processing and exposure of application-specific data published
through these payloads is implemented by second layer protocols. One major benefit of this approach is its flexibility:
each application can define and implement their own requirements, for example to authenticate data payloads based on
digital signatures, indexing by custom fields or validating payloads against expected data structures.

The re-engineered node software provides a Remote Procedure Call (gRPC) interface, called IOTA Node Extension ([INX](https://github.com/iotaledger/inx/blob/develop/proto/inx.proto)) to external applications to interact with nodes for example to
listen to all network activity. Data use-cases are encouraged to build their custom data processing applications and
connect them to the Tangle via INX.

To stay consistent with this new architecture, Stardust also removes the [ledger indexing](https://github.com/iotaledger/tips/discussions/53)
from the core protocol and implements a [ledger indexer application](https://github.com/gohornet/inx-indexer) via an INX module.

## Dynamic Proof of Work

Proof of Work (PoW) is currently employed in IOTA  for congestion control. Every message must include a small amount of
computational work if it is to be considered valid. Note that, while in blockchain networks miners compete to solve the
cryptographic puzzle of PoW first and hence wasting a huge amount of energy in the process, IOTA users who submit
messages to the network take part in a cooperative effort.

Chrysalis has a fixed PoW difficulty factor for a unit of data submitted to the network. Therefore, the actual
complexity of the challenge for a message is dependent on its length only.

Stardust protocol design incorporates a dynamic PoW difficulty factor based on the congestion of the network. The added
utility of the protocol upgrade could result in higher network activity. If this load reaches a certain threshold near
the limit of the network throughput capabilities, the protocol self-adjusts the PoW difficulty factor.
When the load is reduced, the process reverses to lower the difficulty until the threshold is reached again.

This mechanism will be supported by the network after the first ever fluid protocol upgrade, meaning the feature will
be activated in the already running, live network without any downtime. The node software is being refactored to
handle many more of such future protocol upgrades.
