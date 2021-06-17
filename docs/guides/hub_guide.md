# IOTA Hub Migration Guide

> This guide outlined how to switch from IOTA Hub to using wallet.rs or its bindings instead.

Because of the unique features of IOTA 1.0, it was difficult to manage IOTA transactions with just a library. With the Chrysalis update, the whole protocol was updated to be more accommodating to industry wide standards and developer friendliness. 

IOTA Hub was deprecated with the Chrysalis upgrade and does not work with the new protocol changes. If you somehow still use Hub, we ask you to utilize our new wallet library (iota.rs or bindings) where you can easily manage IOTA addresses, deposits, and withdrawals for user accounts.

To upgrade from Hub to a Chrysalis implementation you needed to:

 - Integrate the Chrysalis network using wallet.rs as mentioned in the Exchange section.
 - Pause withdrawals/deposits.
 - Make sure all balances have been swept and all deposits have been processed.
 - Transfer all IOTA to a generated migration address (instructions to be provided).
 - Once migrated, transfer the IOTA coins to your hot wallet account on your wallet.rs implementation.