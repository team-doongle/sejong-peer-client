import { useState, useEffect } from "react";

interface props {
  endIndex: number;
}

const useSliderButton = ({ endIndex }: props) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  const movePrev = () => setItemIndex(itemIndex - 1);
  const moveNext = () => setItemIndex(itemIndex + 1);

  const checkGoPrev = () => itemIndex > 0;
  const checkGoNext = () => itemIndex < endIndex;

  useEffect(() => {
    setDisablePrev(!checkGoPrev());
    setDisableNext(!checkGoNext());
  }, [itemIndex]);

  return {
    itemIndex,
    setItemIndex,
    disablePrev,
    disableNext,
    movePrev,
    moveNext,
    setDisablePrev,
    setDisableNext,
    checkGoPrev,
    checkGoNext
  };
};

export default useSliderButton;
