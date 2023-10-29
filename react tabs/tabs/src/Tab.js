import React, { createContext, useContext } from "react";
import "./App.css";

const TabsContext = createContext();

export default function Containers({ children, value, onchange }) {
  return (
    <div>
      <TabsContext.Provider value={{ value, onchange }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

Containers.Head = ({ children }) => {
  return <div className="head-container">{children}</div>;
};

Containers.Ele = ({ idx, label, children }) => {
  // eslint-disable-next-line
  const {value, onchange} = useContext(TabsContext);
  const handleChange = () => {
    onchange?.(idx)
  }
  return <div className={`tabs-btns ${idx === value ? "selected" : ""}`} onClick={handleChange}>{label}</div>;
};

Containers.Bod = ({ children }) => {
  return <div className={"content-container"}>{children}</div>;
};

Containers.Parah = ({ children, idx, data }) => {
  // eslint-disable-next-line
  const {value} = useContext(TabsContext);
  return (idx === value && <div>{data}</div>);
};
