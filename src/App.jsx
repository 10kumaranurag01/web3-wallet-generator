import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import SolanaWallet from "./components/Solana";
import EthereumWallet from "./components/Ethereum";

function App() {
  const [mnemonic, setMnemonic] = useState([]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(mnemonic.join(" "))
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="bg-slate-900  w-full h-screen flex justify-center items-center">
      <div className="p-4 rounded-2xl h-screen flex flex-col w-screen mx-4 overflow-y-auto scrollbar-none">
        <div className="py-6">
          <h1 className="text-6xl font-bold text-white pb-4">Web3 </h1>
          <h1 className="text-6xl font-bold text-white">Wallet Generator</h1>
        </div>
        <div className="flex w-full justify-start items-center">
          <button
            onClick={() => {
              const nm = generateMnemonic();
              setMnemonic(nm.split(" "));
            }}
            className="bg-blue-500 p-2 w-56 rounded-md hover:shadow-md text-white flex justify-center items-center"
          >
            Generate Seed Phrase
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        {mnemonic.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-4">
              {mnemonic.map((m, i) => {
                return (
                  <div key={i} className="bg-slate-700 p-2 py-4 rounded-md">
                    {seedPhraseWordBox(m)}
                  </div>
                );
              })}
            </div>
            <div className="text-white text-left w-full mt-2 text-sm">
              *Save it securely
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-slate-700 text-white py-2 px-4 rounded mt-4 flex justify-center items-center"
            >
              Copy Phrase
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </button>

            <div className="flex flex-col">
              <SolanaWallet mnemonic={mnemonic.join(" ")} />
              <EthereumWallet mnemonic={mnemonic.join(" ")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const seedPhraseWordBox = (phrase) => {
  return <div className="text-center text-white">{phrase}</div>;
};
