# IOTA Chrysalis Guides

- [Developer](./dev_guide.md)
- [Exchange](./exchange_guide.md)
- [Hub Migration](./hub_guide.md)


## IOTA 1.5 (Chrysalis) in a nutshell
* IOTA network uses a DAG (Directed Acyclic Graph) to store its transactions. Each transaction can reference up to 8 parent transactions.
* There is a breaking change moving from IOTA 1.0 to IOTA 1.5 (Chrysalis). IOTA address was originally based on WOTS signature scheme (81 trytes) and it has been replaced by a Ed25519 signature scheme.
* In contrast to IOTA 1.0, IOTA 1.5 addresses are perfectly reusable;  even if one spends funds from the given address it can be used again
* There are new [client libraries](../libraries/overview.md) developed that serve as `one-source-code-of-truth` to IOTA users and providing binding to other programming languages 

### IOTA 1.5 address anatomy
The IOTA address is based on the Ed25519 signature scheme and it is usually represented by Bech32 (checksummed base32) format string of 64 characters:

<table>
    <thead>
        <tr>
            <th colspan=4><center>iota1qpw6k49dedaxrt854rau02talgfshgt0jlm5w8x9nk5ts6f5x5m759nh2ml</center></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan=4><center>three distinguished parts</center></td>
        </tr>
        <tr>
            <td><center><strong>human-readable id</strong></center></td>
            <td><center><strong>separator</strong></center></td>
            <td><center><strong>data</strong></center></td>
            <td><center><strong>checksum</strong></center></td>
        </tr>
        <tr>
            <td><center>iota | atoi</center></td>
            <td><center>1</center></td>
            <td><center>48 bytes [0..9a..z]</center></td>
            <td><center>6 characters [0..9a..z]</center></td>
        </tr>
        <tr>
            <td><center>iota</center></td>
            <td><center>1</center></td>
            <td><center>qpw6k49dedaxrt854rau02talgfshgt0jlm5w8x9nk5ts6f5x5m75</center></td>
            <td><center>9nh2ml</center></td>
        </tr>
        <tr>
            <td colspan=4>iota = mainnet; atoi = testnet</td>
        </tr>
    </tbody>
</table>

For further details see the [RFC - Bech32 Address Format](https://github.com/Wollac/protocol-rfcs/blob/bech32-address-format/text/0020-bech32-address-format/0020-bech32-address-format.md).

