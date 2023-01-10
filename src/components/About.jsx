import Header from "./Header";
import Footer from "./Footer";

export default function About() {
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
      <div className="border-2 p-8 w-fit">
        <p>About</p>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
