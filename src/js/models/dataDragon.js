import m from "mithril";

import { league } from "./league";
import { auth } from "./auth";

import { leagueLive } from "./../views/league_live";

const ddragon = {
    championImgs: [],
    statusChampion: null,
    statusSpells: null,
    statusRotationChampions: null,
    statusMasterychamps: null,
    championsList: async () => {
        var url;
        url = encodeURIComponent(
            `https://ddragon.leagueoflegends.com/cdn/${auth.patch}/data/en_US/champion.json?${auth.apiKey}`
        );

        if (!localStorage.getItem("championsList")) {
            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    localStorage.setItem("championsList", JSON.stringify(res));
                });
        }

        Object.values(JSON.parse(localStorage.getItem("championsList")).data).map(champion => {
            league.ChampList.push(champion);
        });
    },

    summonerSpellsList: async () => {
        console.log("SUMMONERSPELLS START");
        var url;
        url = encodeURIComponent(
            `https://ddragon.leagueoflegends.com/cdn/${auth.patch}/data/en_US/summoner.json?${auth.apiKey}`
        );

        if (!localStorage.getItem("summonerSpellsList")) {
            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    console.log("request sent");
                    localStorage.setItem("summonerSpellsList", JSON.stringify(res));
                });
        }

        Object.values(JSON.parse(localStorage.getItem("summonerSpellsList")).data).map(spell => {
            league.sumSpellsList.push(spell);
        });

        ddragon.statusSpells = 200;
        console.log("SUMMONERSPELLS END");
    },

    imageName: champ => {
        var champName;

        if (Number.isInteger(champ)) {
            try {
                champName = league.ChampList.find(char => char.key === champ.toString()).id;
            } catch (e) {
                console.log("error: ", e.message);
                champName = "unknown";
            } finally {
                return champName;
            }
        } else {
            try {
                champName = league.ChampList.find(char => char.key === champ.toString()).id;
            } catch (e) {
                console.log("error: ", e.message);
                champName = "unknown";
            } finally {
                return champName;
            }
        }
    },

    // imageName: champ => {
    //     var champName;
    //     try {
    //         champName = league.ChampList.find(char => char.key === champ.toString()).id;
    //     } catch (e) {
    //         console.log(e.message);
    //         champName = "unknown";
    //     } finally {
    //         return champName;
    //     }
    // },

    PreloadMasteryChampions: () => {
        Object.values(league.acc.masteries).map(champ => {
            var champName;
            var champImgUrl;

            try {
                champName = league.ChampList.find(char => char.key === champ.championId.toString())
                    .id;
                champImgUrl = `http://ddragon.leagueoflegends.com/cdn/${auth.patch}/img/champion/${champName}.png`;
            } catch (e) {
                champImgUrl = "img/placeholder.png";
            } finally {
                if (!ddragon.championImgs.find(champion => champion.name === champName)) {
                    ddragon.championImgs.push({
                        name: champName,
                        url: champImgUrl,
                    });
                }
            }
        });

        ddragon.statusMasterychamps = 200;
    },

    PreloadRotationChampionImageUrl: () => {
        Object.values(league.rotation.freeChampionIds).map(champ => {
            var champName;
            var champImgUrl;

            try {
                champName = ddragon.imageName(champ);
                champImgUrl = `http://ddragon.leagueoflegends.com/cdn/${auth.patch}/img/champion/${champName}.png`;
            } catch (e) {
                console.log("catch");
                champImgUrl = "img/placeholder.png";
            } finally {
                console.log("finally");
                // console.log(ddragon.championImgs);

                if (!ddragon.championImgs.find(champion => champion.name === champName)) {
                    console.log("push");
                    ddragon.championImgs.push({
                        name: champName,
                        url: champImgUrl,
                    });
                }
            }
        });

        console.log("-----NEXT ROT-----");

        Object.values(league.rotation.freeChampionIdsForNewPlayers).map(champ => {
            var champName;
            var champImgUrl;

            try {
                champName = ddragon.imageName(champ);
                champImgUrl = `http://ddragon.leagueoflegends.com/cdn/${auth.patch}/img/champion/${champName}.png`;
            } catch (e) {
                console.log("catch");
                champImgUrl = "img/placeholder.png";
            } finally {
                console.log("finally");
                // console.log(ddragon.championImgs);

                if (!ddragon.championImgs.find(champion => champion.name === champName)) {
                    console.log("push");
                    ddragon.championImgs.push({
                        name: champName,
                        url: champImgUrl,
                    });
                }
            }
        });

        ddragon.statusRotationChampions = 200;
        console.log(ddragon.statusRotationChampions);
    },

    preloadChampionImgUrl: async () => {
        console.log("PRELOAD CHAMPIONURLS START");

        Object.keys(league.liveGame.participants).map(player => {
            var champName;
            var champImgUrl;
            try {
                champName = leagueLive.playerChampion(player);
                champImgUrl = `http://ddragon.leagueoflegends.com/cdn/${auth.patch}/img/champion/${champName}.png`;
            } catch (e) {
                champImgUrl = "img/placeholder.png";
            } finally {
                if (!ddragon.championImgs.find(champion => champion.name === champName)) {
                    ddragon.championImgs.push({
                        name: champName,
                        url: champImgUrl,
                    });
                }
            }
        });
        ddragon.statusChampion = 200;
        console.log("PRELOAD CHAMPIONURLS END");
    },

    imageUrl: champ => {
        var url = "img/placeholder.png";
        if (!(ddragon.imageName(champ) === "unknown")) {
            url = `http://ddragon.leagueoflegends.com/cdn/${
                auth.patch
            }/img/champion/${ddragon.imageName(champ)}.png`;
        }

        return url;
    },

    imageUrlV2: champ => {
        return ddragon.championImgs.find(champion => champion.name === ddragon.imageName(champ))
            .url;
    },
};

export { ddragon };
