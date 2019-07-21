"use strict";

import m from "mithril";
import { league } from "../models/league";

const leagueLiveSearch = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            vnode.dom.addEventListener("animationend", resolve);
        });
    },
    // oninit: () => {
    //     league.live();
    // },
    valid: true,
    name: "",
    view: vnode => {
        return m.fragment({}, [
            <div className="title">
                <h1>Search live game</h1>
            </div>,
            <div className="main-container slide-in">
                <div class="body-container">
                    {!vnode.state.valid && m("p.error", "invalid summoner name")}
                    <form
                        onsubmit={async e => {
                            e.preventDefault();
                            if (vnode.state.valid && vnode.state.name) {
                                await league.live(encodeURI(vnode.state.name.trim()));
                            }
                        }}>
                        <div className="form-group">
                            <label for="name">Summoner Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter a live Summoner name"
                                aria-describedby="summonernameHelp"
                                onchange={e => {
                                    vnode.state.valid = /^[0-9A-Za-z _.]+$/.test(e.target.value);
                                    vnode.state.name = e.target.value;
                                }}></input>
                            <small id="summonernameHelp" className="form-text text-muted">
                                Summoner Name, not Username
                            </small>
                        </div>
                        <input type="submit" Value="Search" className="btn btn-primary">
                            Submit
                        </input>
                    </form>
                </div>
            </div>,
        ]);
    },
};

export { leagueLiveSearch };
