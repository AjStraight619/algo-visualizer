import * as Slider from "@radix-ui/react-slider";
import { MutableRefObject } from "react";

export const DelaySlider = ({
  speedRef,
}: {
  speedRef: MutableRefObject<number[]>;
}) => {
  const handleValueChange = (newSpeed: number[]) => {
    const minSliderValue = 5;
    const minDelayValue = 5;
    const maxDelayValue = 55;
    const normalizedSpeed = newSpeed[0] - minSliderValue;
    const inverseSpeed = maxDelayValue - normalizedSpeed;
    const delayValue = inverseSpeed + minDelayValue;

    speedRef.current = [delayValue];
    console.log(speedRef.current);
  };

  return (
    <form>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-[150px] h-5"
        defaultValue={[30]}
        min={5}
        max={55}
        step={1}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="bg-slate-500 relative grow rounded-full h-[3px] active:cursor-grabbing">
          <Slider.Range className="absolute bg-white rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black rounded-[10px]  focus:outline-none focus:shadow-[0_0_0_5px] hover:cursor-grab" />
      </Slider.Root>
    </form>
  );
};
