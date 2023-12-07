import { Algorithm } from "@/lib/types";
import { motion } from "framer-motion";

const AlgorithmInfo = ({
  selectedAlgorithm,
}: {
  selectedAlgorithm: Algorithm;
}) => {
  const { name, description, guaranteesShortestPath, weighted } =
    selectedAlgorithm;

  return (
    <motion.div className="justify-start">
      <motion.span></motion.span>
    </motion.div>
  );
};

export default AlgorithmInfo;
