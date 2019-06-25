"use strict";

import m from "mithril";

const home = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    view: function() {
        return [
            m("div.title", m("h1", "Home")),
            m(
                "div.main-container slide-in",
                m(
                    "div.body-container",
                    m(
                        "p.welcome-msg",
                        "Search information about League of Legends \n ",
                        "accounts or live/active games."
                    )
                )
            ),
        ];
    },
};

export { home };
