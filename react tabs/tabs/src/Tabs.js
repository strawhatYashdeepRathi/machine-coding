import React, { useState } from "react";
import Containers from "./Tab";

export default function Tabs() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChaqnge = (idx) => {
    setCurrentTab(idx)
  }

  return (
    <div>
      <Containers value={currentTab} onchange={handleChaqnge}>
        <Containers.Head>
          <Containers.Ele label="Tab1" idx={0}/>
          <Containers.Ele label="Tab2" idx={1}/>
          <Containers.Ele label="Tab3" idx={2}/>
        </Containers.Head>
        <Containers.Bod>
          <Containers.Parah data="i am the data in Tab 1" idx={0}/>
          <Containers.Parah data="i am the data in Tab 2" idx={1}/>
          <Containers.Parah data="i am the data in Tab 3" idx={2}/>
        </Containers.Bod>
      </Containers>
    </div>
  );
}


