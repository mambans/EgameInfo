"use strict";
import m from "mithril";

import { league } from "../models/league";

import { allMasteries } from "./champMasteries";
import { auth } from "../models/auth";

const league_acc = {
    mastVisible: false,
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    renderFinal: vnode => {
        if (auth.networkState === "none") {
            if (league.offlineRender) {
                return m.fragment({}, [
                    <p className="error">No connection</p>,
                    league_acc.renderAcc(),
                ]);
            } else {
                return m.fragment({}, [<p className="error">No connection</p>]);
            }
        } else if (auth.networkState !== "none") {
            if (league.acc.status) {
                return m.fragment({}, [
                    console.log("No summoner"),
                    <p className="error">No Summoner with that name</p>,
                ]);
            } else if (league.acc.name) {
                return m.fragment({}, [league_acc.renderAcc(vnode)]);
            } else {
                return m.fragment({}, [
                    <div className="loading-div">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>,
                ]);
            }
        }
    },

    renderAcc: vnode => {
        return m.fragment({}, [
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
                            await league.allMasteries();
                        }
                        vnode.state.mastVisible = !vnode.state.mastVisible;
                    }}>
                    All Masteries
                </button>
            </div>,
        ]);
    },
    view: vnode => {
        return m.fragment({}, [
            <div className="title">
                <h1>Account Info</h1>
            </div>,
            <div className="main-container slide-in">
                <div className="body-container" id="body-container">
                    {league_acc.renderFinal(vnode)}
                    {vnode.state.mastVisible && m(allMasteries)}
                </div>
            </div>,
        ]);
    },
};

export { league_acc };
