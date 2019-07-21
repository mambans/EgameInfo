import m from "mithril";

import { league } from "../models/league";
import { auth } from "../models/auth";

const ddragon = {
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
    },

    imageName: champ => {
        var champName;
        try {
            champName = league.ChampList.find(char => char.key === champ.toString()).id;
        } catch (e) {
            console.log(e.message);
            champName = "unknown";
        } finally {
            return champName;
        }
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
};

export { ddragon };
