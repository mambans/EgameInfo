"use strict";

import m from "mithril";

const layout = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    view: function(vnode) {
        return m.fragment({}, [
            <nav className="navbar bottom-nav">
                <a
                    id="logo"
                    onclick={() => {
                        m.route.set("/home", {});
                    }}>
                    EGameInfo
                </a>
                <nav className="btn-div navigation">
                    <a
                        onclick={() => {
                            m.route.set("/home", {});
                        }}>
                        <i className="material-icons">home</i>
                        <span className="icon-text">Home</span>
                    </a>

                    <a
                        onclick={() => {
                            m.route.set("/league/acc", {});
                        }}>
                        <i className="material-icons">search</i>
                        <span className="icon-text">Acc</span>
                    </a>
                    <a
                        onclick={() => {
                            m.route.set("/league/live", {});
                        }}>
                        <i className="material-icons">desktop_windows</i>
                        <span className="icon-text">Live</span>
                    </a>
                    <a
                        onclick={() => {
                            m.route.set("/league/rotation", {});
                        }}>
                        <i className="material-icons">rotate_right</i>
                        <span className="icon-text">Rotation</span>
                    </a>
                    <a
                        onclick={() => {
                            m.route.set("/league/featured", {});
                        }}>
                        <i className="material-icons">featured_play_list</i>
                        <span className="icon-text">Featured Games</span>
                    </a>
                </nav>
            </nav>,
            <main>{vnode.children}</main>,
        ]);
    },
};

export { layout };
