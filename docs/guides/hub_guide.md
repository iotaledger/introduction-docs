# IOTA Hub Migration Guide

> This guide outlines how to switch from IOTA Hub to using [Wallet.rs](https://wallet-lib.docs.iota.org/) or its [bindings](https://wallet-lib.docs.iota.org/libraries/index.html) instead.

Because of the unique features of IOTA 1.0, it was difficult to manage IOTA transactions with just a library. With the Chrysalis update, we have updated to be more accommodating to industry wide standards and developers. 

IOTA Hub was deprecated with the Chrysalis upgrade and will not work with the new protocol changes. If you somehow still use Hub, we recommend that you to switch our new wallet library [Iota.rs](https://client-lib.docs.iota.org/), or its [bindings](https://client-lib.docs.iota.org/libraries/index.html), where you can easily manage IOTA addresses, deposits, and withdrawals for user accounts.

To upgrade from Hub to a Chrysalis implementation you will need to:

 - Integrate the Chrysalis network using [Wallet.rs](https://wallet-lib.docs.iota.org/) as mentioned in the [Exchange section](./exchange_guide.md).
 - Pause withdrawals/deposits.
 - Make sure all balances have been swept and all deposits have been processed.
 - Transfer all IOTA to a generated migration address (instructions to be provided).
 - Once migrated, transfer the IOTA coins to your host wallet account on your wallet.rs implementation.