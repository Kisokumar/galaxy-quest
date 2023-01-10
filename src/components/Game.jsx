import main from "../../game/main";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

export default function Game() {
  return (
    <>
      <Header />
      <div id="game-display" className="flex items-center justify-center ">
        <Loading />

        {main()}
      </div>
      <Footer />
    </>
  );
}
