import Footer from "./Footer";
import Header from "./Header";

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen w-screen font-Audiowide">
      <Header />
      <div className="flex-grow flex-shrink-0 max-w-screen-xl mx-auto flex-col flex items-center justify-center ">
        <div className="text-white w-fit bg-gradient-to-r from-indigo-900 via-indigo-500 to-cyan-400 font-Audiowide text-lg text-center flex items-center px-[30px] py-[1px] mx-[5px] rounded-full border-[3px] );">
          <p>Oops! This page doesn't exist. . .</p>
        </div>

        <a
          className="mt-4 mx-2 transition ease-in-out hover:scale-110 duration-300 hover:text-white hover:bg-gray-700 bg-white rounded-full"
          href="/"
        >
          <div className="no-underline px-15 w-max mx-2 my-1 rounded-lg flex min-w-max justify-center items-center">
            <p className=" px-2">Click here to return to the game!</p>
          </div>
        </a>
      </div>
      <Footer />
    </div>
  );
}
