"use strict";
import m from "mithril";

import { league } from "../models/league";

import { allMasteries } from "./champMasteries";

const league_acc = {
    mastVisible: false,
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    view: vnode => {
        return m.fragment({}, [
            <div className="title">
                <h1>Account Info</h1>
            </div>,
            <div className="main-container slide-in">
                <div className="body-container" id="body-container">
                    {league.acc.status ? (
                        (console.log("No summoner"),
                        <p className="error">No Summoner with that name</p>)
                    ) : league.acc.name ? (
                        <div>
                            <div className="accInfo1">
                                <div>
                                    <p className="prefix">Summoner</p>
                                    <p>{league.acc.name}</p>
                                </div>
                                <div>
                                    <p className="prefix">Level</p>
                                    <p>{league.acc.summonerLevel}</p>
                                </div>
                                <div>
                                    <p className="prefix">Mastery</p>
                                    <p>{league.acc.totalMastery}</p>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary"
                                onclick={async () => {
                                    if (!league.acc.masteries || !league.ChampList) {
                                        // await league.championsList();
                                        await league.allMasteries();
                                    }
                                    vnode.state.mastVisible = !vnode.state.mastVisible;
                                }}>
                                All Masteries
                            </button>
                        </div>
                    ) : (
                        m(".loading-icon")
                    )}
                    {vnode.state.mastVisible && m(allMasteries)}
                </div>
            </div>,
        ]);
    },
};

export { league_acc };
