/* eslint-disable react/prop-types */
import { HDNodeWallet, Wallet } from "ethers";
import { mnemonicToSeed } from "bip39";
import { useEffect, useState } from "react";
import axios from "axios";

const EthereumWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [ethBalance, setEthBalance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setAddresses([]);
    setEthBalance([]);
  }, [mnemonic]);

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mb-2 flex justify-center items-center"
        onClick={async function () {
          setLoading(true);
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const HDNode = HDNodeWallet.fromSeed(seed);
          const child = HDNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
          const ethBalanceRequest = await axios.post(
            "https://eth-mainnet.g.alchemy.com/v2/fO9GbhS57nh4-1dQx0kQR6nPVmT5aLLQ",
            {
              jsonrpc: "2.0",
              id: 1,
              method: "eth_getBalance",
              params: [wallet.address, "latest"],
            }
          );
          const hexBalance = ethBalanceRequest.data.result;
          const weiBalance = BigInt(hexBalance);
          const etherBalance = Number(weiBalance) / 1e18;
          const formattedBalance = etherBalance.toFixed(18);
          setEthBalance([...ethBalance, formattedBalance]);
          setLoading(false);
        }}
      >
        Add Etherium wallet
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 14 14"
          className="ml-2"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.17.073a.5.5 0 0 1 .403.203L12.04 6.34L7.17 7.956L2.3 6.34L6.769.276A.5.5 0 0 1 7.17.073M2.289 7.652l4.48 6.082a.5.5 0 0 0 .805 0l4.48-6.082l-4.685 1.556a.625.625 0 0 1-.394 0L2.288 7.652Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="p-4 overflow-y-auto h-36 scrollbar-none w-full flex justify-center items-center">
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
          addresses.length > 0 && (
            <div>
              <div className="text-white grid grid-cols-3 mb-4 border-b-2 border-slate-500">
                <div className="text-center">Sr. No </div>
                <div className="text-center">Wallet Address</div>
                <div className="text-center">Balance</div>
              </div>
              {addresses.map((p, i) => (
                <>
                  <div key={i} className="text-white grid grid-cols-3 gap-2">
                    <div className="text-center">{i + 1} </div>
                    <div className="text-center">{p}</div>
                    <div className="text-center">{ethBalance[i]} ETH</div>
                  </div>
                </>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EthereumWallet;
