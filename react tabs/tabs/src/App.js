import { useState } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [activeState, setActive] = useState(0);
  const tabsList = ["Tab1", "Tab2", "Tab3"];

  data.map((item, i)=> {
    console.log(item)
  })

  const handleTab = (i) => {
    setActive(i)
  }

  return (
    <div className="App">
      <div className="head">Tabs Component</div>
      <div className="tabs-Container">
        {tabsList.map((ele, i) => {
          return <div key={i} onClick={() => handleTab(i)} className={i === activeState ? "currTab" : ""}>{ele}</div>;
        })}
      </div>
      <div>
        {data.map((item)=> {
          const test = parseInt(Object.keys(item)[0]);
          if(test === activeState) {
            return <div key={test}>{item[test]}</div>
          }
        })}
      </div>
    </div>
  );
}

export default App;
