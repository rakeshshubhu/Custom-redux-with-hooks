/**
 *  All the interfaces
 */

export interface IState {
    episodes : Array<IEpisode>,
    favourites: Array<IEpisode>
}

export interface IAction{
    type : string,
    payload : any
}

export interface IEpisode{
  id: number
  url: string
  name: string
  season: number
  number: number
  airdate: string, 
  airtime:  string,
  airstamp: string, 
  runtime: number
  image: {
    medium : string
  }, 
  summary: string 
}

export interface IEpisodeList extends IState{
    toggleFavouriteAction : (episode : IEpisode) => IAction
}


