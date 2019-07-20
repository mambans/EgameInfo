"use strict";
import m from "mithril";

import { league } from "./../models/league";
import { auth } from "../models/auth";

const champRotation = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    oninit: async () => {
        return await league.champRotation();
    },
    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>This week's free champions.</h1>
            </div>,
            <div className="main-container slide-in">
                {league.rotation ? (
                    <div class="body-container">
                        <h3>Champions</h3>
                        <div className="rotationChamps">
                            {console.log(league.ChampList)}
                            {Object.values(league.rotation.freeChampionIds).map(champ => {
                                return m.fragment({}, [
                                    <div className="champion">
                                        <p>{league.imageName(champ)}</p>
                                        <img src={league.imageUrl(champ)} alt="champ img"></img>
                                    </div>,
                                ]);
                            })}
                        </div>
                        <h3>Champs for new players.</h3>
                        <div className="rotationChamps">
                            {Object.values(league.rotation.freeChampionIdsForNewPlayers).map(
                                champ => {
                                    return m.fragment({}, [
                                        <div className="champion">
                                            <p>
                                                {
                                                    league.ChampList.find(
                                                        char => char.key === champ.toString()
                                                    ).id
                                                }
                                            </p>
                                            <img
                                                src={`http://ddragon.leagueoflegends.com/cdn/${
                                                    auth.patch
                                                }/img/champion/${
                                                    league.ChampList.find(
                                                        char => char.key === champ.toString()
                                                    ).id
                                                }.png`}
                                                alt="champ img"></img>
                                        </div>,
                                    ]);
                                }
                            )}
                        </div>
                    </div>
                ) : (
                    <div class="body-container">
                        <div className="loading-div">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>,
        ]);
    },
};
export { champRotation };
