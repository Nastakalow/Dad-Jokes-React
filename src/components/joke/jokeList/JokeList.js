import style from "./style.module.css";
import JokeItem from "../jokeItem/JokeItem";
import fetchIcon from "../images/fetch-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchJokes, getStoreData } from "../../../features/joke/jokeSlice";
import { useEffect } from "react";

function JokeList() {
  const { jokes, loading, error } = useSelector((state) => state.joke);
  const dispatch = useDispatch();
  const sortJokes = [...jokes].sort((a, b) => b.score - a.score);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("jokes"));
    if (data) {
      dispatch(getStoreData(data));
    } else {
      dispatch(fetchJokes());
    }
  }, []);

  useEffect(() => {
    if (jokes.length) {
      localStorage.setItem("jokes", JSON.stringify(jokes));
    }
  });

  const fetch = () => {
    dispatch(fetchJokes());
  };

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.fetchWrapper}>
          <div className={style.titleContent}>
            <h1>Dad</h1>
            <h1>Jokes</h1>
          </div>
          <img className={style.image} src={fetchIcon} />
          <button onClick={fetch} className={style.fetchBtn}>
            Fetch Jokes
          </button>
        </div>
        <div className={style.jokeWrapper}>
          {sortJokes.map((joke, index) => (
            <JokeItem key={`joke-${joke.id}`} {...joke} />
          ))}
        </div>
      </div>
      {loading ? (
        <div className={style.loading}>
          <p>Loading...</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default JokeList;
