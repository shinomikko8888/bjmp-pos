
import '../../../../styles/auth-page/general.css';
import BJMPLogo from '../../../../assets/png/bjmp-logo.png'
export default function AuthHeaderDisplay(){
    return(
            <header className='text-center'>
                <img className="img" src={BJMPLogo}  alt="BJMP Logo" />
                <h6 className="auth-header-text">BUREAU OF JAIL MANAGEMENT AND PENOLOGY, REGION III</h6>
                <p className="auth-sub-text">“Changing Lives, Building a Safer Nation”</p>
            </header>
    );
}