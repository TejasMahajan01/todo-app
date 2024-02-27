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

  const [showCompleted, setShowCompleted] = useState(() =>
    JSON.parse(getStoredData("showCompleted", false))
  );

  // Define placeholderItems state and setter function
  const [placeholderItems, setPlaceholderItems] = useState(0);

  useEffect(() => {
    setStoredData("incompleteTodos", JSON.stringify(incompleteTodos));
    updatePlaceholderItems();
  }, [incompleteTodos]);

  useEffect(() => {
    setStoredData("completeTodos", JSON.stringify(completeTodos));
    updatePlaceholderItems();
  }, [completeTodos]);

  useEffect(() => {
    setStoredData("showCompleted", JSON.stringify(showCompleted));
    updatePlaceholderItems();
  }, [showCompleted]);

  // Recalculate placeholder items whenever content renders
  useLayoutEffect(() => {
    updatePlaceholderItems();
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      updatePlaceholderItems();
    }, 200); // Adjust the delay as needed

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function updatePlaceholderItems() {
    const windowHeight = window.innerHeight;
    const headerHeight = document
      .querySelector("header")
      .getBoundingClientRect().height;
    const footerHeight = document
      .querySelector("footer")
      .getBoundingClientRect().height;
    const mainHeight = document
      .querySelector("main")
      .getBoundingClientRect().height;

    const computedPlaceholders = Math.floor(
      (windowHeight - headerHeight - footerHeight - mainHeight) / 50
    );

    setPlaceholderItems(Math.max(computedPlaceholders, 0)); // Ensuring the value is not negative
  }

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  return (
    <>
      <Header />
      <MainContainer
        incompleteTodos={incompleteTodos}
        setIncompleteTodos={setIncompleteTodos}
        completeTodos={completeTodos}
        setCompleteTodos={setCompleteTodos}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <PlaceholderContainer placeholderItems={placeholderItems} />
      <Footer setIncompleteTodos={setIncompleteTodos} />
    </>
  );
}
