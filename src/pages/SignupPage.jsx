import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setName]= useState("");
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[existError,setExistError]= useState("");
  const[signupSuccess,setSignupSuccess]= useState("");
  const[blankError,setBlankError]= useState("");
  

  async function handleSignup(e) {
    e.preventDefault();

    if (!name||!email || !password) {
       setBlankError("data.message");
      return;
    }

    try {
      setLoading(true);
       setError("");
    setExistError("");
   

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         name, email,
          password,
       
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
   
      setLoading(false);
    }

    
  }



  return (

    <div className="signup-page">
      {signupSuccess && <div className="success-box">{signupSuccess}</div>}
      <div className="signup-card">
      <form onSubmit={handleSignup}>
        <h2>SIGNUP PAGE</h2>

              <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
