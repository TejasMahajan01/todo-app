import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const [placeholderItems, setPlaceholderItems] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const textareaRef = useRef(null);

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
    const handleResize = () => {
      updatePlaceholderItems();
      updateTextareaHeight();
    };

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

  function updateTextareaHeight() {
    const { current } = textareaRef;
    if (!current) return; // Ensure textareaRef is valid

    current.style.height = "auto";
    current.style.height = `${current.scrollHeight / 16}rem`;
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
      <Footer
        textareaRef={textareaRef}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputFocus={inputFocus}
        setInputFocus={setInputFocus}
        updateTextareaHeight={updateTextareaHeight}
        setIncompleteTodos={setIncompleteTodos}
      />
    </>
  );
}
