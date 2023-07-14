import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { HashRouter, Link, Switch, Route, useLocation } from "react-router-dom";
import homeImage from "../../assets/home-img.png";
import Minter from "./Minter";
import Gallery from "./Gallery";
import { opend_backend } from "../../../declarations/opend_backend";
import CURRENT_USER_ID from "../index";

function Routes() {
  const [userOwnedGallery, setOwnedGallery] = useState("");
  const [listingGallery, setListingGallery] = useState("");
  const location = useLocation();

  async function getNFTs() {
    const userNFTIds = await opend_backend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTIds);

    const listedNFTIds = await opend_backend.getListedNFTs();
    console.log(listedNFTIds);

    setListingGallery(<Gallery title="Discover" ids={listedNFTIds} role = "discover"/>);

    setOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} role="collection"/>);
  }

  useEffect(() => {
    getNFTs();
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/">
        <img className="bottom-space" src={homeImage} />
      </Route>
      <Route path="/discover">{listingGallery}</Route>
      <Route path="/minter">
        <Minter />
      </Route>
      <Route path="/collection">{userOwnedGallery}</Route>
    </Switch>
  );
}

export default Routes