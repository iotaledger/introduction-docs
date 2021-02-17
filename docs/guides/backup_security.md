# Backup and Security

- Security Checklist
- How to Backup your account?
- How to Restore from a Backup?
- How to Export a User's Stronghold?
- How to Rekey a Stronghold / Password Rotation?
- Do's and Don'ts

## Security Checklist
- [ ] I used Stronghold
- [ ] I use a strong password (32 character length, Shannon Entropy ~ 4.0) for encrypting the stronghold
- [ ] I rotate the stronghold password on a regular basis
- [ ] I create a daily backup of the stronghold.snapshot file
- [ ] I keep a secure history of passwords used (for recovery)
- [ ] I use a secure password management service that integrates with the server
- [ ] I use a linux based server (best memory security)
- [ ] My server is isolated behind a DMZ

## How to Backup your account?
A simple copy of the stronghold.snapshot file suffices as a backup. (e.g. a daily cronjob rsync / scp with a datetime suffix for example).

## How to Restore from a Backup?
Simply place a snapshot file in your directory that wallet.rs expects

## How to Export a User's Stronghold?
You can create a new stronghold snapshot on the fly, in order to allow a user to leave your service and retain their key.

## How to Rekey a Stronghold / Password Rotation?
The procedure for changing a stronghold password is "simple" in that you read a snapshot into a vault, and then write it out with a new encryption password. [See this code for the source.](https://github.com/iotaledger/wallet.rs/blob/d1b8893d73aae35dfcf7c5c8006e2177988d25d0/src/stronghold.rs#L436-L451)

Please note: for obvious reasons, old snapshot backups will not be "rekeyed", so you have to track your old passwords. 

## Do's and Don'ts

- Don't use SQLite
- Don't store passwords and backups on the same device
