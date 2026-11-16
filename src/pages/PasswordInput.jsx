import { useState } from "react";

import {MdVisibility,MdVisibilityOff} from "react-icons/md";

import "./PasswordInput.css";



export default function({value,onChange,placeholder="Password",autoComplete}){



const [show,setShow]= useState(false);




return(


<div className="password-field">


<input 
className="password-field-input"
type={show?"text":"password"}

value={value}
onChange={onChange}
placeholder={placeholder}
autoComplete={autoComplete}
/>


<button

type="button"
className="password-toggle"
onClick={()=>setShow((s)=>!s)}

arial-label={show? "Hide Pasword":"Show Password"}

>
    {show?  <MdVisibility/> : <MdVisibilityOff/>}





</button>





</div>

)

}