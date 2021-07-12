---
slug: /one-click-private-tangle
---

# One Click Private Tangle Tutorial

In this tutorial, you will learn how to use a set of Docker-based tools and pre-configured setups to deploy a ([hornet-based](https://github.com/gohornet/hornet)) Chrysalis Private Tangle in **"one click"** to cloud environments or platforms.

## Background

IOTA [mainnet](../mainnet.md) and [testnet](../testnet.md) are public IOTA Networks where you can develop permissionless applications based on the Tangle. However, there can be situations where you would like to run your own local IOTA network (Private Tangle) so that only a limited set of stakeholders or nodes can participate. To automate and simplify the deployment of a Private Tangle, some tools publicly available in the [one-click-tangle](https://github.com/iotaledger/one-click-tangle) repository have been developed. Additionally, the IOTA Foundation has integrated them for use in the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/B095WQQTNG/) and, in the future, on other Cloud marketplaces.

## MVP Deployment Architecture of a Private Tangle

The figure below depicts a minimum viable deployment architecture of a Private Tangle using [Docker](https://docker.io). 

![Private Tangle Architecture](../../static/img/tutorials/one-click-private-tangle-architecture.png "Private Tangle Architecture")

There are three main nodes identified: 

* The **Coordinator**: This node emits milestones periodically and has to be bootstrapped and set up appropriately. With the IOTA 2.0 update, the Coordinator will no longer be needed as explained [here](https://coordicide.iota.org/). 

* The **Spammer**: A node that periodically sends messages to the Private Tangle, thus enabling a minimal message load to support transaction approval as per the IOTA protocol. 

* The **Regular Hornet Node**: An initial node, it is exposed to the outside through the IOTA protocol (port `14265`) to be the recipient of messages or to peer with other Nodes (through port `15600`) that can later join the same Private Tangle.  

These three nodes are peered amongst each other as our architecture is based on Docker, so that each node runs within a Docker Container and all containers are attached to the same network named `private-tangle`. 

In addition, to make the Private Tangle easier to use, a Tangle Explorer can be deployed, conveniently, similar to the one at [https://explorer.iota.org](https://explorer.iota.org). As a result, all the participants in the network are able to browse and visualize messages or IOTA Streams channels. The Tangle Explorer deployment involves two different containers, one with the REST API listening at port `4000` and one with the Web Application listening at port `8082`. The Tangle Explorer also uses MQTT to watch what is happening on the Tangle. This is the rationale for having a connection between the Explorer's REST API Container and the Hornet Node through port `1881`. 

The Hornet Dashboard (available through HTTP port `8081`) is also useful as a way to monitor and ensure that your Private Tangle Nodes are in sync and performing well.

The summary of containers that shall be running and **TCP** ports exposed is as follows: 


| Component           | Container name    | Docker Ports exposed (TCP)       |
| ------------------- | ----------------- | :------------------------------- |
| Hornet Initial Node | `node1`           | `14265`, `15600`, `8081`, `1881` |
| Coordinator         | `coo`             | `15600`                          |
| Spammer             | `spammer`         | `14265`, `15600`                 |
| Explorer API        | `explorer-api`    | `4000`                           |
| Explorer Web App    | `explorer-webapp` | `8082:80`                        |


The network policies for those containers should be configured as follows:


| Component           | Container name    |  Outgoing Traffic To           |
| ------------------- | ----------------- | :----------------------------- |
| Hornet Initial Node | `node1`           | `coo:15600`, `spammer:15600`   |
| Coordinator         | `coo`             | `node1:15600`, `spammer:15600` |
| Spammer             | `spammer`         | `coo:15600`, `node1:15600`     |
| Explorer API        | `explorer-api`    | `node1:14265`, `node1:1881`    |
| Explorer Web App    | `explorer-webapp` |                                |



| Container name      |  Port     | Incoming Traffic from           |
| ------------------- | --------- | :------------------------------ |
| `node1`             | `14265`   | outside clients, `explorer-api` |
| `node1`             | `15600`   | outside peers, `coo`, `spammer` |
| `node1`             | `8081`    | outside clients                 |
| `node1`             | `1881`    | `explorer-api`                  |
| `coo`               | `15600`   | `node1`, `spammer`              |
| `spammer`           | `14265`   | `spammer`                       |
| `spammer`           | `15600`   | `coo`, `node1`                  |
| `explorer-api`      | `4000`    | outside clients                 |
| `explorer-webapp`   | `8082:80` | outside clients                 |


The summary of services exposed to the outside is as follows: 


| Service          | Container name    | Host TCP Port |
| ---------------- | ----------------- | ------------- |
| IOTA Protocol    | `node1`           | `14265`       |
| IOTA Peering     | `node1`           | `15600`       |
| Hornet Dashboard | `node1`           | `8081`        |
| MQTT             | `node1`           | `1881`        |
| Explorer API     | `explorer-api`    | `4000`        |
| Explorer Web App | `explorer-webapp` | `8082`        |


The deployment architecture described above can be easily transitioned to production-ready by incorporating a reverse proxy leveraging [NGINX](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/#). As a result, the amount of ports exposed to the outside world can be reduced or load balancing between the nodes of your Private Tangle can be achieved. IOTA Foundation intends to provide automatic, "one click" deployment of this kind of enhanced architectures in a future version of this software. 

To support the deployment of a Private Tangle, the IOTA Community has developed a set of shell scripts and configuration templates to make it easier to deploy a (Docker based) Private Tangle with the architecture described above. You can also customize the [default configuration files](https://github.com/iotaledger/one-click-tangle/blob/chrysalis/hornet-private-net/config) if, for instance, you want to enable extra [Hornet plugins](https://hornet.docs.iota.org/post_installation/config.html). 

But now let us see how we can launch our Private Tangle via a "single click". We have two options: through the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/B095WQQTNG/) or through any [Docker-enabled machine](#one-click-private-tangle-on-any-docker-enabled-vm). 


## "One Click" Private Tangle on AWS

To materialize on AWS using the deployment architecture described above, go to the AWS Marketplace and install this [product](https://aws.amazon.com/marketplace/pp/B095WQQTNG/) and follow the [instructions](https://github.com/iotaledger/one-click-tangle/blob/chrysalis/README_AWS.md). That's it!. 

Behind the scenes, the process will launch all the Docker containers (through docker-compose), create a key pair for the Coordinator,  configure the Coordinator public key for the initial node, generate an initial IOTA Address holding all IOTAs, the identity for our Nodes, etc i.e. our [deployment architecture](#mvp-deployment-architecture-of-a-private-tangle) and all the steps described [here](https://hornet.docs.iota.org/getting_started/private_tangle.html), but **fully automated**, with "one click"!.

The Parameters of this "one click" installation are as follows (further details can be found at [here](https://github.com/iotaledger/one-click-tangle/tree/chrysalis/hornet-private-net/config):

* One Private Key for signing milestones and just one milestone signer (the Coordinator)
* Coordinator Milestones Period: `60` seconds, check [this line of code](https://github.com/iotaledger/one-click-tangle/blob/chrysalis/hornet-private-net/config/config-coo.json#L120)
* Spammer Settings, check [these lines of code](https://github.com/iotaledger/one-click-tangle/blob/chrysalis/hornet-private-net/config/config-spammer.json#L118).

Further instructions for AWS deployments can be found [here](https://github.com/iotaledger/one-click-tangle/blob/chrysalis/README_AWS.md). If you want to know lower-level details of the AWS installation, how to do it yourself in any Docker-enabled VM, and what happens under the scenes, please continue reading. 

## "One Click" Private Tangle on any Docker-enabled VM

### Prerequisites

You need [Docker](https://www.docker.com) and Docker Compose. **Docker Compose** is a tool for defining and running multi-container Docker applications. Yaml files are used to configure the required services. This means all container services can be brought up in a single command. Docker Compose is installed by default as part of Docker for Windows and Docker for Mac, however Linux users will need to follow the instructions found [here](https://docs.docker.com/compose/install/)

You can check your current **Docker** and **Docker Compose** versions using the following commands:

```console
docker-compose -v
docker version
```

Please ensure that you are using Docker version `18.03` or higher and Docker Compose `1.21` or higher and upgrade if
necessary.

### Clone the Script Repository

To start with, you need to clone the [one-click-tangle](https://github.com/iotaledger/one-click-tangle) repository as follows:

```console
git clone https://github.com/iotaledger/one-click-tangle
cd one-click-tangle
```

Then, ensure that the `private-tangle.sh` script has execution permissions:

```console
cd one-click-tangle/hornet-private-net
chmod +x ./private-tangle.sh
```

### Run your Private Tangle

To start our Private Tangle through the command line:

```console
./private-tangle.sh install
```

You can optionally pass the amount of time (in seconds) to wait for the Coordinator bootstrap step. This step enables the Coordinator to bootstrap by emitting its first milestone.

Behind the scenes, our process will create the identity for the Coordinator, the keys that will be used for signing milestones, an initial IOTA Address holding all IOTAs, the identity of our Nodes, etc i.e. all the steps described [here](https://hornet.docs.iota.org/getting_started/private_tangle.html), but fully automated. 

After the process finishes you should see the following docker containers up and running:

```console
docker ps -a
```

```console
8474fd9ced97   gohornet/hornet:1.0.2-rc1    "/app/hornet" 29 hours ago   Up 29 hours   8081/tcp, 14265/tcp, 15600/tcp, 14626/udp spammer                                                                            
8804bfd795ec   gohornet/hornet:1.0.2-rc1    "/app/hornet" 2 days ago     Up 2 days     0.0.0.0:8081->8081/tcp, 0.0.0.0:14265->14265/tcp, 1883/tcp, 0.0.0.0:15600->15600/tcp, 14626/udp   node1
96b2047a6ebe   gohornet/hornet:1.0.2-rc1    "/app/hornet" 2 days ago     Up 2 days     8081/tcp, 14265/tcp, 15600/tcp, 14626/udp coo
```

Alternatively, the following files should have been created for you:

The P2P identities that can be used to peer these Nodes with other Nodes:

* `coo.identity.txt`. The P2P identity of the Coordinator. 
* `node1.identity.txt`. The P2P identity of the node1. 
* `spammer.identity.txt`. The P2P identity of the Spammer. 

The address that holds all the IOTAs and its corresponding keys:

* `key-pair.txt`. The Ed25519 Key pair corresponding to the address that holds all the IOTAs. 
* `address.txt`. The address that holds all IOTAs initially. 

The Coordinator's cryptographic materials:

* `coo-milestones-key-pair.txt`. The Ed25519 key pair used by the Coordinator to sign milestones. Keep it safe!
* `coo-milestones-public-key.txt`. The Ed25519 public key that can be used to verify Coordinator's milestones. 

The initial Private Tangle snapshot:

* `snapshots/private-tangle/full_snapshot.bin`. It contains just one IOTA address that is holding all IOTAs. 

If you browse to `http://localhost:8081` you can test out the Hornet Dashboard.

You can find the Tangle database files at `db/private-tangle`. 

### Operate your Private Tangle

You operate your Private Tangle by issuing one of the following commands:

```console
./private-tangle.sh [start|stop|update]
```

### Tangle Explorer

Once we have our Private Tangle up and running, we can install and run a Tangle Explorer as follows:  

```console
cd ../explorer
./tangle-explorer.sh install ../hornet-private-net
```

The Tangle Explorer will automatically be configured with the parameters of our Private Tangle and once the docker build process finishes, you should find the following additional docker containers up and running:

```console
dd4bcad67c5e        iotaledger/explorer-webapp   "docker-entrypoint.s…"   2 days ago          Up 2 days           0.0.0.0:8082->80/tcp                                                                   explorer-webapp
7c22023f4316        iotaledger/explorer-api      "docker-entrypoint.s…"   2 days ago          Up 2 days           0.0.0.0:4000->4000/tcp                                                                 explorer-api
```

You can now get access to the Tangle Explorer through `http://localhost:8082`. 

## Limitations and Troubleshooting

Mac OS users should install GNU sed, for instance, using `brew install --default-names gnu-sed`.  

## Next Steps

Try using one of the [client libraries](../libraries/client.md) to send transactions to the nodes in your Private Tangle. 
