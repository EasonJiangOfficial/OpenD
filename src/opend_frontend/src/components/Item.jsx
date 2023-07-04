import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend_backend } from "../../../declarations/opend_backend/index";
import { nft } from "../../../declarations/nft/index";

function Item(props) {
  const [nftName, setName] = useState("");
  const [nftId, setId] = useState("");
  const [nftimg, setImg] = useState("");
  const [button, setButton] = useState("");
  const [priceInput, setPrice] = useState("");
  const [isHiddenLoader, setHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [listed, setListed] = useState("");

  const id = props.id;
  const localhost = "http://localhost:8080";

  const agent = new HttpAgent({ host: localhost });
  let NFTActor;
  agent.fetchRootKey();

  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    setName(name);

    const owner = await NFTActor.getOwner();
    setId(owner.toText());

    const image = await NFTActor.getAsset();
    const imageContent = new Uint8Array(image);
    const imageUrl = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );
    setImg(imageUrl);
    const nftIsListed = await opend_backend.isListed(id);
    console.log(nftIsListed);

    if (nftIsListed){
      setId("OpenD")
      setBlur({filter:"blur(4px)"});
      setListed("listed");
    } else{
      setButton(<Button title="Sell" handleClick={handleSell} />);
    }
    
  }

  let price;
  function handleSell() {
    setPrice(
      <input
        placeholder="Price in DANG"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => {
          price = e.target.value;
        }}
      />
    );

    setButton(<Button title="Confirm" handleClick={sellItem} />);
    
  }
  useEffect(() => {
    loadNFT();
  }, []);

  async function sellItem() {
    setBlur({filter:"blur(4px)"})
    setHidden(false);
    const listingResult = await opend_backend.listItem(id, Number(price));
    console.log(listingResult);
    if (listingResult == "listing Success") {
      const openDID = await opend_backend.getOpenDCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDID);
      console.log(transferResult);

      if(transferResult == "transfer success"){
        setHidden(true);    
        setButton();
        setPrice();
        setId("OpenD");
        setListed("listed");
      }
      
    }
    
  }

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={nftimg}
          style={blur}
        />
        <div hidden={isHiddenLoader} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {nftName}
            <span className="purple-text"> {listed}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {nftId}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
