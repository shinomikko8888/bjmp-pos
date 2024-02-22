import React, {useState, useEffect} from "react";
import '../../styles/dashboard-page/tabs.css';

export default function Tabs({tabs, tabName, activeTab, setActiveTab, funcGroup}){

    useEffect(() => {
            funcGroup && funcGroup.forEach(func => func());
      }, [activeTab]);
    return(
        <>
            <div className='row' style={{}}>
            <div className='col-5 d-flex justify-content-start tabs'>
            {tabs && tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={activeTab === tab.id ? 'tab tab-active' : 'tab'}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            </div>
        </>
    );
}