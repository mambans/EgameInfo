import m from "mithril";

import { league } from "./../models/league";
import { auth } from "../models/auth";

const allMasteries = {
    view: () => {
        return m.fragment({}, [
            <div className="allMasteries" id="allMasteries">
                <h2>Champions info</h2>
                {(console.log("1: ", league.acc.masteries), console.log("2: ", league.ChampList))}
                {league.acc.masteries && league.ChampList ? (
                    Object.values(league.acc.masteries).map(champ => {
                        return m.fragment({}, [
                            <div className="champion">
                                <h3>
                                    {
                                        league.ChampList.find(
                                            char => char.key === champ.championId.toString()
                                        ).id
                                    }
                                </h3>
                                <img
                                    src={`http://ddragon.leagueoflegends.com/cdn/${
                                        auth.patch
                                    }/img/champion/${
                                        league.ChampList.find(
                                            char => char.key === champ.championId.toString()
                                        ).id
                                    }.png`}
                                    alt="champion img"></img>
                                ,
                            </div>,
                            <div className="masteries">
                                <div>
                                    <p className="prefix">Level</p>
                                    <p>{champ.championLevel}</p>
                                </div>
                                <div>
                                    <p className="prefix">Points</p>
                                    <p>{champ.championPoints}</p>
                                </div>
                                <div>
                                    <p className="prefix">Chest</p>
                                    <p>{champ.chestGranted.toString()}</p>
                                </div>
                                <div>
                                    <p className="prefix">Tokens</p>
                                    <p>{champ.tokensEarned}</p>
                                </div>
                                <div>
                                    <p className="prefix">Last time played</p>
                                    <p>
                                        {new Date(champ.lastPlayTime).toString().substring(0, 21)}
                                    </p>
                                </div>
                            </div>,
                        ]);
                    })
                ) : (
                    <div className="loading-div">
                        <img
                            src="../../img/Eclipse-2s-200px.svg"
                            className="loading-icon"
                            alt="Loading"></img>
                    </div>
                )}
            </div>,
        ]);
    },
};

export { allMasteries };
