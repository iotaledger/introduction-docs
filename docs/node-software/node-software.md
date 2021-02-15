# Node Software

IRI has been the backbone of the IOTA network for a number of years. While the project has delivered significant improvements to the IOTA network throughout its time, the project has always suffered from significant technical debt. This made any changes to the protocol complex, costly, and difficult to debug.

While the situation has improved significantly, the time has come to move on to newer, more flexible solutions.IRI v1.8.6, currently available as RC, will be the last major release of IRI. If you are using IRI, we encourage you to migrate your infrastructure to Hornet or Bee. We will be releasing a tool to migrate DBs from IRI in case you want to retain your data.  

Moving forward, the Hornet and Bee nodes has replaced IRI as IOTA’s core node software. Hornet is an EDF-supported community node written in Go and has already proven itself to be a stable and performant implementation. Hornet has recently been successfully audited. Bee is an IOTA Node implemented by the Foundation and written in Rust.  

## Node Software
- [hornet (branch: develop)](https://github.com/gohornet/hornet/tree/develop)
- [bee (branch: chrysalis-pt-2)](https://github.com/iotaledger/bee/tree/chrysalis-pt-2)

## Node API Specification
- [rest-api specification](https://github.comeditor.swagger.io/?url=https://raw.githubusercontent.com/rufsam/protocol-rfcs/master/text/0026-rest-api/rest-api.yaml)
