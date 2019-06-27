import m from "mithril";

import { auth } from "./auth";

const league = {
    acc: null,
    liveGame: null,
    rotation: null,
    featuredGames: null,
    ChampList: [],
    sumSpellsList: [],
    error: "",
    search: async name => {
        try {
            // if (typeof requests !== "undefined") {
            //     localStorage["requests"] = 1;
            //     console.log(localStorage["requests"]);
            // } else if (localStorage["requests"] < 10) {
            // localStorage["requests"] += 1;

            var url;
            url = encodeURIComponent(
                `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${auth.apiKey}`
            );

            if (
                new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-date`)) >=
                    3600000 ||
                !JSON.parse(localStorage.getItem(`${name}-date`)) ||
                !localStorage.getItem(name)
            ) {
                await m
                    .request({
                        method: "GET",
                        url: auth.proxy + url,
                    })
                    .then(res => {
                        console.log("request sent ACC SEARCH");

                        localStorage.setItem(`${name}-date`, JSON.stringify(new Date().getTime()));
                        localStorage.setItem(name, JSON.stringify(res));
                    });
            }

            league.acc = JSON.parse(localStorage.getItem(name));
            console.log("TCL: league.acc", league.acc);

            url = encodeURIComponent(
                `https://euw1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${league.acc.id}?${auth.apiKey}`
            );

            localStorage.getItem(`${name}-TotalMastery`)
                ? (JSON.parse(localStorage.getItem(`${name}-TotalMastery`)),
                  console.log("localStorage"))
                : await m
                      .request({
                          method: "GET",
                          url: auth.proxy + url,
                      })
                      .then(res => {
                          console.log("request sent MASTERIES");
                          localStorage.setItem(`${name}-TotalMastery`, JSON.stringify(res));
                      });

            league.acc.totalMastery = JSON.parse(localStorage.getItem(`${name}-TotalMastery`));

            m.route.set("/league/acc/:name", { name: league.acc.name });
        } catch (e) {
            console.log("Error", e);
        }
    },

    live: async name => {
        try {
            var url;
            url = encodeURIComponent(
                `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${auth.apiKey}`
            );
            var liveAcc;

            if (
                (new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-date`)) >=
                    3600000) |
                    !localStorage.getItem(`${name}-date`) ||
                !localStorage.getItem(name)
            ) {
                await m
                    .request({
                        method: "GET",
                        url: auth.proxy + url,
                    })
                    .then(res => {
                        console.log("request senttt");

                        localStorage.setItem(`${name}-date`, JSON.stringify(new Date().getTime()));
                        localStorage.setItem(name, JSON.stringify(res));
                    })
                    .catch(e => {
                        console.log("Error", e);
                        league.error = e;
                    });
            }

            liveAcc = JSON.parse(localStorage.getItem(name)).id;

            url = encodeURIComponent(
                `https:/euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${liveAcc}?${auth.apiKey}`
            );

            if (
                new Date().getTime() -
                    JSON.parse(localStorage.getItem(localStorage.getItem(`${name}-live-date`))) >=
                    1800000 ||
                !localStorage.getItem(`${name}-live-date`) ||
                !localStorage.getItem(`${name}-live`)
            ) {
                await m
                    .request({
                        method: "GET",
                        url: auth.proxy + url,
                    })
                    .then(res => {
                        console.log("request sents");

                        localStorage.setItem(`${name}-live`, JSON.stringify(res));
                        localStorage.setItem(
                            `${name}-live-date`,
                            JSON.stringify(new Date().getTime())
                        );
                        // league.liveGame = JSON.parse(localStorage.getItem(`${name}-live`));
                    })
                    .catch(e => {
                        console.log("Error", e);
                        league.error = e.message;
                    });
            }

            league.liveGame = JSON.parse(localStorage.getItem(`${name}-live`));

            // else {
            //     league.liveGame = JSON.parse(localStorage.getItem(`${name}-live`));
            // }

            m.route.set("/league/live/:name", { name: liveAcc });
        } catch (e) {
            console.log("Error", e);
        }
    },

    allMasteries: async () => {
        try {
            var name = league.acc.id;
            var url;
            url = encodeURIComponent(
                `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${league.acc.id}?${auth.apiKey}`
            );

            if (
                new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-mast-date`)) >=
                    3600000 ||
                !JSON.parse(localStorage.getItem(`${name}-mast-date`)) ||
                !localStorage.getItem(`${name}-mast`)
            ) {
                await m
                    .request({
                        method: "GET",
                        url: auth.proxy + url,
                    })
                    .then(res => {
                        console.log("request sent");
                        console.log(localStorage.getItem(`${name}-mast`));

                        localStorage.setItem(`${name}-mast`, JSON.stringify(res));
                        localStorage.setItem(
                            `${name}-mast-date`,
                            JSON.stringify(new Date().getTime())
                        );
                        league.acc.masteries = JSON.parse(localStorage.getItem(`${name}-mast`));
                    });
            } else {
                league.acc.masteries = JSON.parse(localStorage.getItem(`${name}-mast`));
            }
            console.log("TCL: league.acc.masteries", league.acc.masteries);
        } catch (e) {
            console.log("Error", e);
        }
    },

    champRotation: async () => {
        var url;
        url = encodeURIComponent(
            `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?${auth.apiKey}`
        );

        if (
            new Date().getTime() - JSON.parse(localStorage.getItem("currentRotation-date")) >=
                3600000 ||
            !JSON.parse(localStorage.getItem("currentRotation-date")) ||
            !localStorage.getItem("currentRotation")
        ) {
            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    console.log("request sent");

                    localStorage.setItem("currentRotation", JSON.stringify(res));
                    localStorage.setItem(
                        "currentRotation-date",
                        JSON.stringify(new Date().getTime())
                    );
                    league.rotation = JSON.parse(localStorage.getItem("currentRotation"));
                });
        }

        league.rotation = JSON.parse(localStorage.getItem("currentRotation"));

        console.log("TCL: league.rotation ", league.rotation);
    },

    featuredGamesSearch: async () => {
        var url;
        url = encodeURIComponent(
            `https://euw1.api.riotgames.com/lol/spectator/v4/featured-games?${auth.apiKey}`
        );

        if (
            new Date().getTime() - JSON.parse(localStorage.getItem("featuredGames-date")) >=
                1200000 ||
            !localStorage.getItem("featuredGames-date") ||
            !localStorage.getItem("featuredGames")
        ) {
            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    console.log("request sent");

                    localStorage.setItem("featuredGames", JSON.stringify(res));
                    localStorage.setItem(
                        "featuredGames-date",
                        JSON.stringify(new Date().getTime())
                    );
                    league.featuredGames = JSON.parse(localStorage.getItem("featuredGames"));
                });
        }

        league.featuredGames = JSON.parse(localStorage.getItem("featuredGames"));
    },

    championsList: async () => {
        var url;
        url = encodeURIComponent(
            `https://ddragon.leagueoflegends.com/cdn/${auth.lolVersion}/data/en_US/champion.json?${auth.apiKey}`
        );

        if (!localStorage.getItem("championsList")) {
            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    console.log("request sent");

                    localStorage.setItem("championsList", JSON.stringify(res));
                });
        }

        console.log(JSON.parse(localStorage.getItem("championsList")));

        Object.values(JSON.parse(localStorage.getItem("championsList")).data).map(champion => {
            league.ChampList.push(champion);
        });

        console.log("champList: ", league.ChampList);
    },

    summonerSpellsList: async () => {
        var url;
        url = encodeURIComponent(
            `https://ddragon.leagueoflegends.com/cdn/${auth.lolVersion}/data/en_US/summoner.json?${auth.apiKey}`
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

        console.log(JSON.parse(localStorage.getItem("summonerSpellsList")));

        Object.values(JSON.parse(localStorage.getItem("summonerSpellsList")).data).map(spell => {
            league.sumSpellsList.push(spell);
        });

        console.log("sumSpellsList: ", league.sumSpellsList);
    },
};

export { league };
