import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import { Store } from "./Redux/Store";
import { IEpisode, IEpisodeList } from "./interfaces/interfaces";

import Favourite from './Components/Favourite'

const EpisodeList = React.lazy<any>(() => import("./Components/EpisodeList"));

export default function App(): JSX.Element {
  const { state, dispatch }: any = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const data = await fetch(
      "http://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes"
    );
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavouriteAction = (episode: IEpisode) => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = { type: "ADD_FAV", payload: episode };
    if (episodeInFavourites) {
      const removedPayload = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: removedPayload
      };
    }
    return dispatch(dispatchObj);
  };

  const props: IEpisodeList = {
    episodes: state.episodes,
    favourites: state.favourites,
    toggleFavouriteAction
  };

  return (
    <>
      <header className="header">
        <h1>Girls</h1>
        <div
          style={{
            display: "flex",
            flexBasis: "20%",
            justifyContent: "space-evenly"
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/favs">Total Favourite(s) : {state.favourites.length}</Link>
        </div>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" exact>
            <div className="episode-layout">
              <EpisodeList {...props} />
            </div>
          </Route>
          <Route path="/favs">
            <div className="episode-layout">
              <Favourite/>
            </div>
          </Route>
        </Switch>
      </React.Suspense>
    </>
  );
}
