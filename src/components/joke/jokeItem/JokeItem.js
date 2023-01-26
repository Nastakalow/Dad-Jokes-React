import { useDispatch } from "react-redux";
import style from "./style.module.css";
import { increaseScore, decreaseScore } from "../../../features/joke/jokeSlice";
import zeroIcon from "../images/zeroIcon.png";
import fiveIcon from "../images/fiveIcon.png";
import tenIcon from "../images/tenIcon.png";
import twentyIcon from "../images/twentyIcon.png";

function JokeItem({ id, joke, score }) {
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(increaseScore(id));
  };

  const decrease = () => {
    dispatch(decreaseScore(id));
  };

  const updateBorderColor = () => {
    if (score <= 0) {
      return "#f00";
    } else if (score > 0 && score <= 5) {
      return "#fb8500";
    } else if (score > 5 && score <= 10) {
      return "#f4e409";
    } else if (score > 10) {
      return "#007f5f";
    }
  };

  const setIcon = () => {
    if (score <= 0) {
      return zeroIcon;
    } else if (score > 0 && score <= 5) {
      return fiveIcon;
    } else if (score > 5 && score <= 10) {
      return tenIcon;
    } else if (score > 10) {
      return twentyIcon;
    }
  };

  const icon = setIcon();
  const color = updateBorderColor();

  const borderStyle = { borderColor: color };

  return (
    <div className={style.container}>
      <div className={style.scoreWrapper}>
        <button onClick={increase} className={style.upBtn}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
        <h2 style={borderStyle} className={style.score}>
          {score}
        </h2>
        <button onClick={decrease} className={style.downBtn}>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
      <div className={style.joke}>
        <p>{joke}</p>
      </div>
      <div className={style.icon}>
        <img src={icon} />
      </div>
    </div>
  );
}

export default JokeItem;
