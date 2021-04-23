# Chrysalis Snapshot Validation/Boostrapping

In this guide you will learn how to partake in the global snapshot, respectively genesis snapshot creation for the legacy and Chrysalis Phase 2 IOTA network. The goal is to generate a global snapshot for the legacy network which acts as a cut-off point for when only migration bundles/transactions are allowed and a genesis snapshot for the new network which contains the already burned/migrated funds from the 7-day-migration window.

## Requirements
- A GitHub account and git
- A synchronized legacy Hornet node (running version < 0.x.x)
    - The `getLedgerState` API command must be permitted. Add an entry to  `httpAPI.permitRemoteAccess` in case this API command is not added yet (restart your node afterwards).
    - The API port must be accessible
- Golang version 1.16.x (https://golang.org/)

## Steps

> Make sure you've Go installed by issuing `go version` on your command line.

1. `git clone https://github.com/iotaledger/chrysalis-tools.git`
2. `cd chrysalis-tools/snapshot/verify`
3. `go build` (this should generate a `verify`/`verify.exe` binary respectively)
4. `./verify -node="https://your-node-uri" -genesis-snapshot-file-network-id="<network-id-for-chrysalis-phase-2>"` (the network Id is communicated in the validation issue in the [Hornet repository](https://github.com/gohornet/hornet))
5. The program will now fetch the current ledger state of your defined legacy Hornet node, compute its Blake2b-256 hash and generate the global snapshot for the legacy and genesis snapshot for the new network. Example output:
```
2021/04/20 11:10:56 querying legacy node for info...
2021/04/20 11:10:57 legacy node state: lsmi/lsm 3636697/3636697
2021/04/20 11:10:57 fetching ledger state at 3636697, this might take a while...go grab a coffee...
2021/04/20 11:11:01 total ledger entries: 430699
2021/04/20 11:11:02 ledger state integrity hash: 34ecf812f0547a685f6a826b518d9bad0ed1bcaab3fb8ea4c5e06106c5b5e01f
2021/04/20 11:11:02 migration: addrs 1, tokens total 1629957
2021/04/20 11:11:02 eligible for migration: addrs 317469, tokens total 2779523376246858
```
6. Generate the sha256 hashes of the generated `global_snapshot.csv` and `genesis_snapshot.bin`: `sha256sum global_snapshot.csv genesis_snapshot.bin`; Example output:
```
$ sha256sum global_snapshot.csv genesis_snapshot.bin 
f19a0976cc51b22d91018754a6cb41381fd737eb11b790a6db12a6d04a2bcddd  global_snapshot.csv
ebc6ce9d8cd6f00dd6ff42dc72335367bc7b181ef1f2f76a63d6c2b75e74ff24  genesis_snapshot.bin

```
8. Copy the entire program output and the sha256 hashes to the corresponding issue on the [Hornet repository](https://github.com/gohornet/hornet).


## Bootstrapping the legacy Hornet node from the global snapshot

> Loading the global snapshot ensures that your legacy Hornet node adds the genesis transaction (999...) as a solid entry point: this is important as the Coordinator will issue the next milestone after the global snapshot index on top of it. Your node will **not** lose the data it already has.

1. Await for confirmation that the global snapshot was taken successfully by looking into the validation issue on the [Hornet repository](https://github.com/gohornet/hornet) or Discord.
1. Stop your legacy Hornet node and download the binary or docker image of the Hornet build which only supports migration-bundles. With this "migration-bundles-only" version, your Hornet node will also no longer peer to nodes which do not run the same version.
1. Let `snapshots.global.path` point to the global snapshot file (i.e `global_snapshot.csv`).
1. Under `snapshots.global.index` define the index of the milestone at which the global snapshot was taken. (this should correspond to what `legacy node state` was from the program output, i.e. `3636697` from the example output above).
1. Change `snapshots.loadType` to `"global"` (note the quotes as the value is a string).
1. Restart your legacy Hornet **with the additional `--forceGlobalSnapshot` flag** (this will instruct your Hornet node to load the global snapshot despite the fact that it already has a database).