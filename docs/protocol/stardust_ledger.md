---
keywords:
- Ledger
- UTXO
- explanation
description: Stardust Ledger Anatomy.  
image: /img/logo/Chrysalis_logo_dark.png
---

# Stardust Ledger

The ledger is a distributed database that records ownership of funds in the network. Users modify the ledger by
posting transactions to the network that move these funds between user accounts.

IOTA uses the Unspent Transaction Output Model (UTXO) to model ledger entries. A transaction consumes ledger entries
(previously created transaction outputs) and creates new ones. When a UTXO is consumed, it is marked as spent and is
removed from the database, while newly created UTXOs are added. All currently unspent UTXOs comprise the most recent
ledger state.

A UTXO is allowed to be spent if its owner presents a valid digital signature corresponding to the owner of the UTXO
that is generally called the owner address. Stardust extends this concept by letting users define additional
spending constraints on UTXOs, for example that an output can only be spent after a certain time.

In the following, we will demonstrate with example some common types of transactions and in the meantime we will
explore the different kind of constraints and outputs that one might create in the ledger.

## Simple Transfer of Funds

A simple transaction moves funds from one user account to another. On a high level, transactions must define 3 things:
 - **Inputs**: previously created unpsent transaction outputs holding funds that the transaction consumes,
 - **Unlock Blocks**: they hold the signatures authorizing the consumption of inputs,
 - **Outputs**: newly created outputs holding transferred funds.

