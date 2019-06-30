"use strict";

import m from "mithril";
import "../style.scss";

import { layout } from "./views/layout.js";
import { home } from "./views/home.js";
import { leagueAccSearch } from "./views/league_acc_search.js";
import { leagueLive } from "./views/league_live.js";
import { leagueLiveSearch } from "./views/league_live_search.js";
import { league_acc } from "./views/league_acc_info";
import { champRotation } from "./views/championRotation";
import { featuredGames } from "./views/featured_games";
import { league } from "./models/league";
import { auth } from "./models/auth";

var app = {
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        console.log("Device is ready!");
        league.championsList();
        league.summonerSpellsList();
        auth.latestVersion();
        m.route(document.body, "/", {
            "/": {
                render: function() {
                    return m(layout, m(home));
                },
            },
            "/home": {
                render: function() {
                    return m(layout, m(home));
                },
            },
            "/league/acc": {
                render: function() {
                    return m(layout, m(leagueAccSearch));
                },
            },
            "/league/acc/:name": {
                render: function(vnode) {
                    return m(layout, m(league_acc, vnode.attrs));
                },
            },
            "/league/live": {
                render: () => {
                    return m(layout, m(leagueLiveSearch));
                },
            },
            "/league/live/:name": {
                render: vnode => {
                    return m(layout, m(leagueLive, vnode.attrs));
                },
            },
            "/league/rotation": {
                render: () => {
                    return m(layout, m(champRotation));
                },
            },
            "/league/featured": {
                render: () => {
                    return m(layout, m(featuredGames));
                },
            },
        });
    },
};

app.initialize();
