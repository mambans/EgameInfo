"use strict";
import m from "mithril";

import { league } from "../models/league";
import { auth } from "../models/auth";

const featuredGames = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    oninit: async () => {
        return await league.featuredGamesSearch();
    },
    renderFinal: () => {
        if (auth.networkState === "none" && league.featuredGames) {
            return m.fragment({}, [
                <p className="error">No Connection</p>,
                featuredGames.renderFeaturedGames(),
            ]);
        } else if (auth.networkState === "none") {
            return m.fragment({}, [<p className="error">No Connection</p>]);
        } else if (league.featuredGames && auth.networkState !== "none") {
            return m.fragment({}, [featuredGames.renderFeaturedGames()]);
        } else {
            <div className="loading-div">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>;
        }
    },
    renderFeaturedGames: () => {
        return m.fragment({}, [
            <div className="featured-game">
                <div className="header">
                    <p className="prefix">Mode</p>
                    <p className="prefix">Type</p>
                    <p className="prefix">Region</p>
                </div>
                {Object.values(league.featuredGames.gameList).map(game => {
                    return m.fragment({}, [
                        <div className="game">
                            <div className="header-content">
                                <p>{game.gameMode.toLowerCase()}</p>
                                <p>{game.gameType.toLowerCase()}</p>
                                <p>{game.platformId.toLowerCase()}</p>
                            </div>
                            <div className="team-header">
                                <p className="prefix team100-title">Team 1</p>
                                <p className="prefix player-title">Players</p>
                                <p className="prefix team200-title">Team 2</p>
                            </div>
                            <div className="players">
                                {Object.values(game.participants).map(player => {
                                    if (player.teamId === 100) {
                                        return m.fragment({}, [
                                            <p className="team100">{player.summonerName}</p>,
                                        ]);
                                    } else {
                                        return m.fragment({}, [
                                            <p className="team200">{player.summonerName}</p>,
                                        ]);
                                    }
                                })}
                            </div>
                        </div>,
                    ]);
                })}
            </div>,
        ]);
    },
    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>Featured Games</h1>
            </div>,
            <div className="main-container slide-in">
                <div class="body-container">{featuredGames.renderFinal()}</div>
            </div>,
        ]);
    },
};

export { featuredGames };
