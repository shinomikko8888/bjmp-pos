import '../../../../styles/navigation-bars/side-navigation-bar/general.css'
import { NavLink } from 'react-router-dom';

export default function SidebarButtons({props, isSidebarOpen}){
    return(
        <>
            <li>
                {props.type === 'Main' ? (
                    <NavLink to={props.path} className={({isActive}) => (isActive ? 'active' : '')}>
                        <i className={props.icon}></i>
                        <span className={isSidebarOpen ? 'link-name' : 'tooltip'}>{props.name}</span>
                    </NavLink>
                ) :
                (
                    <button className={({isActive}) => (isActive ? 'active' : '')} onClick={props.stateControl}>
                        <i className={props.icon}></i>
                        <span className={isSidebarOpen ? 'link-name' : 'tooltip'}>{props.name}</span>
                    </button>
                )
                }
            </li>
        </>
    );

}
