# IOTA Hub migration guide

> This guide will explain how you can switch from IOTA Hub to using the [IOTA Wallet Library](https://wallet-lib.docs.iota.org).

> ⚠️ **Attention** ⚠️
>
> Before you start a migration from IOTA Hub get in contact with us so we can assist you in this process. 
>
> **Contact details:**
>
> Dave de Fijter
>
> Email: [dave.defijter@iota.org](mailto:dave.defijter@iota.org)
>
> Discord: Dave [IF]#3333

Because of the unique features of IOTA 1.0, it was difficult to manage IOTA transactions with just a library. With the new Chrysalis update (IOTA 1.5), the whole protocol was upgraded to be more accommodating to industry wide standards and developer friendliness. 

IOTA Hub is deprecated with the Chrysalis update and will not work with the new protocol changes. If you still use Hub, we ask you to utilize our new [IOTA Wallet Library](https://wallet-lib.docs.iota.org) where you can easily manage IOTA addresses, deposits, and withdrawals for user accounts.

To upgrade from Hub to a Chrysalis implementation you need to:

1) Generate a [migration address](https://chrysalis.docs.iota.org/guides/token_guide.html?highlight=migration%20address#migration-address) and validate if it's correct.  Your can validate this by doing a small transaction and see if it is included in the [new network](https://explorer.iota.org/). 
2) Do a `UserWithdraw` for each user account in Hub with that address as the `payoutAddress`. This could be just one account or many accounts - this depends on your implementation.


## Troubleshooting
For any address re-use the `RecoverFunds` function can be used, which allows you to transfer directly to a migration address for a spent-from address.