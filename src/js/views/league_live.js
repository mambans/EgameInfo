"use strict";

import m from "mithril";
import { league } from "../models/league";

import { auth } from "../models/auth";

const leagueLive = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>Live Game</h1>
            </div>,
            <div className="main-container slide-in">
                <div class="body-container">
                    {league.liveGame.status ? (
                        (console.log("No such summoner"),
                        localStorage.removeItem("featuredGames"),
                        <p className="error">Summoner not ingame.</p>)
                    ) : league.liveGame.gameMode ? (
                        [
                            console.log("Livegame"),
                            console.log(league.liveGame),
                            <div className="LiveGame-header">
                                <div className="header">
                                    <p className="prefix">Mode</p>
                                    <p>{league.liveGame.gameMode}</p>
                                </div>

                                <div className="header">
                                    <p className="prefix">Length</p>
                                    <p>{league.liveGame.gameLength}</p>
                                </div>
                                <div className="header">
                                    <p className="prefix">Region</p>
                                    <p>{league.liveGame.platformId}</p>
                                </div>
                                <div>
                                    <p className="prefix">Start time</p>
                                    <p>
                                        {new Date(league.liveGame.gameStartTime)
                                            .toString()
                                            .substring(0, 21)}
                                    </p>
                                </div>
                            </div>,
                            <div className="match">
                                {/* <div className="header">
                                      <p className="prefix">summonerName</p>
                                      <p className="prefix">Champ</p>
                                      <p className="prefix">teamId</p>
                                      <p className="prefix">Spells</p>
                                  </div> */}
                                <div className="team-header">
                                    <p className="prefix team1">Team 1</p>
                                    <p className="prefix team2">Team 2</p>
                                </div>
                                <div className="teams" id="teams">
                                    {Object.keys(league.liveGame.participants).map(player => {
                                        var champName = league.ChampList.find(
                                            char =>
                                                char.key ===
                                                league.liveGame.participants[
                                                    player
                                                ].championId.toString()
                                        ).id;

                                        var champImgUrl = `http://ddragon.leagueoflegends.com/cdn/${auth.patch}/img/champion/${champName}.png`;

                                        return m.fragment({}, [
                                            <div className="player">
                                                <p>
                                                    {league.liveGame.participants[
                                                        player
                                                    ].summonerName.toString()}
                                                </p>
                                                <div className="champ">
                                                    <img
                                                        className="champ-img"
                                                        src={champImgUrl}
                                                        alt="champ-img"></img>
                                                </div>
                                                <div className="summonerSpells">
                                                    <img
                                                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${
                                                            league.sumSpellsList.find(
                                                                spell =>
                                                                    spell.key ===
                                                                    league.liveGame.participants[
                                                                        player
                                                                    ].spell1Id.toString()
                                                            ).id
                                                        }.png`}></img>
                                                    <img
                                                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${
                                                            league.sumSpellsList.find(
                                                                spell =>
                                                                    spell.key ===
                                                                    league.liveGame.participants[
                                                                        player
                                                                    ].spell2Id.toString()
                                                            ).id
                                                        }.png`}></img>
                                                </div>
                                            </div>,
                                        ]);
                                    })}
                                </div>
                            </div>,
                        ]
                    ) : (
                        <div className="loading-div">
                            <img
                                src="../../img/Eclipse-2s-200px.svg"
                                className="loading-icon"
                                alt="Loading"></img>
                        </div>
                    )}
                </div>
            </div>,
        ]);
    },
};

export { leagueLive };
