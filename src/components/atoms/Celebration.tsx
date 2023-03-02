import { useEffect, useState } from "react";

export default function Celebration() {
  const [isVisable, setIsVisable] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsVisable(false);
    }, 1500);
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      {isVisable ? (
        <>
          <div className="fixed left-0 right-0 top-0 bottom-0 z-20 w-screen h-screen opacity-50 bg-white" />
          <img
            src="assets\image\celebration.gif"
            alt="celebration"
            className="fixed left-0 right-0 mx-auto my-0 z-20 opacity-50 transition duration-150"
          />
        </>
      ) : null}
    </>
  );
}
