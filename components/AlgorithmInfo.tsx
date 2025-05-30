import { Algorithm } from "@/lib/types";
import { motion } from "motion/react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const AlgorithmInfo = ({
  selectedAlgorithm,
}: {
  selectedAlgorithm: Algorithm;
}) => {
  const { name, description, guaranteesShortestPath, weighted } =
    selectedAlgorithm;
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="justify-start pl-[1rem]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="md:text-lg sm:text-md font-bold">{name}</div>
      <div>{description}</div>
      <div>
        Guarantees Shortest Path:
        {guaranteesShortestPath ? (
          <FaCheck className="inline ml-1 text-green-500" />
        ) : (
          <MdCancel className="inline ml-1 text-red-500" />
        )}
      </div>
      <div>
        Weighted:
        {weighted ? (
          <FaCheck className="inline ml-1 text-green-500" />
        ) : (
          <MdCancel className="inline ml-1 text-red-500" />
        )}
      </div>
    </motion.div>
  );
};

export default AlgorithmInfo;
