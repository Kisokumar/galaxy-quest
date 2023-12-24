export default function ControlsRight() {
  return (
    <div className="hidden lg:block">
      <div className="px-4 flex  items-center justify-between font-Audiowide text-black">
        <a
          className="mx-2  hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/controls"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="Lstick.png"
              alt="Lstick"
            />
            <p className=" px-2"> (A/D) Side Boosters</p>
          </div>
        </a>
        <a
          className="mx-2 flex transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/controls"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="r2.svg"
              alt="r2"
            />
            <p className=" px-2"> (W) Thruster</p>
          </div>
        </a>
        <a
          className="mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/controls"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="x.png"
              alt="triangle-ps-button"
            />
            <p className=" px-2"> (SPACE) Shoot </p>
          </div>
        </a>
        {/* <div className="absolute justify-center items-center right-[68px] top-4">
          <a
            className="mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-white hover:text-black bg-indigo-800 border-2 rounded-full h-[30px] flex justify-center items-center text-white"
            href="/controls"
          >
            <p className=" px-2">Controls</p>
          </a>
        </div> */}
      </div>
    </div>
  );
}
