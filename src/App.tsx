/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./App.css";
import { Cas1, Cas2, Cas3, Cas4 } from "./components/rerenderToFix";
import {
  UselessDOMUpdate1,
  AlternatingChildren,
  ParentChanging,
  ListWithUpdate,
} from "./components/DOMUpdateToFix";

//Insère le composant du cas que tu veux tester
function App() {
  return (
    <div className="App">
      <Cas1 />
    </div>
  );
}

export default App;
