import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import React from "react";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
const Blocks = () => {
  const [blockNumber, setBlockNumber] = useState();
  // const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    async function getBlocks() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNumber);
      } catch (err) {
        console.log("Cannot get recent block", err);
      }
    }
    getBlocks();
    // eslint-disable-next-line
  }, [blockNumber]);

  return (
    <div className="grid justify-center">
      {!blockNumber ? (
        <CircularProgress color="inherit" />
      ) : (
        <div className="text-center grid justify-center">
          <NavLink to={`blocks/${blockNumber}`}>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className=" block max-w-sm sm:p-6 xs:p-4 text-white hover:text-gray-900 bg-transparent border-2 border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 rounded-md cursor-pointer"
            >
              <p className="sm:text-xl xs:text-lg font-extrabold">
                {blockNumber}
              </p>
            </motion.button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Blocks;
