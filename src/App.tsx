import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import "./App.css";
import { ProductCard } from "./ProductCard";

function App() {
  const [cookies, setCookie] = useCookies(["time"]);
  const [shopItems, setShopItems] = useState([]);

  const generaterandomNum = () => {
    let num = Math.random();
    return Math.floor(num * 90);
  };

  const prettifyProductsArray = (filteredProducts: any) => {
    let prettifiedProducts: Array<{
      id: number;
      title: string;
      description: string;
      price: number;
      discountPercentage: number;
      rating: number;
      stock: number;
      image: string;
    }> = [];

    filteredProducts.forEach((item: any) => {
      let newObj = {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        discountPercentage: item.discountPercentage,
        rating: item.rating,
        stock: item.stock,
        image: item.thumbnail,
      };
      prettifiedProducts.push(newObj);
    });
    return prettifiedProducts;
  };

  const timeGreaterThan3Mins = () => {
    let prevTime = cookies["time"];
    let currentTime = Date.now();
    if (currentTime - prevTime > 180000) {
      return true;
    } else return false;
  };

  useEffect(() => {
    if (cookies["time"]) {
      if (timeGreaterThan3Mins()) {
        // if time is greater than 3 mins
        // update products
        // reset time in cookie
        getProducts();
        setCookie("time", Date.now());
      } else {
        // don't update, set state from localstorage
        let savedProducts = JSON.parse(
          localStorage.getItem("shopItems") || "{}"
        );
        setShopItems(savedProducts);
      }
    } else {
      // no cookie, so set one
      getProducts();
      setCookie("time", Date.now());
    }
  }, []);

  const getProducts = () => {
    // get 10 items starting at a random number between 0 and 10
    fetch(`https://dummyjson.com/products?limit=10&skip=${generaterandomNum()}`)
      .then((response) => response.json())
      .then((data: any) => {
        // remove any items in the response that match the brand Apple
        let filteredProducts = data.products.filter((item: any) => {
          return item.brand != "Apple";
        });

        // check if there's now < 10 items after Apple ones removed
        // get new items to fill the gap to 10
        if (filteredProducts.length < 10) {
          fetch(
            `https://dummyjson.com/products?limit=${
              10 - filteredProducts.length
            }&skip=${generaterandomNum()}`
          )
            .then((newResponse) => newResponse.json())
            .then((newData: any) => {
              filteredProducts = filteredProducts.concat(newData.products);
              filteredProducts = prettifyProductsArray(filteredProducts);
              setShopItems(filteredProducts);
            });
        } else {
          filteredProducts = prettifyProductsArray(filteredProducts);
          setShopItems(filteredProducts);
          localStorage.setItem("shopItems", JSON.stringify(filteredProducts));
        }
      });
  };

  // showing: title, description, price, discountpercent, id, rating, stock, 1 image,

  return (
    <div className="container">
      {shopItems.map((data: any) => (
        <ProductCard info={data} key={data.id} />
      ))}
    </div>
  );
}

export default App;
