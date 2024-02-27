import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainContainer from "./Components/MainContainer";
import PlaceholderContainer from "./Components/PlaceholderContainer";
import { getStoredData, setStoredData } from "./utils";

export default function App() {
  const [incompleteTodos, setIncompleteTodos] = useState(() =>
    JSON.parse(getStoredData("incompleteTodos", "[]"))
  );

  const [completeTodos, setCompleteTodos] = useState(() =>
    JSON.parse(getStoredData("completeTodos", "[]"))
  );

  const [placeholderItems, setPlaceholderItems] = useState(0);

  // Recalculate placeholder items whenever content renders
  useLayoutEffect(() => {
    updatePlaceholderItems();
  }, []);

  useEffect(() => {
    setStoredData("incompleteTodos", JSON.stringify(incompleteTodos));
    updatePlaceholderItems();
  }, [incompleteTodos]);

  useEffect(() => {
    setStoredData("completeTodos", JSON.stringify(completeTodos));
    updatePlaceholderItems();
  }, [completeTodos]);

  // Recalculate placeholder items whenever window resizes
  useEffect(() => {
    const handleResize = () => {
      updatePlaceholderItems();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function updatePlaceholderItems() {
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;
    const mainHeight = document.querySelector("main").offsetHeight;

    const computedPlaceholders = Math.floor(
      (windowHeight - headerHeight - footerHeight - mainHeight) / 50
    );

    if (computedPlaceholders > 0) {
      setPlaceholderItems(computedPlaceholders);
    }
  }

  return (
    <>
      <Header />
      <MainContainer
        incompleteTodos={incompleteTodos}
        completeTodos={completeTodos}
        setIncompleteTodos={setIncompleteTodos}
        setCompleteTodos={setCompleteTodos}
        getStoredData={getStoredData}
        setStoredData={setStoredData}
        updatePlaceholderItems={updatePlaceholderItems}
      />
      <PlaceholderContainer placeholderItems={placeholderItems} />
      <Footer setIncompleteTodos={setIncompleteTodos} />
    </>
  );
}
