// import * as Slider from "@radix-ui/react-slider";
// import { debounce } from "lodash";
// import { SetStateAction } from "react";

// export const DelaySlider = ({
//   setSpeed,
// }: {
//   setSpeed: React.Dispatch<SetStateAction<number[]>>;
// }) => {
//   const handleSpeedChange = debounce(([newSpeed]) => {
//     const minSliderValue = 10;
//     const minDelayValue = 10;
//     const maxDelayValue = 80;
//     const normalizedSpeed = newSpeed - minSliderValue;
//     const inverseSpeed = maxDelayValue - normalizedSpeed;
//     const delayValue = inverseSpeed + minDelayValue;

//     setSpeed([delayValue]);
//   }, 20);
//   return (
//     <form>
//       <Slider.Root
//         className="relative flex items-center select-none touch-none w-[200px] h-5"
//         defaultValue={[50]}
//         min={25}
//         max={75}
//         step={1}
//         onValueChange={handleSpeedChange}
//       >
//         <Slider.Track className="bg-slate-500 relative grow rounded-full h-[3px]">
//           <Slider.Range className="absolute bg-white rounded-full h-full" />
//         </Slider.Track>
//         <Slider.Thumb className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5 hover:cursor-grab" />
//       </Slider.Root>
//     </form>
//   );
// };
