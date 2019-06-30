"use strict";

import m from "mithril";
import { league } from "./league";

const auth = {
    patch: "",
    panualPatch: "9.12.1",
    apiKey: "api_key=RGAPI-0b9a858f-009f-499a-b1f8-a7394e0cb0b1",
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
                console.log("request sent");

                localStorage.setItem("patches", JSON.stringify(res));
                localStorage.setItem("patches-date", JSON.stringify(new Date().getTime()));
                auth.patch = JSON.parse(localStorage.getItem("patches")).patches.pop().name + ".1";
                console.log(JSON.parse(localStorage.getItem("patches")));
                console.log("TCL: auth.patch", auth.patch);
            });
    },
};

export { auth };
