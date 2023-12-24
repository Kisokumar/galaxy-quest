export default function ControlsLeft() {
  return (
    <div className="hidden lg:block">
      <div className="px-4 flex items-center justify-end font-Audiowide text-black ">
        <a
          className="mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/galaxy-quest/controls"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="square.png"
              alt="circle-ps-button"
            />
            <p className=" px-2"> (E) Teleport</p>
          </div>
        </a>
        <a
          className="mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/galaxy-quest/controls"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="circle.png"
              alt="circle-ps-button"
            />
            <p className=" px-2"> (R) Reset</p>
          </div>
        </a>
        <a
          className="mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="controls.html"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <img
              className=" border-lg cursor-pointer h-5"
              src="triangle.png"
              alt="triangle-ps-button"
            />
            <p className=" px-2"> (SHIFT) Warp Drive</p>
          </div>
        </a>
      </div>
    </div>
  );
}
