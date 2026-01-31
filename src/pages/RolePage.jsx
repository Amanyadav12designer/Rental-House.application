import {useNavigate} from "react-router-dom";

export default function RolePage({setRole}){

    const navigate= useNavigate();

    return(
        <div className="container title">
          
            <div className="role-cards">
                <div className="role-card">

            <button className="role-button " onClick={()=>{navigate("/home");   setRole("landlord");}}> Landlord</button>
</div>


<div className="role-card2">
            <button className="role-button2 " onClick=
{()=>{navigate("/home");   setRole("tenant");}}>tenants</button>

</div>
</div>

        </div>
    );




}