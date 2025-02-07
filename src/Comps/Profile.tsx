import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Profile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.7,
  });

  const circleVariants = {
    hidden: { 
      scale: 2,
      opacity: 0.5,
      y: 50,
      rotate: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      scale: 1,
      opacity: 0,
      y: -100,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
        <div ref={ref} className="relative w-full h-screen">
        <motion.div
  className="rounded-full bg-purple-500 w-[25vw] h-[25vw] absolute top-1/8 -right-[78.6667%]"
  variants={circleVariants}
  initial="hidden"
  animate={isInView ? "visible" : "exit"}
        />
</div>
  );
};

export default Profile;