"use client"

import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      let response;
      if (input !== undefined) {
        response = await run(input);
      } else {
        response = await run(input);
      }

      let responseArray = response.split("**");
      let newResponse = ""; // Initialize as an empty string

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<br>" + "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("");
      let newResponseArray = newResponse2.split(" ");
      
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setLoading(false);
      setInput("");
    } catch (error) {
      setResultData(error.message);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    showResult,
    loading,
    input,
    setInput,
    resultData,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
