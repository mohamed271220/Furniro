import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { AnimatePresence, motion } from 'framer-motion';

const Details = ({ data }) => {
  const [active, setActive] = useState(0);

  const lineVariants = {
    description: { x: 0, opacity: 1 },
    reviews: { x: '100%', opacity: 1 },
  };
  const contentVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const renderDescription = () => {
    return <div className="flex flex-col">
      <div className="flex flex-col gap-[3vh] text-[2vh] text-[#9F9F9F]">
        {data.description.map((desc, i) => (
          <p key={i}>{desc.paragraph}</p>
        ))}
      </div>
      <div>
        <h1 className="text-[3vh] font-semibold">Additional Information.</h1>
        <p>package:{data.salesPackage}</p>
        <p>weight:{data.weight}</p>
        <p>dimensions:{data.height}X{data.width}</p>
        <p>filling material:{data.fillingMat}</p>
        <p>cover material:{data.secondaryMat}</p>
      </div>



    </div>
  };

  const renderReviews = () => {
    return <div>
      {data.reviews.length === 0 && <p>No reviews yet.</p>}
      {data.reviews.map((review, i) => (
        <div key={i} className="flex flex-col  justify-between   pb-[3vh] text-[2vh] " >
          <div className="flex flex-row gap-2">
            <p>{review.rating} <AiFillStar className="text-dim-yellow" /></p>
            <p>{review.user.username}</p>
          </div>
          <p className="text-[#9F9F9F]">{review.content}</p>
        </div>
      ))}
    </div>
  };


  return (
    <div className="desc w-full px-[9vh] gap-[4vh] py-[2vh]">
      <div className="control w-full flex flex-row items-center justify-between mb-[6vh] pb-[1vh] gap-[3vh] text-[4vh] relative">
        <button onClick={() => setActive(0)}>Description</button>
        <button onClick={() => setActive(1)}>Reviews [{data.reviews.length}]</button>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-black w-1/2"
          variants={lineVariants}
          animate={active === 0 ? 'description' : 'reviews'}
          transition={{ duration: 0.3 }}
        />
      </div>
      <AnimatePresence mode='wait'>
        {active === 0 && (
          <motion.div
            key="description"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {renderDescription()}
          </motion.div>
        )}
        {active === 1 && (
          <motion.div
            key="reviews"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {renderReviews()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
