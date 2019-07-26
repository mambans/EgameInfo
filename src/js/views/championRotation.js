"use strict";
import m from "mithril";

import { league } from "./../models/league";
import { ddragon } from "./../models/dataDragon";
import { auth } from "../models/auth";

const champRotation = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    oninit: async () => {
        await league.champRotation();
        await ddragon.PreloadRotationChampionImageUrl();
    },
    RenderRotation: () => {
        if (league.rotation && ddragon.statusRotationChampions === 200) {
            return m.fragment({}, [
                <div class="body-container">
                    <h3>Champions</h3>
                    <div className="rotationChamps">
                        {Object.values(league.rotation.freeChampionIds).map(champ => {
                            return m.fragment({}, [
                                <div className="champion">
                                    <p>{ddragon.imageName(champ)}</p>
                                    {/* <img src={ddragon.imageUrl(champ)} alt="champ img"></img> */}
                                    <img src={ddragon.imageUrlV2(champ)} alt="champ img"></img>
                                </div>,
                            ]);
                        })}
                    </div>
                    <h3>Champs for new players.</h3>
                    <div className="rotationChamps">
                        {Object.values(league.rotation.freeChampionIdsForNewPlayers).map(champ => {
                            return m.fragment({}, [
                                <div className="champion">
                                    <p>{ddragon.imageName(champ)}</p>
                                    {/* <img src={ddragon.imageUrl(champ)} alt="champ img"></img> */}
                                    <img src={ddragon.imageUrlV2(champ)} alt="champ img"></img>
                                </div>,
                            ]);
                        })}
                    </div>
                </div>,
            ]);
        } else if (auth.networkState === "none" && league.rotation) {
            return m.fragment({}, [
                <div class="body-container">
                    <p className="error">No Connection</p>
                    <h3>Champions</h3>
                    <div className="rotationChamps">
                        {Object.values(league.rotation.freeChampionIds).map(champ => {
                            return m.fragment({}, [
                                <div className="champion">
                                    <p>{ddragon.imageName(champ)}</p>
                                    {/* <img src={ddragon.imageUrl(champ)} alt="champ img"></img> */}
                                    <img src={ddragon.imageUrlV2(champ)} alt="champ img"></img>
                                </div>,
                            ]);
                        })}
                    </div>
                    <h3>Champs for new players.</h3>
                    <div className="rotationChamps">
                        {Object.values(league.rotation.freeChampionIdsForNewPlayers).map(champ => {
                            return m.fragment({}, [
                                <div className="champion">
                                    <p>{ddragon.imageName(champ)}</p>
                                    {/* <img src={ddragon.imageUrl(champ)} alt="champ img"></img> */}
                                    <img src={ddragon.imageUrlV2(champ)} alt="champ img"></img>
                                </div>,
                            ]);
                        })}
                    </div>
                </div>,
            ]);
        } else if (auth.networkState === "none") {
            <div class="body-container">
                <p className="error">No Connection</p>
            </div>;
        } else {
            return m.fragment({}, [
                <div class="body-container">
                    <div className="loading-div">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>,
            ]);
        }
    },
    view: () => {
        return m.fragment({}, [
            <div className="title">
                <h1>This week's free champions.</h1>
            </div>,
            <div className="main-container slide-in">{champRotation.RenderRotation()}</div>,
        ]);
    },
};
export { champRotation };
