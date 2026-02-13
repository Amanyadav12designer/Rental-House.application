import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("tenant");
  const [loading, setLoading] = useState(false);
  

  async function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/signup", {
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
        alert(data.message || "Signup failed");
        return;
      }
      localStorage.setItem("token", data.token);

      alert("Signup successful 🎉");
      navigate("/login"); // ✅ go to login
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

;

  return (
    <div className="signup-page">
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
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        <button className="signup-footer" onClick={() => navigate("/login")} type="button">
          Already have an account? Login
        </button>
      </form></div>

    </div>
  );
}
