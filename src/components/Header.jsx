import ControlsLeft from "./ControlsLeft";
import { useState } from "react";
import ControlsRight from "./ControlsRight";

export default function Header() {
  const [showControls, setShowControls] = useState("true");

  function toggleControls() {
    if (showControls === "true") {
      setShowControls("false");
    } else {
      setShowControls("true");
    }
  }

  if (showControls === "true") {
    return (
      <>
        <>
          <div className="w-full shadow-custom">
            <header className="scale-75 mt-4 flex w-full items-center justify-center px-4 mt-0 py-2 ">
              <div className=" flex text-sm text-white space-x-6 md:mt-0">
                <h1 className="block sm:hidden w-max bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center flex items-center rounded-full border-[3px] );">
                  &nbsp;&nbsp;&nbsp;Galaxy Quest&nbsp;&nbsp;&nbsp;
                </h1>
              </div>
              <div className="flex text-white text-sm mt-4 space-x-6 md:mt-0">
                <ControlsLeft />
              </div>

              <div className="">
                <button
                  onClick={toggleControls}
                  className="hidden lg:block font-Audiowide w-max px-2 mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-white hover:text-black bg-indigo-800 border-2 rounded-full h-[30px] flex justify-center items-center text-white"
                >
                  Toggle Controls
                </button>
              </div>

              <div className="text-white text-sm flex mt-4 space-x-6 md:mt-0">
                <ControlsRight />
              </div>
            </header>
          </div>
        </>
      </>
    );
  }
  return (
    <>
      <div className="w-full shadow-custom">
        <header className="scale-[85%] mt-4 flex w-full items-center justify-center px-4 mt-0  py-2 mb-1">
          <div>
            <button onClick={toggleControls} className="hidden lg:block">
              <div className="flex text-sm text-white space-x-6 md:mt-0">
                <h1 className="transition ease-in-out hover:scale-110 duration-300 hidden lg:block w-max bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center flex items-center rounded-full border-[3px] );">
                  &nbsp;&nbsp;&nbsp;Galaxy Quest&nbsp;&nbsp;&nbsp;
                </h1>
              </div>
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
