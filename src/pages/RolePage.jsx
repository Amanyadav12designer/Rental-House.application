import {useNavigate} from "react-router-dom";

export default function RolePage(){

    const navigate= useNavigate();

    return(
        <div>
            <h1>Select your role</h1>

            <button onClick={()=>navigate("/home?role=Landlord")}>Login as landlord

            </button>

            <button onClick={()=>navigate("/home?role=tenantF")}>tenants</button>




        </div>
    );




}