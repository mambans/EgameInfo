import m from "mithril";

import { auth } from "./auth";

const league = {
    acc: null,
    liveGame: null,
    featuredGames: null,
    ChampList: [],
    sumSpellsList: [],
    error: "",
    offlineRender: false,
    refreshLive: 20 * 60 * 1000, // Change first value (in minutes)
    refreshAcc: 60 * 60 * 1000,
    refreshRotation: 60 * 60 * 1000,
    refreshFeatured: 20 * 60 * 1000,
    search: async name => {
        if (auth.networkState === "none" && localStorage.getItem(name)) {
            league.acc = JSON.parse(localStorage.getItem(name));
            league.offlineRender = true;
            m.route.set("/league/acc/:name", { name: league.acc.name });
        } else if (auth.networkState === "none") {
            league.offlineRender = false;
            m.route.set("/league/acc/:name", { name: "unknown" });
        } else {
            league.offlineRender = false;
            try {
                var url;

                url = encodeURIComponent(
                    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${auth.apiKey}`
                );

                if (
                    new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-date`)) >=
                        league.refreshAcc ||
                    !JSON.parse(localStorage.getItem(`${name}-date`)) ||
                    !localStorage.getItem(name)
                ) {
                    await m
                        .request({
                            method: "GET",
                            url: auth.proxy + url,
                        })
                        .then(res => {
                            localStorage.setItem(
                                `${name}-date`,
                                JSON.stringify(new Date().getTime())
                            );
                            localStorage.setItem(name, JSON.stringify(res));
                        });
                }

                league.acc = JSON.parse(localStorage.getItem(name));

                url = encodeURIComponent(
                    `https://euw1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${league.acc.id}?${auth.apiKey}`
                );

                localStorage.getItem(`${name}-TotalMastery`)
                    ? JSON.parse(localStorage.getItem(`${name}-TotalMastery`))
                    : await m
                          .request({
                              method: "GET",
                              url: auth.proxy + url,
                          })
                          .then(res => {
                              localStorage.setItem(`${name}-TotalMastery`, JSON.stringify(res));
                          });

                league.acc.totalMastery = JSON.parse(localStorage.getItem(`${name}-TotalMastery`));
                m.route.set("/league/acc/:name", { name: league.acc.name });
            } catch (e) {
                console.log("Error", e);
            }
        }
    },

    live: async name => {
        if (auth.networkState === "none" && localStorage.getItem(`${name}-live`)) {
            liveAcc = JSON.parse(localStorage.getItem(name)).id;
            league.liveGame = JSON.parse(localStorage.getItem(`${name}-live`));
            league.offlineRender = true;
            m.route.set("/league/live/:name", { name: liveAcc });
        } else if (auth.networkState === "none") {
            m.route.set("/league/live/:name", { name: "unknown" });
        } else {
            league.offlineRender = false;
            try {
                var url;
                var liveAcc;

                url = encodeURIComponent(
                    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${auth.apiKey}`
                );

                if (
                    (new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-date`)) >=
                        league.refreshAcc) |
                        !localStorage.getItem(`${name}-date`) ||
                    !localStorage.getItem(name)
                ) {
                    await m
                        .request({
                            method: "GET",
                            url: auth.proxy + url,
                        })
                        .then(res => {
                            localStorage.setItem(
                                `${name}-date`,
                                JSON.stringify(new Date().getTime())
                            );
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
                        JSON.parse(
                            localStorage.getItem(localStorage.getItem(`${name}-live-date`))
                        ) >=
                        league.refreshLive ||
                    !localStorage.getItem(`${name}-live-date`) ||
                    !localStorage.getItem(`${name}-live`)
                ) {
                    await m
                        .request({
                            method: "GET",
                            url: auth.proxy + url,
                        })
                        .then(res => {
                            localStorage.setItem(`${name}-live`, JSON.stringify(res));
                            localStorage.setItem(
                                `${name}-live-date`,
                                JSON.stringify(new Date().getTime())
                            );
                        })
                        .catch(e => {
                            console.log("Error", e);
                            league.error = e.message;
                        });
                }

                league.liveGame = JSON.parse(localStorage.getItem(`${name}-live`));
                m.route.set("/league/live/:name", { name: liveAcc });
            } catch (e) {
                console.log("Error", e);
            }
        }
    },

    allMasteries: async () => {
        if (auth.networkState === "none" && localStorage.getItem(`${name}-mast`)) {
            league.acc.masteries = JSON.parse(localStorage.getItem(`${name}-mast`));
        } else {
            try {
                var name = league.acc.name;
                var url;

                url = encodeURIComponent(
                    `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${league.acc.id}?${auth.apiKey}`
                );

                if (
                    new Date().getTime() - JSON.parse(localStorage.getItem(`${name}-mast-date`)) >=
                        league.refreshAcc ||
                    !JSON.parse(localStorage.getItem(`${name}-mast-date`)) ||
                    !localStorage.getItem(`${name}-mast`)
                ) {
                    await m
                        .request({
                            method: "GET",
                            url: auth.proxy + url,
                        })
                        .then(res => {
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
            } catch (e) {
                console.log("Error", e);
            }
        }
    },

    champRotation: async () => {
        console.log("champRotation");

        var url;

        url = encodeURIComponent(
            `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?${auth.apiKey}`
        );

        if (auth.networkState === "none") {
            console.log("NO CONNECTION");
            try {
                league.rotation = JSON.parse(localStorage.getItem("currentRotation"));
            } catch (e) {
                console.log(e.title);
            }
        } else if (
            new Date().getTime() - JSON.parse(localStorage.getItem("currentRotation-date")) >=
                league.refreshRotation ||
            !JSON.parse(localStorage.getItem("currentRotation-date")) ||
            !localStorage.getItem("currentRotation")
        ) {
            console.log("33");

            await m
                .request({
                    method: "GET",
                    url: auth.proxy + url,
                })
                .then(res => {
                    console.log("44");
                    localStorage.setItem("currentRotation", JSON.stringify(res));
                    localStorage.setItem(
                        "currentRotation-date",
                        JSON.stringify(new Date().getTime())
                    );
                    league.rotation = JSON.parse(localStorage.getItem("currentRotation"));
                });
            console.log("55");
            league.rotation = JSON.parse(localStorage.getItem("currentRotation"));
        }
    },

    featuredGamesSearch: async () => {
        if (auth.networkState === "none") {
            league.featuredGames = JSON.parse(localStorage.getItem("featuredGames"));
        } else {
            var url;

            url = encodeURIComponent(
                `https://euw1.api.riotgames.com/lol/spectator/v4/featured-games?${auth.apiKey}`
            );

            if (
                new Date().getTime() - JSON.parse(localStorage.getItem("featuredGames-date")) >=
                    league.refreshFeatured ||
                !localStorage.getItem("featuredGames-date") ||
                !localStorage.getItem("featuredGames")
            ) {
                await m
                    .request({
                        method: "GET",
                        url: auth.proxy + url,
                    })
                    .then(res => {
                        localStorage.setItem("featuredGames", JSON.stringify(res));
                        localStorage.setItem(
                            "featuredGames-date",
                            JSON.stringify(new Date().getTime())
                        );
                    });
            }

            league.featuredGames = JSON.parse(localStorage.getItem("featuredGames"));
        }
    },
};

export { league };
