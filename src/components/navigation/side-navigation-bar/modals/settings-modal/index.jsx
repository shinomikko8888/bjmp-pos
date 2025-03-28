import React, { useEffect, useState } from "react";
import Modal from "../../../../modals";
import SidebarButtons from "../../buttons";
import GeneralSettings from "./pages/general-page";
import AccountSettings from "./pages/account-page";
import AboutSettings from "./pages/about-page";
import { fetchDataWrapper, handleChangeWrapper } from "../../../../../utils";
import ConfirmPasswordModal from "./modals/confirm-password";
import { SuccessfulActionModal } from "../../../../modals/util-modals";

export default function SettingsModal(props){
    const {stateControl, stateChecker} = props
    const tabs = [
        { label: "General", id: "general" },
        { label: "Account", id: "account" },
        { label: "About", id: "about"},
      ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [formData, setFormData] = useState({})
    const [isConfirmPassModalOpen, setConfirmPassModalOpen] = useState(false);
    const [confirmFromWhere, setConfirmFromWhere] = useState('');
    const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [spendingLimit, setSpendingLimit] = useState(0);
    const [isLogout, setIsLogout] = useState(false);
    const [action, setAction] = useState({
        title: "",
        description: "",
    })
    const [userType, setUserType] = useState();
    useEffect(() => {
        fetchData()
        fetchUserType();
    }, [stateChecker])
    
    const fetchUserType = async () => {
        try{
            if(localStorage.getItem('user-email')){
                const response = await fetchDataWrapper('get-user', [['em', `'${localStorage.getItem('user-email')}'`]])
                setUserType(response['user-type']);
            }
        } catch (error){
            console.error('Error fetching data: ', error);
        }
    }

    const fetchData = async () => {
        try {
            let params = []
            const bjmpBranch = localStorage.getItem('bjmp-branch');
            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }
            const settingData = await fetchDataWrapper('get-settings', params)
            
            setFormData({
                'spending-limit': settingData['setting-name'] === 'spending-limit' ? settingData['setting-value'] : null,
                'change-email': localStorage.getItem('user-email'),
            })
            setSpendingLimit(settingData['setting-name'] === 'spending-limit' ? settingData['setting-value'] : 0);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }

    }

    const handleChange = async (event) => {
        await handleChangeWrapper(event, formData, setFormData);
    }
    const settingNavButtons = [
        {   
            type: 'Settings',
            tab: () => setActiveTab(tabs[0].id),
            icon: 'fa-solid fa-gears',
            name: 'General',
        },
        {
            type: 'Settings',
            tab: () => setActiveTab(tabs[1].id),
            icon: 'fa-solid fa-user',
            name: 'Account',
        },
        {
            type: 'Settings',
            tab: () => setActiveTab(tabs[2].id),
            icon: 'fa-solid fa-circle-info',
            name: 'About',
        },
    ]
    const settingsModalHeader = (
        <>
            <div className='row w-100'>
                <div className='col-12 d-flex align-items-center'>
                <i className="fa-solid fa-gear"></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Settings</h6>
                </div>
            </div>
        </>
    )

    const settingsModalBody = (
        <>
            <div className="d-flex">
                <div className="sidebar-small">
                    {settingNavButtons.map(value => (
                        <SidebarButtons props={value} isSidebarOpen={false} />
                    ))}
                </div>
                <div className="w-100 mx-2">
                    {
                        activeTab === 'general' ? (
                            <GeneralSettings conf={setConfirmFromWhere} openConf={() => setConfirmPassModalOpen((prev) => !prev)} formData={formData} setFormData={setFormData} handleChange={handleChange} spendingLimit={spendingLimit} userType={userType}/>
                        ) : activeTab === 'account' ? (
                            <AccountSettings conf={setConfirmFromWhere} openConf={() => setConfirmPassModalOpen((prev) => !prev)} formData={formData} setFormData={setFormData} handleChange={handleChange} setIsLogout={setIsLogout}/>
                        ) : activeTab === 'about' ? (
                            <AboutSettings />
                        ) : <></>
                    }
                </div>
            </div>
        </>
    );
    
    const settingsModalFooter = (
        <>
        </>
    )

    return(
        <>
            <Modal
            headerContent={settingsModalHeader}
            bodyContent={settingsModalBody}
            footerContent={settingsModalFooter}
            stateChecker={stateChecker}
            stateControl={stateControl}
            customWidth={'40%'}
            customZIndex={30}
            />
            <ConfirmPasswordModal 
            stateChecker={isConfirmPassModalOpen} 
            stateControl={() => setConfirmPassModalOpen((prev) => !prev)} 
            fromWhere={confirmFromWhere}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            setAction={setAction}
            isSubmittedControl={() => setIsSubmitted((prev) => !prev)}
            fetchData={fetchData}
            />
            <SuccessfulActionModal 
            stateChecker={isSuccessfulActionModalOpen}
            stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
            actionTitle={action.title}
            actionDescription={action.description}
            isSubmitted={isSubmitted}
            isSubmittedControl={() => setIsSubmitted((prev) => !prev)}
            isLogOut={isLogout}
            />
        </>
    )


}