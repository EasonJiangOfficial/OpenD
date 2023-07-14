import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { HashRouter, Link, Switch, Route, useLocation } from "react-router-dom";
import homeImage from "../../assets/home-img.png";
import Minter from "./Minter";
import Gallery from "./Gallery";
import { opend_backend } from "../../../declarations/opend_backend";
import CURRENT_USER_ID from "../index";
import Routes from "./Routes";

function Header() {
  return (
    <HashRouter>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img className="header-logo-11" src={logo} />
            <div className="header-vertical-9"></div>
            <Link to="/">
              <h5 className="Typography-root header-logo-text">OpenD</h5>
            </Link>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <Link to="/discover">
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                Discover
              </button>
            </Link>
            <Link to="/minter">
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                Minter
              </button>
            </Link>
            <Link to="/collection">
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                My NFTs
              </button>
            </Link>
          </div>
        </header>
      </div>
      <Routes />
    </HashRouter>
  );
}

export default Header;