In Stardust a simple transfer may be realized with an output type called [Basic Output](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#basic-output).
Just like every other output type, Basic Outputs define the base token funds they hold in the _Amount_ field. They have
to have at least one [Unlock Condition](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#unlock-conditions)
defined: the [Address Unlock Condition](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#address-unlock-condition).

It means that in order to unlock the output in a transaction, one has to present a valid signature for the given address.
The signature signs the whole content of the transaction, thereby authorizing the consumption of inputs but also
declaring the intention to create new outputs.

Transaction A simply:
 - consumes as input a _Basic Output_ with _100i_ locked under _ownerAddress_,
 - provides an _Unlock_, namely a _Signature Unlock_ that contains a valid signature of the transaction content corresponding
   to the private key behind _ownerAddress_,
 - creates a new _Basic Output_ with _100i_ locked under the recipients address, namely _recipientAddress_.

![Transaction A](/img/protocol/tx_A.png)

## Transfer of Funds with Expiration

The first new _Unlock Condition_ we are going to look at is the [Expiration Unlock Condition](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#expiration-unlock-condition).
It lets the creator of the output define an _Expiration Deadline_. Before the deadline, the recipient can consume and
unlock the output in a transaction, but once the deadline expired, only the _Return Address_ defined in the
_Expiration Unlock Condition_ can unlock it.

Transaction B defines an output that can only be unlocked by the recipient in a transaction that is confirmed by a
milestone where both the _Milestone Index_ and the _Milestone Unix Timestamp_ are less, than the values defined in
the _Expiration Unlock Condition_. Note, that it is possible to set either _Milestone Index_ or _Unix Time_ to zero in
order to use only one way of defining the deadline, but both can not be zero.

![Transaction B](/img/protocol/tx_B.png)

Transaction C shows how the recipient can consume the output before the deadline and take the funds into full, unconditional
custody.

![Transaction C](/img/protocol/tx_C.png)

Transaction D depicts how the original sender claims an expired output. Note, that it is not necessary for the sender
to sweep the funds into their own wallet, they can just treat it as funds they have full custody of.

![Transaction D](/img/protocol/tx_D.png)

## Timelocking Funds in Transfers

With Stardust, it is possible to lock funds away based on time. When an output has a [Timelock Unlock Condition](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#timelock-unlock-condition)
defined, not even its rightful owner can unlock it before the timelock expires. Just like in the case of the Transaction C and D,
the notion of time in the ledger is determined by the index and timestamp of the milestone that confirms the transaction.

Transaction E creates an output owned by the recipient but timelocked until _Milestone Index 1500_ and _May 24 2022 18:00:00_.

![Transaction E](/img/protocol/tx_E.png)

The recipient has no way to unlock the output before the deadline. Once the timelock expired, the funds can be moved, as
depicted on Transaction F.

![Transaction F](/img/protocol/tx_F.png)

## Storage Deposit Returns in Transfers

Stardust introduces a new system to protect the ledger size and hence node storage resources, called Byte-cost based
Storage Deposit System. You can read more about it in [TIP-19](https://github.com/muXxer/protocol-rfcs/blob/master/tips/TIP-0019/tip-0019.md).
In short, every output in the ledger need to carry enough base tokens to cover for its network storage use.

Implicitly this means that an output has to have a minimum amount of base tokens, otherwise it is considered invalid.
The exact minimum depends on the size of the output and the protocol parameter _Virtual Byte Cost_. The implication of
this is that is no longer possible to store microfunds in an output. So suppose you wanted to send 1i (0.000001 MIOTA):
is it still possible?

The answer is yes. With the [Storage Deposit Return Unlock Condition](https://github.com/lzpap/tips/blob/master/tips/TIP-0018/tip-0018.md#storage-deposit-return-unlock-condition)
it is possible to define spending constraints on outputs that you create. Let's assume that the minimum amount of funds
that need to be present in an output is 100i. If you wanted to send only 1i to the recipient, you would transfer
101i to the recipient's address with the extra condition that she can only use the funds if she refunds you in the
very same transaction with 100i.

Transaction G show the creation of an output with _Storage Deposit Return Unlock Condition_. Notice, that _Basic Output #11_
holds 101i, and the unlock condition defines the _Return Amount_ of 100i to _ReturnAddress_ _ownerAddress_. All in all,
the recipient can only freely use 1i when she consumes the output in Transaction H.

![Transaction G](/img/protocol/tx_G.png)

In order for the recipient to claim the 1i, she needs to sweep it into one of her own outputs. Therefore, she consumes
_Basic Output #12_ in the transaction that holds her funds. On the output side, she has to have _Basic Output #13_ that
refunds the original sender, plus she creates _Basic Output #14_ into which she sweeps the 1i.

![Transaction H](/img/protocol/tx_H.png)

What forces the recipient to post and execute Transaction H? Nothing. She can just keep the sender's 100i in limbo forever.
That is why it is handy that you can combine unlock conditions. For example, the sender can add an expiration
condition to _Basic Output #11_. Once the output is expired, the recipient won't be able to claim the 1i and the sender
takes full custody of the 101i in the output.

## Sender Feature

Next to _Unlock Conditions_, Stardust allows to define optional _Features_ on outputs of a transfer that do not impact
the actual unlocking of the created output.  The _Sender_ feature is one of such features, which lets the creator of the output
define an explicit _Sender Address_ attribute for an output.

The _Sender_ attribute is validated on protocol level. Validation ensures that the transaction that created the output
unlocked the _Sender_ address on the input side. Therefore, this feature is a protocol validated proof that the output
was created by someone who controls the _Sender_ address.

Transaction J shows how one can add a sender attribute to a created output. Note, that Transaction J would be invalid
if:
 - _Basic Output #15_ wouldn't be locked to _senderAddress_, or
 - _Basic Output #16_ would define _Sender_ as anything else than _senderAddress_ from _Basic Output #15_.

![Transaction J](/img/protocol/tx_J.png)

On-ledger (originating from L1) requests of IOTA Smart Contracts use this feature heavily, but it is also possible to
fetch outputs created by a specific party with the _Sender Feature_ through the [INX UTXO indexer application](https://github.com/gohornet/inx-indexer)
and [REST API](https://github.com/iotaledger/tips/blob/indexer-api/tips/TIP-0026/tip-0026.md).

## Metadata Feature

Another handy tool is the _Metadata Feature_ of outputs. This feature makes it possible to store arbitrary data in outputs.
Of course, storing data in outputs increases the minimum base token requirement, but in turn it provides a data storage option
that is 24/7 available on any network node.

As soon as the output with metadata is consumed, it is pruned from nodes' databases and base tokens used as storage
deposit are freed up.

## Alias Output

The first and most important ledger program for ISC chains is the _Alias Output_. Simply put, this represents a new
type of ledger account suitable for committee ran smart contract chains. The main features are:

- storage of state commitments of the second-layer smart contract chains,
- globally unique address assigned upon creation,
- different account privileges for two controllers that can be rotated, and
- ability of issuing custom tokens that are linked to the unique address.

Alias outputs can be created by anyone in the protocol via transactions. Once an alias output is created, only its
controllers are able to unlock it in subsequent transactions.

Depending on which controller unlocks it, different commands or state mutations are possible. The _State Controller_ is
allowed to change the state data stored in the output and also to manipulate token balances of the alias account. One
restriction of the _State Controller_ is that whenever it unlocks the alias output in a transactions, it must transition
the alias into its new state, meaning the alias output must appear in the transaction as a created output.

The _Governor_ on the other hand might choose to destroy the alias by not creating its subsequent state as an output in
the transaction. It also has the power to change the controller entities.

Funds can be sent directly to the unique address of the alias by anyone. Since this address is generated by the protocol,
it doesn't have a private key that could be used for signing transactions to prove ownership. So how does one prove that
they own the funds locked under an alias address?

The trick is to require the unlocking of the alias output that defines the address in the same transaction that tries
to unlock funds sitting on the alias address. _If you can prove you own the alias account by successfully unlocking its
alias output in a transaction, you can access the funds locked under its address._

## Foundry Outputs

Foundries deal with the issuance of user defined custom tokens, so-called _Native Tokens_.

## Output Unlock Conditions

As we mentioned above, unlocking an output is performed via a digital signature. This is what we call an
_Address Unlock Condition_.

TODO
