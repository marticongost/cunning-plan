import React from 'react';
import './App.css';
import {Tabs, Tab} from './Tabs';

function App() {
  return (
    <div className="App">
      <h1 className="App-heading">Cunning plan</h1>
      <Tabs>
        <Tab name="attack-infantry" title="Atac a infanteria">
          Ataaaac
        </Tab>
        <Tab name="attack-vehicle" title="Atac a vehicles">
          Catacroc
        </Tab>
        <Tab name="attack-close-quarters" title="Atac cos a cos">
          Zaaap
        </Tab>
        <Tab name="shock" title="Xoc">
          Oghhh
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
