# Backup and security

Security Checklist

- How to backup your account
- How to restore from a backup
- How to export a user's Stronghold
- How to rekey a Stronghold/password rotation?
- Do's and don'ts

## Security checklist

- [ ] I use Stronghold
- [ ] I use a strong password (32 character length, Shannon Entropy ~ 4.0) for encrypting the stronghold
- [ ] I rotate the stronghold password on a regular basis
- [ ] I create a daily backup of the stronghold.snapshot file
- [ ] I keep a secure history of passwords used (for recovery)
- [ ] I use a secure password management service that integrates with the server
- [ ] I use a linux based server (best memory security)
- [ ] My server is isolated behind a DMZ

## How to backup your account

A simple copy of the stronghold.snapshot file works as a backup (e.g. a daily cronjob rsync / scp with a datetime suffix for example).

## How to restore from a backup

Simply place a snapshot file in your directory that wallet.rs expects.

## How to export a user's stronghold

You can create a new Stronghold snapshot on the fly to allow a user to leave your service and retain their key.

## How to rekey a Stronghold/password rotation

The procedure for changing a Stronghold password is "simple" in that you read a snapshot into a vault and then write it out with a new encryption password. [See this code for the source.](https://github.com/iotaledger/wallet.rs/blob/d1b8893d73aae35dfcf7c5c8006e2177988d25d0/src/stronghold.rs#L436-L451)

Please note: for obvious reasons, old snapshot backups will not be "rekeyed", so you have to track your old passwords. 

## Do's and don'ts

- Don't use SQLite
- Don't store passwords and backups on the same device