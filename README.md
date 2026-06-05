# 🏠 Aetherion CAD — Blockchain-Based Fractional Real Estate Platform

> Built for the **Aetherion Hackathon** — my first hackathon.  
> A full-stack decentralized application for fractional property ownership, NFT-based land records, and a peer-to-peer resale marketplace.

📁 **Repo:** [github.com/23e46pratham-lab/Aetherion-Hackathon-CAD](https://github.com/23e46pratham-lab/Aetherion-Hackathon-CAD)

---

## 📌 Overview

Traditional real estate is illiquid, inaccessible, and paper-heavy. This project explores what happens when you put property ownership on-chain.

**Aetherion CAD** lets users buy fractional shares of properties as blockchain tokens, trade them on a resale marketplace, and have all property records stored immutably via NFTs and IPFS — with Firebase-based authentication and an admin console for property management.

---

## ✨ Features

- 🏗️ **Fractional Property Ownership** — Properties are tokenized; users buy shares, not whole units
- 🖼️ **NFT Land Records** — Each property is minted as an NFT on-chain via `RealEstateNFT.sol`
- 🔀 **Resale Marketplace** — Peer-to-peer trading of property shares
- 🗂️ **IPFS Storage** — Property documents and images stored via Pinata/IPFS
- 🔐 **Firebase Auth** — Email/wallet-based login and registration
- 🛡️ **Admin Console** — Create and manage property listings with role-based access
- 👛 **Wallet Integration** — Connect MetaMask via WalletContext

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| 💻 Frontend | React (JSX), Vite, Tailwind CSS |
| 🔧 Backend | Node.js, Express |
| ⛓️ Blockchain | Solidity, Hardhat, Ethers.js |
| 🗄️ Auth & DB | Firebase |
| 📦 Storage | IPFS via Pinata |
| 👛 Wallet | MetaMask / WalletConnect |

---

## 📄 Smart Contracts

| Contract | Description |
|---|---|
| `RealEstateNFT.sol` | Mints each property as a unique NFT |
| `PropertyShareToken.sol` | ERC-20-style token representing fractional ownership shares |
| `FractionalPropertyFactory.sol` | Factory contract that deploys share tokens per property |

---

## 📁 Project Structure

```
Aetherion-Hackathon-CAD/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ResaleMarketplace.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── SellProperty.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Admin/
│   │   │       ├── AdminConsole.jsx
│   │   │       └── CreateProperty.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── WalletContext.jsx
│   │   └── services/
│   │       ├── api.js
│   │       ├── contract.js
│   │       └── firebase.js
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       │   ├── blockchain.js
│       │   ├── ipfsService.js
│       │   ├── emailService.js
│       │   └── resaleUtils.js
│       └── server.js
│
└── blockchain/
    ├── contracts/
    │   ├── RealEstateNFT.sol
    │   ├── PropertyShareToken.sol
    │   └── FractionalPropertyFactory.sol
    ├── scripts/deploy.js
    └── hardhat.config.js
```

---

## 🚀 Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/23e46pratham-lab/Aetherion-Hackathon-CAD.git
cd Aetherion-Hackathon-CAD
```

### 2. Deploy smart contracts

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Start the backend

```bash
cd backend
npm install
npm start
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Environment Variables

**Backend `.env`**
```
FIREBASE_SERVICE_ACCOUNT=...
PINATA_API_KEY=...
PINATA_SECRET=...
BLOCKCHAIN_RPC_URL=...
MAILER_USER=...
MAILER_PASS=...
```

**Frontend `.env`**
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_CONFIG=...
VITE_CONTRACT_ADDRESS=...
```

---

## 🎓 Context

This was my **first hackathon** — built under the **Aetherion Hackathon** as part of the CAD (Collaborative Application Development) track. The project introduced me to Web3 development, smart contract deployment, and building a full-stack dApp under time pressure.
