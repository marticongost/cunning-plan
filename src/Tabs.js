import React, { useState } from 'react';
import './Tabs.css';

export function Tabs(props) {

    const [visibleTab, setVisibleTab] = useState(
        props.visibleTab
        || (props.children && props.children[0] && props.children[0].props.name)
    );

    if (!props.children || !props.children.length) {
        return null;
    }

    const getTabState = (
        (tab) => tab.props.name === visibleTab ? 'visible' : 'hidden'
    );

    return (
        <div className="Tabs">
            <ul className="Tabs-strip">
                {props.children.map((tab, index) =>
                    <li key={tab.props.name}>
                        <TabButton
                            index={index}
                            name={tab.props.name}
                            state={getTabState(tab)}
                            title={tab.props.title}
                            setVisibleTab={setVisibleTab}/>
                    </li>
                )}
            </ul>
            <div className="Tabs-container">
                {props.children.map(tab =>
                    React.cloneElement(tab, {key: tab.props.name, state: getTabState(tab)})
                )}
            </div>
        </div>
    );
}

export function TabButton(props) {

    function handleClick(e) {
        props.setVisibleTab(props.name);
    }

    return (
        <button
            className="TabButton"
            type="button"
            data-tab-state={props.state}
            onClick={handleClick}>
            {props.title}
        </button>
    );
}

export function Tab(props) {
    return (
        <div className="Tab" data-tab-state={props.state}>
            {props.children}
        </div>
    );
}
