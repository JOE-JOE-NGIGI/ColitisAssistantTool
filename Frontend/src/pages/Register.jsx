import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import ribbon from "../assets/ribbon.webp";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", formData);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 bg-[#26215C] p-10 w-1/2">
          <p className="text-[#CECBF6] text-sm font-medium self-start">ColitisCare</p>

          <img
            src={ribbon}
            alt="UC and IBD purple awareness ribbon"
            className="w-32 h-auto drop-shadow-lg"
          />

          <div className="text-center">
            <p className="text-[#EEEDFE] text-xl font-medium">Your journey starts here.</p>
            <p className="text-[#AFA9EC] text-xs mt-1">Track. Detect. Manage.</p>
          </div>

          <p className="text-[#7F77DD] text-xs text-center leading-relaxed">
            Purple ribbon — UC &amp; IBD awareness<br />
            You are not alone in this journey. 💜
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {["AI flare detection", "Symptom trends", "Med tracking", "Doctor reports"].map(p => (
              <span key={p} className="text-[10px] px-2 py-1 rounded-full border border-[#3C3489] text-[#AFA9EC] bg-[#534AB7]/20">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center bg-white p-10 w-full md:w-1/2">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Create an account</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Join ColitisCare and take control<br />of your UC management.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Full name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#534AB7] text-white text-sm font-medium rounded-lg hover:bg-[#3C3489] transition mb-3"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span className="flex-1 h-px bg-gray-100"/>
            already have an account?
            <span className="flex-1 h-px bg-gray-100"/>
          </div>

          <Link to="/login">
            <button className="w-full py-2.5 border border-gray-200 text-sm text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition">
              Log in instead
            </button>
          </Link>

          <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed">
            By registering you agree to our Terms of Service.<br />
            Your health data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;