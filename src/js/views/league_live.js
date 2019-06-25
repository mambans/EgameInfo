"use strict";

import m from "mithril";
import { league } from "../models/league";

const leagueLive = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    // oninit: () => {
    //     league.live();
    // },
    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>Live Game</h1>
            </div>,
            <div className="main-container slide-in">
                <div class="body-container">
                    {league.liveGame.status
                        ? (console.log("No such summoner"),
                          localStorage.removeItem("featuredGames"),
                          <p className="error">Summoner not ingame.</p>)
                        : league.liveGame.gameMode
                        ? [
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

                                          var champImgUrl = `http://ddragon.leagueoflegends.com/cdn/9.12.1/img/champion/${champName}.png`;

                                          return m.fragment({}, [
                                              <div className="player">
                                                  <div>
                                                      <p>
                                                          {league.liveGame.participants[
                                                              player
                                                          ].summonerName.toString()}
                                                      </p>
                                                  </div>
                                                  <div className="champ">
                                                      <p>{champName}</p>
                                                      <img
                                                          className="champ-img"
                                                          src=""
                                                          alt="champ-img"></img>
                                                  </div>
                                                  {/* <div>
                                                      <p>
                                                          {league.liveGame.participants[
                                                              player
                                                          ].teamId.toString()}
                                                      </p>
                                                  </div> */}
                                                  <div>
                                                      <p>
                                                          {league.liveGame.participants[
                                                              player
                                                          ].spell1Id.toString()}
                                                          {" & "}
                                                          {league.liveGame.participants[
                                                              player
                                                          ].spell2Id.toString()}
                                                      </p>
                                                  </div>
                                              </div>,
                                          ]);
                                      })}
                                  </div>
                              </div>,
                          ]
                        : m(".loading-icon")}
                </div>
            </div>,
        ]);
    },
};

export { leagueLive };
