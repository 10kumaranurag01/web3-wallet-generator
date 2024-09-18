
---

# Web3 Wallet Generator

This project is a **Simple Web3 Wallet** application that generates seed phrases and creates wallets for Solana and Ethereum. The application allows users to generate a mnemonic seed phrase, derive wallets for Solana and Ethereum, and view the balance of the created wallets.

## Features

- **Generate Mnemonic**: Generate a random seed phrase using the BIP39 standard.
- **Solana Wallet**: Derive Solana wallets from the seed phrase and fetch balances.
- **Ethereum Wallet**: Derive Ethereum wallets from the seed phrase and fetch balances.
- **Copy to Clipboard**: Users can copy the generated seed phrase for safekeeping.
- **Responsive UI**: Designed with TailwindCSS for a sleek and modern look.

## How to Run

### Prerequisites
- Node.js installed on your system
- NPM or Yarn as a package manager

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/web3-wallet-generator.git
   cd web3-wallet-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Project Structure

- `App.js`: The main component that handles seed phrase generation and rendering of the Solana and Ethereum wallet components.
- `components/Solana.js`: Logic for creating Solana wallets and fetching their balances.
- `components/Ethereum.js`: Logic for creating Ethereum wallets and fetching their balances.
- `App.css`: Styling for the app using TailwindCSS.

## Dependencies

- **BIP39**: For generating and handling seed phrases.
- **Solana/web3.js**: For interacting with the Solana blockchain.
- **ethers.js**: For interacting with the Ethereum blockchain.
- **Axios**: For making API requests to fetch balances.
- **TailwindCSS**: For styling the app.

## How It Works

1. **Generate Seed Phrase**: Click on "Generate Seed Phrase" to create a new mnemonic using BIP39.
2. **Solana Wallet**: Add Solana wallets derived from the mnemonic by clicking "Add Solana Wallet".
3. **Ethereum Wallet**: Add Ethereum wallets similarly using "Add Ethereum Wallet".
4. **Copy Phrase**: Copy the seed phrase to the clipboard for safekeeping.

## API Endpoints

The application uses **Alchemy** API endpoints to fetch wallet balances:
- Solana balance API: `https://solana-mainnet.g.alchemy.com`
- Ethereum balance API: `https://eth-mainnet.g.alchemy.com`

Make sure to replace the API keys with your own Alchemy keys.

## License

This project is open-source under the MIT License.

---