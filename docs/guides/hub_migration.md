---
description: How to switch from IOTA hub using wallet.rs, or its bindings.
image: /img/logo/Chrysalis_logo_dark.png
keywords:
- wallet.rs
- IOTA Hub
- iota.rs
- migration
---
# IOTA Hub Migration Guide

:::info

This guide outlines how to switch from IOTA Hub to using [Wallet.rs](https://wiki.iota.org/wallet.rs/welcome) or its [bindings](https://wiki.iota.org/wallet.rs/libraries/overview) instead.

:::

:::warning
Before you start a migration from IOTA Hub get in contact with us so we can assist you in this process. 
 
**Contact details:**

Dave de Fijter

**Email**: [dave.defijter@iota.org](mailto:dave.defijter@iota.org)

[**Discord**](https://discord.iota.org/): Dave [IF]#3333
:::

Because of the unique features of IOTA 1.0, it was difficult to manage IOTA transactions with just a library. With the Chrysalis update, we have updated to be more accommodating to industry-wide standards and developers. 

IOTA Hub was deprecated with the Chrysalis upgrade and will not work with the new protocol changes. If you somehow still use Hub, we recommend that you to switch our new wallet library [Iota.rs](https://wiki.iota.org/iota.rs/welcome), or its [bindings](https://wiki.iota.org/iota.rs/libraries/overview), where you can easily manage IOTA addresses, deposits, and withdrawals for user accounts.

To upgrade from Hub to a Chrysalis implementation you will need to:

 - **Integrate the Chrysalis network using [Wallet.rs](https://wiki.iota.org/wallet.rs/welcome)** as mentioned in the [Exchange section](exchange.md).
 - **Pause withdrawals/deposits** by setting your Hub's `attachementInterval` to 0.
 - **Make sure all balances have been swept and all deposits have been processed**.  You can create a command file called `check_changes.py` with the following content to do so.

```python
    from django.core.management.base import BaseCommand, CommandError
    from django.utils import timezone
    from exchange.iota import IOTA
    from exchange.models import Coin, WithdrawalsRequest
    from user.models import User

    class Command(BaseCommand):

        help = "Check if there's anything in Hub that needs to be processed"

        def handle(self, *args, **options):

            api = IOTA()
            coin = Coin.objects.by_symbol('MIOTA')
            since = coin.last_hub_check

            print(since)

            data = api.get_active_balances(since)

            if data:
                print(data)
                for user_id, balance in data.items():
                    user = User.objects.get(id=user_id.split('-')[1])
                    user.alter_balance('MIOTA', int(balance), modification_type='DEPOSIT')
                    print("Gave %d iota to user %s after deposit" % (int(balance), user_id))
            coin.last_hub_check = timezone.now()
            coin.save()
```

 - **Transfer all IOTA to a generated migration address**by following our [token migration guide](token_migration.md).
 - **Once migrated, transfer the IOTA tokens to your host wallet account on your wallet.rs implementation** by following the [send and receive transactions section](https://wiki.iota.org/learn/wallets/firefly-wallet#send-and-receive-transactions) of the firefly documentation.
