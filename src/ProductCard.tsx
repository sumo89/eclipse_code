import { useEffect } from "react";
import "./ProductCardStyle.css";
import starImage from "./star-image-2.png";
import truckImage from "./truck-vector.png";
import tickImage from "./tick-vector.png";
import cartImage from "./cart-icon.png";

const logItem = (itemId: number, itemPrice: number) => {
  console.log("> itemId ", itemId);
  console.log("> itemPrice ", itemPrice);
};

export function ProductCard(props: any) {
  console.log("props", props);
  let productInfo = props.info,
    productTitle = productInfo.title,
    productDesc = productInfo.description,
    productPrice = productInfo.price,
    productDiscount = productInfo.discountPercentage,
    productPriceLessDiscount =
      productPrice - productPrice * (productDiscount / 100),
    productRating = productInfo.rating,
    productId = productInfo.id,
    productStock = productInfo.stock,
    productImage = productInfo.image,
    productIsRecommended = false;

  const backgroundImageStyle = {
    backgroundImage: `url(${productImage})`,
  };

  let stockText = "In Stock",
    stockBarStyle = {
      width: "100%",
      backgroundColor: "#27AE60",
    };

  if (productStock < 10) {
    stockText = "Last Few Left";
    stockBarStyle = {
      width: "20%",
      backgroundColor: "#ed143d",
    };
  }

  if (productRating > 4.5) {
    productIsRecommended = true;
  }

  return (
    <div
      className="product-card"
      style={
        productIsRecommended
          ? {
              borderColor: "#000",
              boxShadow: "0 0px 10px rgba(230, 21, 119, 0.7)",
            }
          : { border: "none", boxShadow: "0 0px 10px rgba(0, 0, 0, 0.4)" }
      }
    >
      <div className="image-wrap">
        <div className="image-wrap_image" style={backgroundImageStyle}></div>
        <div
          className="image-wrap_recommended"
          style={productIsRecommended ? {} : { visibility: "hidden" }}
        >
          Eclipse recommended
        </div>
      </div>
      <div className="info-wrap">
        <h1 className="info-wrap_title">{productTitle}</h1>
        <div className="info-wrap_reviews">
          <img
            className="info-wrap_reviews_star"
            src={starImage}
            alt="star-image"
          />
          <img
            className="info-wrap_reviews_star"
            src={starImage}
            alt="star-image"
          />
          <img
            className="info-wrap_reviews_star"
            src={starImage}
            alt="star-image"
          />
          <img
            className="info-wrap_reviews_star"
            src={starImage}
            alt="star-image"
          />
          <img
            className="info-wrap_reviews_star"
            src={starImage}
            alt="star-image"
          />
          <p className="info-wrap_reviews_text">52 Reviews</p>
        </div>
        <p className="info-wrap_description">{productDesc}</p>
      </div>
      <div className="price-wrap">
        <p className="price-wrap_original-price">RRP £{productPrice}</p>
        <h2
          className="price-wrap_headline-price"
          style={
            productIsRecommended ? { color: "#ed143d" } : { color: "#333" }
          }
        >
          £{productPriceLessDiscount.toFixed(2)}
        </h2>
        <p className="price-wrap_saving">
          Save £{(productPrice - productPriceLessDiscount).toFixed(2)}
        </p>
        <div className="price-wrap_stock-bar">
          <div
            className="price-wrap_stock-bar-overlay"
            style={stockBarStyle}
          ></div>
        </div>
        <div className="price-wrap_stock-text">{stockText}</div>
        <div className="price-wrap_order-wrap">
          <div className="price-wrap_order-wrap_date price-wrap_order-wrap_item">
            <img src={truckImage}></img>
            <h5>Order in the next XX:XX:XX for delivery on the 3rd March</h5>
          </div>
          <div className="price-wrap_order-wrap_delivery price-wrap_order-wrap_item">
            <img className="price-wrap_order-wrap_tick" src={tickImage}></img>
            <h5>FREE UK delivery</h5>
          </div>
          <div className="price-wrap_order-wrap_credit price-wrap_order-wrap_item">
            <img className="price-wrap_order-wrap_tick" src={tickImage}></img>
            <h5>PayPayl credit available</h5>
          </div>
        </div>
        <div
          className="price-wrap_button"
          onClick={() => {
            logItem(productId, productPriceLessDiscount);
          }}
        >
          <img src={cartImage} className="price-wrap_button_icon"></img>
          <p className="price-wrap_button_text">ADD TO BASKET</p>
        </div>
      </div>
    </div>
  );
}
