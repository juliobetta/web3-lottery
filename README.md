# Solidity example project: Lottery

Example project from [Udemy's Ethereum and Solidity: The Complete Developer's Guide
](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide)

### Setup

* [get metamask](https://metamask.io/) and follow the installation instructions
* IMPORTANT: on metamask, select Rinkeby network
* Create an account in [Infura](https://infura.io) to deploy the contract to an ETH node
  * In Infura, create an ETH project and then select Rinkeby in the Endpoints dropdown.
* create a `.env` file based on `.env.example` and set the values:
  * **PASSPHRASE**: your wallet passphrase
  * **INFURA**: the https URL provided by infura

### Test

```
yarn test
```

### Deploy

```
yarn deploy
```
