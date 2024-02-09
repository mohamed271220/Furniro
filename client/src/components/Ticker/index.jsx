import { motion } from "framer-motion";

const tickerVariants = {
  animate: {
    x: [1000, -1000],
    transition: {
      duration: 12,
      repeat: Infinity
    }
  }
};

const Ticker = () => (
  <div className="overflow-hidden bg-red-500 text-white w-full text-[2.5vh] h-[4vh] flex items-center">
    <motion.div
      className="whitespace-nowrap"
      variants={tickerVariants}
      animate="animate"
    >
      <p className="text-white text-lg pr-10">
        THIS IS A TESTING VERSION, PLEASE DO NOT ENTER REAL CREDIT CARD DETAILS INSTEAD USE THE FOLLOWING TEST CREDIT CARD DETAILS: (CARD NUMBER: 4242 4242 4242 4242), (EXPIRATION: 04/24), (CVC: 242). YOU WON&apos;T BE GETTING ANY REAL PRODUCTS, THIS IS JUST A TESTING VERSION.
      </p>
    </motion.div>
  </div>
);

export default Ticker;