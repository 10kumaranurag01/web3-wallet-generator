/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import axios from "axios";

export default function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [solBalance, setSolBalance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setPublicKeys([]);
    setSolBalance([]);
  }, [mnemonic]);

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-2 px-4 m-2 ml-0 rounded mt-4 flex justify-center items-center"
        onClick={async function () {
          setLoading(true);
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
          const solBalanceReq = await axios.post(
            "https://solana-mainnet.g.alchemy.com/v2/fO9GbhS57nh4-1dQx0kQR6nPVmT5aLLQ",
            {
              jsonrpc: "2.0",
              id: 0,
              method: "getBalance",
              params: [`${keypair.publicKey}`],
            }
          );
          const sol = solBalanceReq.data.result.value / 1000000000;
          setSolBalance([...solBalance, sol]);
          setLoading(false);
        }}
      >
        Add Solana wallet
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 25"
          className="ml-1"
        >
          <path
            fill="currentColor"
            d="M16.886 9.468a.47.47 0 0 1-.313.124H5.584c-.39 0-.587-.446-.317-.707l1.805-1.74a.46.46 0 0 1 .312-.129h11.032c.394 0 .587.45.313.712zm0 8.576a.47.47 0 0 1-.313.12H5.584c-.39 0-.587-.442-.317-.703l1.805-1.745a.45.45 0 0 1 .312-.124h11.032c.394 0 .587.446.313.707zm0-6.618a.47.47 0 0 0-.313-.12H5.584c-.39 0-.587.442-.317.703l1.805 1.745a.47.47 0 0 0 .312.124h11.032c.394 0 .587-.446.313-.707z"
          />
        </svg>
      </button>
      <div className="p-4 overflow-y-auto h-36 scrollbar-none flex items-center justify-center">
        {loading ? (
          <div
            role="status"
            className="flex justify-center items-center w-full"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          publicKeys.length > 0 && (
            <div>
              <div className="text-white grid grid-cols-3 mb-4 border-b-2 border-slate-500">
                <div className="text-center">Sr. No </div>
                <div className="text-center">Public Key</div>
                <div className="text-center">Balance</div>
              </div>
              {publicKeys.map((p, i) => (
                <div key={i} className="text-white grid grid-cols-3 gap-2">
                  <div className="text-center">{i + 1} </div>
                  <div className="text-center">{p.toBase58()}</div>
                  <div className="text-center">{solBalance[i]} SOL</div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
