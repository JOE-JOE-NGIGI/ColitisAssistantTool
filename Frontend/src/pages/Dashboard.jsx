import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ribbon from "../assets/ribbon.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rawText, setRawText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) navigate("/login");
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await API.get("/symptoms", config);
      setEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await API.post("/symptoms", { rawText }, config);
      setRawText("");
      fetchEntries();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-[#26215C] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img src={ribbon} alt="UC ribbon" className="w-6 h-auto" />
          <span className="text-[#CECBF6] font-medium text-base">ColitisCare</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#AFA9EC] text-sm hidden md:block">
            {userInfo?.name}
          </span>
          <button
            onClick={logoutHandler}
            className="text-xs px-4 py-2 rounded-lg border border-[#3C3489] text-[#AFA9EC] hover:bg-[#3C3489] transition"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">
            {getGreeting()}, {userInfo?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            How are you feeling today? Log your symptoms below.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total entries", val: entries.length },
            { label: "This week", val: entries.filter(e => new Date(e.createdAt) > new Date(Date.now() - 7 * 86400000)).length },
            { label: "Latest log", val: entries.length > 0 ? new Date(entries[0]?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="text-2xl font-semibold text-[#534AB7]">{s.val}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Symptom input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-base font-medium text-gray-700 mb-1">Log today's symptoms</h2>
          <p className="text-xs text-gray-400 mb-4">
            Describe how you're feeling in your own words — pain, frequency, stool type, energy levels, anything relevant.
          </p>
          <form onSubmit={submitHandler}>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="e.g. Woke up with cramping, had 4 bowel movements, noticed some blood, feeling fatigued..."
              className="w-full border border-gray-200 rounded-xl p-4 text-sm h-28 resize-none focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10 text-gray-700 placeholder-gray-300"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-300">{rawText.length} characters</p>
              <button
                type="submit"
                disabled={loading || !rawText.trim()}
                className="px-6 py-2.5 bg-[#534AB7] text-white text-sm font-medium rounded-lg hover:bg-[#3C3489] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Saving...
                  </>
                ) : "Save symptoms"}
              </button>
            </div>
          </form>
        </div>

        {/* Symptom history */}
        <div>
          <h2 className="text-base font-medium text-gray-700 mb-4">Symptom history</h2>

          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
              <p className="text-sm text-gray-400">No entries yet.</p>
              <p className="text-xs text-gray-300 mt-1">Your logged symptoms will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {entries.map((entry) => (
                <div
                  key={entry._id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-[#534AB7]/30 transition"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">{entry.rawText}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#534AB7]"/>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleString("en-US", {
                        weekday: "short", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-300 mt-10">
          💜 ColitisCare — For informational use only. Not a substitute for medical advice.
        </p>

      </div>
    </div>
  );
};

export default Dashboard;