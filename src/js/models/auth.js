"use strict";

import m from "mithril";
import { league } from "./league";

const auth = {
    patch: "9.13.1",
    manualPatch: "9.12.1",
    apiKey: "api_key=RGAPI-7562b30e-2f35-4dfd-87d7-1e742a3ca2dd",
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
                localStorage.setItem("patche", JSON.stringify(res));
                localStorage.setItem("patche-date", JSON.stringify(new Date().getTime()));
                auth.patch = JSON.parse(localStorage.getItem("patche")).patches.pop().name + ".1";
            });
    },
};

export { auth };
