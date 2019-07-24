import m from "mithril";

import { league } from "../models/league";
import { auth } from "../models/auth";
import { ddragon } from "../models/dataDragon";

const allMasteries = {
    oninit: () => {
        ddragon.statusMasterychamps = null;
        ddragon.PreloadMasteryChampions();
    },
    view: () => {
        return m.fragment({}, [
            <div className="allMasteries" id="allMasteries">
                <h2>Champions info</h2>
                {league.acc.masteries && ddragon.statusMasterychamps === 200 ? (
                    Object.values(league.acc.masteries).map(champ => {
                        return m.fragment({}, [
                            <div className="champion">
                                <h3>{ddragon.imageName(champ.championId)}</h3>
                                <img
                                    src={ddragon.imageUrlV2(champ.championId)}
                                    alt="champion img"></img>
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
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )}
            </div>,
        ]);
    },
};

export { allMasteries };
