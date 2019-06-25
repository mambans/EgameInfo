"use strict";
import m from "mithril";

import { league } from "./../models/league";

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
        return (
            league.rotation &&
            m.fragment({}, [
                <div className="title">
                    <h1>This week's free champions.</h1>
                </div>,
                <div className="main-container slide-in">
                    <div class="body-container">
                        <h3>Champions</h3>

                        <div className="rotationChamps">
                            {Object.values(league.rotation.freeChampionIds).map(champ => {
                                return m.fragment({}, [
                                    <p>
                                        {
                                            league.ChampList.find(
                                                char => char.key === champ.toString()
                                            ).id
                                        }
                                    </p>,
                                ]);
                            })}
                        </div>
                        <h3>Champs for new players.</h3>
                        <div className="rotationChamps">
                            {Object.values(league.rotation.freeChampionIdsForNewPlayers).map(
                                champ => {
                                    return m.fragment({}, [
                                        <p>
                                            {
                                                league.ChampList.find(
                                                    char => char.key === champ.toString()
                                                ).id
                                            }
                                        </p>,
                                    ]);
                                }
                            )}
                        </div>
                    </div>
                </div>,
            ])
        );
    },
};
export { champRotation };
