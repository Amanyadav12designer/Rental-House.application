import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginPage({onLogin}){
    const navigate= useNavigate();

const [email,setEmail]= useState("");
const [password,setPassword]= useState("");
const [loading,setLoading]= useState(false);
const [error,setError]= useState("");

async function handleSubmit(e){
e.preventDefault();
try{
setLoading(true);
    const res= await fetch(`${import.meta.env.VITE_API_URL}/api/login`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password}),
    });
    const data= await res.json();

    if(!res.ok){
        setError(data.message);
        setTimeout(() => {
    setError("");
  }, 3000);
        return;
    }

    



localStorage.setItem("token",data.token);
localStorage.setItem("role",data.role);






navigate(`/home?role=${data.role}`);

onLogin(data.role);



}
catch(error){
    console.log(error);
}finally{
    setLoading(false);}


}


return(
    <div className="signup-page">
        <div className="signup-card">
<form onSubmit={handleSubmit}>

<h2>LOGIN PAGE</h2>

<input
placeholder="email"
value={email}
onChange ={(e)=>setEmail(e.target.value)}/>


<input
type = "password"
placeholder="password"
value={password}
onChange ={(e)=>setPassword(e.target.value)}/>

<button  className="signup-btn"  disabled={loading} type="submit">{loading ? <div className="loading-spinner"/> : "Login"}</button>

</form>

<p>Don't have an account? <Link to="/signup">Signup here</Link></p>

{error && <p className="error-message">{error}</p>}

    </div></div>
);

}