"use strict";

import m from "mithril";
import { league } from "./league";

const auth = {
    networkState: null,
    patch: "9.13.1",
    manualPatch: "9.12.1",
    apiKey: "api_key=RGAPI-f3d95166-5813-495b-929c-9d60499d6f75",
    proxy:
        "http://www.student.bth.se/~ropb16/dbwebb-kurser/webapp/me/kmom10/proj/www/proxy.php?url=",

    latestVersion: async () => {
        var url;
        url = encodeURIComponent(
            `https://raw.githubusercontent.com/CommunityDragon/Data/master/patches.json`
        );

        await m
            .request({
                method: "GET",
                url: auth.proxy + url,
            })
            .then(res => {
                localStorage.setItem("patch", JSON.stringify(res));
                localStorage.setItem("patch-date", JSON.stringify(new Date().getTime()));
                auth.patch = JSON.parse(localStorage.getItem("patch")).patches.pop().name + ".1";
            });
    },
};

export { auth };
