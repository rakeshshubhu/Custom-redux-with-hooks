import React from 'react';
import { IEpisode, IEpisodeList } from '../interfaces/interfaces';

export default function EpisodeList(props : IEpisodeList): Array<JSX.Element> {
    const {episodes, favourites, toggleFavouriteAction} = props;
    return episodes.map((episode : IEpisode) => (
        <section key={episode.id} className="episode-box">
            <img src={episode.image.medium} alt={episode.name}/>
            <div>{episode.name}</div>
            <section>
                Season : {episode.season} 
                Number : {episode.number}
            </section>
            <button type="button" onClick={() => toggleFavouriteAction(episode)}>
                {favourites.includes(episode) ? "Unfavourite" : "Favourite"}
            </button>
        </section>
    ))
}
