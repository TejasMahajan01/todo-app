import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainContainer from "./Components/MainContainer";

export default function App() {
  const [incompleteTodos, setIncompleteTodos] = useState(() =>
    JSON.parse(getStoredData("incompleteTodos", "[]"))
  );

  const [completeTodos, setCompleteTodos] = useState(() =>
    JSON.parse(getStoredData("completeTodos", "[]"))
  );

  useEffect(() => {
    setStoredData("incompleteTodos", JSON.stringify(incompleteTodos));
  }, [incompleteTodos]);

  useEffect(() => {
    setStoredData("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

  function getStoredData(keyName, defaultValue) {
    return localStorage.getItem(keyName) || defaultValue;
  }

  function setStoredData(keyName, dataValue) {
    localStorage.setItem(keyName, dataValue);
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
      />
      <Footer setIncompleteTodos={setIncompleteTodos} />
    </>
  );
}
