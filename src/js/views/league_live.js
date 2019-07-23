"use strict";

import m from "mithril";
import { league } from "../models/league";
import { ddragon } from "./../models/dataDragon";
import { auth } from "../models/auth";

const leagueLive = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    oninit: () => {
        ddragon.summonerSpellsList();
        ddragon.preloadChampionImgUrl();
    },
    playerChampion: player => {
        var championId;
        try {
            championId = league.ChampList.find(
                char => char.key === league.liveGame.participants[player].championId.toString()
            ).id;
        } catch (e) {
            console.log(e);
            championId = "";
        } finally {
            return championId;
        }
    },

    renderLiveContent: () => {
        if (league.liveGame.status) {
            console.log("No such summoner");
            localStorage.removeItem("featuredGames");
            return m.fragment({}, [<p className="error">Summoner not ingame.</p>]);
        } else if (ddragon.statusSpells === 200 && ddragon.statusChampion === 200) {
            return m.fragment({}, [
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
                        <p>{new Date(league.liveGame.gameStartTime).toString().substring(0, 21)}</p>
                    </div>
                </div>,
                <div className="match">
                    <div className="team-header">
                        <p className="prefix team1">Team 1</p>
                        <p className="prefix team2">Team 2</p>
                    </div>
                    <div className="teams" id="teams">
                        {Object.keys(league.liveGame.participants).map(player => {
                            // var champImgUrl = leagueLive.imageUrl(player);
                            var champImgUrl = ddragon.championImgs.find(
                                champ => champ.name === leagueLive.playerChampion(player)
                            ).url;
                            console.log(league.liveGame.participants[player].teamId.toString());

                            return m.fragment({}, [
                                <div
                                    className={
                                        "player " +
                                        "team-" +
                                        league.liveGame.participants[player].teamId.toString()
                                    }>
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
                                            src={`http://ddragon.leagueoflegends.com/cdn/${
                                                auth.patch
                                            }/img/spell/${
                                                league.sumSpellsList.find(
                                                    spell =>
                                                        spell.key ===
                                                        league.liveGame.participants[
                                                            player
                                                        ].spell1Id.toString()
                                                ).id
                                            }.png`}></img>
                                        <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/${
                                                auth.patch
                                            }/img/spell/${
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
            ]);
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
    },

    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>Live Game</h1>
            </div>,
            <div className="main-container slide-in">
                <div class="body-container">{leagueLive.renderLiveContent()}</div>
            </div>,
        ]);
    },
};

export { leagueLive };
