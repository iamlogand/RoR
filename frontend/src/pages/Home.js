import { Link } from "react-router-dom";
import TitleBanner from "../components/TitleBanner.js";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <TitleBanner />
      <div className="row">
        <h3>Play:</h3><Link to="find-game">Join Game</Link>
        <Link to="#">Create Game</Link>
      </div>
    </div>
  )
}