import Header from "./Header";
import Footer from "./Footer";

export default function Controls() {
  return (
    <>
      <div className="fixed top-0 w-full shadow-custom">
        <header className="scale-[85%] mt-4 flex w-full items-center justify-center px-4 mt-0  py-2 mb-1">
          <div className="flex text-sm text-white space-x-6 md:mt-0">
            <h1 className="transition ease-in-out hover:scale-110 duration-300 w-max bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center flex items-center rounded-full border-[3px] );">
              &nbsp;&nbsp;&nbsp;Galaxy Quest&nbsp;&nbsp;&nbsp;
            </h1>
          </div>
        </header>
      </div>

      <div className="flex flex-col border-2 rounded-2xl p-8 w-fit bg-black bg-opacity-30	 text-white">
        <div className="w-full flex justify-center">
          <h1 className="mb-6 text-3xl w-max bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center items-center rounded-full border-[3px] );">
            &nbsp;&nbsp;&nbsp;Controls&nbsp;&nbsp;&nbsp;
          </h1>
        </div>
        <p class="ptag">The main propellant of your spaceship.</p>

        <p class="ptag">
          Use this to rotate your spaceship and to counter steer when meteors
          knock you off trajectory.
        </p>

        <p class="ptag">
          For when you're caught in a heavy meteor shower (beware you may
          teleport into a worse situation)
        </p>

        <p class="ptag">Restart to original game state.</p>
      </div>

      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
