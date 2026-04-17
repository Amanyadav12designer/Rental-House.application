import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("tenant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[existError,setExistError]= useState("");
  const[signupSuccess,setSignupSuccess]= useState("");
  

  async function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: userRole,
        }),
      });

     

      const data = await res.json();

      if (!res.ok) {
        setExistError(data.message);
        return;
      }
     

      setSignupSuccess("Signup successful 🎉");
      navigate("/login"); // ✅ go to login
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    } finally {
      setError(data.message);
      setLoading(false);
    }
  }

  setTimeout(() => {
    setLoading(false);
  },7000);


 

setTimeout(()=>{
  setExistError("");
},7000);

  return (

    <div className="signup-page">
      {signupSuccess && <div className="success-box">{signupSuccess}</div>}
      <div className="signup-card">
      <form onSubmit={handleSignup}>
        <h2>SIGNUP PAGE</h2>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
         style={{marginLeft: "3.5%"}} 
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="tenant">Tenant </option>
          <option value="landlord">Landlord</option>
        </select>

        <button className="signup-btn2" type="submit" disabled={loading}>
          {loading ? <div className="loading-spinner"></div> : "Signup"}
        </button>
        <button className="signup-footer" style={{ marginLeft: "3.5%" }} onClick={() => navigate("/login")} type="button">
          Already have an account? Login
        </button>
      
      </form>
        {error && <p className="error">{error}</p>}


        {existError && <div className="error-box">{existError}</div>}
      </div>
      

    </div>
  );
}
