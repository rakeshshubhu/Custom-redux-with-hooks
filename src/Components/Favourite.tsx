import React from "react";
import {Store} from './../Redux/Store'
import { IEpisode, IAction } from "../interfaces/interfaces";

export default function Favourite() :JSX.Element {

    const {state, dispatch} = React.useContext(Store)

    const unFavAction = (favourite : IEpisode) : IAction=> {
        const filteredFavourites = state.favourites.filter((x: IEpisode) => x.id !== favourite.id)
        return dispatch({
            type : 'REMOVE_FAV',
            payload : filteredFavourites
        })
    }
    return state.favourites.map((favourite: IEpisode) => (
        <section key={favourite.id} className="episode-box">
            <img src={favourite.image.medium} alt={favourite.name}/>
            <div>{favourite.name}</div>
            <section>
                Season : {favourite.season} 
                Number : {favourite.number}
            </section>
            <button type="button" onClick={() => unFavAction(favourite)}>
                Unfavourite
            </button>
        </section>
    ));
 
}
