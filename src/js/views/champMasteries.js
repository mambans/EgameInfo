import m from "mithril";

import { league } from "./../models/league";

const allMasteries = {
    view: () => {
        return m.fragment({}, [
            <div className="allMasteries" id="allMasteries">
                <h2>Champions info</h2>
                {(console.log("1: ", league.acc.masteries), console.log("2: ", league.ChampList))}
                {league.acc.masteries &&
                    league.ChampList &&
                    Object.values(league.acc.masteries).map(champ => {
                        return m.fragment({}, [
                            <h3>
                                {
                                    league.ChampList.find(
                                        char => char.key === champ.championId.toString()
                                    ).id
                                }
                            </h3>,
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
                    })}
            </div>,
        ]);
    },
};

export { allMasteries };
