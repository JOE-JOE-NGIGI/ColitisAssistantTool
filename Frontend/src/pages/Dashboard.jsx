import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ribbon from "../assets/ribbon.webp";

const statusConfig = {
  remission: {
    label: "In Remission",
    icon: "🟢",
    bg: "#f0fdf4",
    border: "#86efac",
    color: "#166534"
  },
  mild_flare: {
    label: "Mild Flare",
    icon: "🟡",
    bg: "#fefce8",
    border: "#fde047",
    color: "#854d0e"
  },
  active_flare: {
    label: "Active Flare",
    icon: "🔴",
    bg: "#fff1f2",
    border: "#fca5a5",
    color: "#991b1b"
  }
};

const urgencyConfig = {
  routine: { label: "Routine follow-up", color: "#166534", bg: "#f0fdf4" },
  soon: { label: "Contact doctor soon", color: "#854d0e", bg: "#fefce8" },
  urgent: { label: "Seek care today", color: "#991b1b", bg: "#fff1f2" }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rawText, setRawText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [expandedEntry, setExpandedEntry] = useState(null);

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
      const { data } = await API.post("/symptoms", { rawText }, config);
      setLatestResult(data);
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

  const affirmations = [
    "Every day you track is a step toward better health. 💜",
    "You are stronger than your symptoms. 💜",
    "Small steps every day lead to big changes. 💜",
    "Your body is doing its best, and so are you. 💜",
    "Tracking today helps your doctor help you better. 💜",
  ];

  const affirmation = affirmations[new Date().getDay() % affirmations.length];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f5f0ff 0%, #fdf6ec 50%, #f0f4ff 100%)" }}>

      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between" style={{ background: "#26215C" }}>
        <div className="flex items-center gap-3">
          <img src={ribbon} alt="UC ribbon" className="w-6 h-auto" />
          <span className="font-medium text-base" style={{ color: "#CECBF6" }}>ColitisCare</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:block" style={{ color: "#AFA9EC" }}>{userInfo?.name}</span>
          <button
            onClick={logoutHandler}
            className="text-xs px-4 py-2 rounded-lg border transition"
            style={{ borderColor: "#3C3489", color: "#AFA9EC" }}
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Greeting */}
        <div className="rounded-2xl p-6 mb-6 shadow-sm" style={{ background: "linear-gradient(135deg, #534AB7, #7F77DD)" }}>
          <h1 className="text-2xl font-medium text-white">
            {getGreeting()}, {userInfo?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "#CECBF6" }}>{affirmation}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total entries", val: entries.length, icon: "📋" },
            {
              label: "This week",
              val: entries.filter(e => new Date(e.createdAt) > new Date(Date.now() - 7 * 86400000)).length,
              icon: "📅"
            },
            {
              label: "Latest log",
              val: entries.length > 0
                ? new Date(entries[0]?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "—",
              icon: "🕐"
            },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 shadow-sm text-center border" style={{ background: "#fffaf5", borderColor: "#e8dff5" }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-2xl font-semibold" style={{ color: "#534AB7" }}>{s.val}</div>
              <div className="text-xs mt-1" style={{ color: "#9b8ec4" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Symptom input */}
        <div className="rounded-2xl p-6 mb-6 shadow-sm border" style={{ background: "#fffaf5", borderColor: "#e8dff5" }}>
          <h2 className="text-base font-medium mb-1" style={{ color: "#3C3489" }}>
            📝 How are you feeling today?
          </h2>
          <p className="text-xs mb-4" style={{ color: "#9b8ec4" }}>
            Describe your symptoms in your own words — pain, frequency, energy levels, anything relevant.
          </p>
          <form onSubmit={submitHandler}>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="e.g. Woke up with cramping, had 4 bowel movements, noticed some blood, feeling fatigued..."
              className="w-full rounded-xl p-4 text-sm h-28 resize-none focus:outline-none transition"
              style={{
                border: "1.5px solid #d8cff0",
                background: "#fdf8ff",
                color: "#3C3489",
                fontFamily: "inherit"
              }}
              onFocus={e => e.target.style.borderColor = "#534AB7"}
              onBlur={e => e.target.style.borderColor = "#d8cff0"}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs" style={{ color: "#c4b8e0" }}>{rawText.length} characters</p>
              <button
                type="submit"
                disabled={loading || !rawText.trim()}
                className="px-6 py-2.5 text-white text-sm font-medium rounded-lg transition flex items-center gap-2"
                style={{
                  background: loading || !rawText.trim() ? "#b8b0d8" : "#534AB7",
                  cursor: loading || !rawText.trim() ? "not-allowed" : "pointer"
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Analyzing...
                  </>
                ) : "Analyze symptoms"}
              </button>
            </div>
          </form>
        </div>

        {/* AI Result Card */}
        {latestResult && (
          <div
            className="rounded-2xl p-6 mb-6 shadow-sm border"
            style={{
              background: statusConfig[latestResult.status]?.bg || "#fffaf5",
              borderColor: statusConfig[latestResult.status]?.border || "#e8dff5"
            }}
          >
            {/* Status header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{statusConfig[latestResult.status]?.icon}</span>
                <span className="font-semibold text-base" style={{ color: statusConfig[latestResult.status]?.color }}>
                  {statusConfig[latestResult.status]?.label}
                </span>
              </div>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: urgencyConfig[latestResult.urgency]?.bg,
                  color: urgencyConfig[latestResult.urgency]?.color
                }}
              >
                {urgencyConfig[latestResult.urgency]?.label}
              </span>
            </div>

            {/* AI Summary */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: statusConfig[latestResult.status]?.color }}>
              {latestResult.summary}
            </p>

            {/* Recommendations */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: statusConfig[latestResult.status]?.color }}>
                Recommended next steps
              </p>
              <div className="flex flex-col gap-2">
                {latestResult.recommendations?.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{
                        background: statusConfig[latestResult.status]?.border,
                        color: statusConfig[latestResult.status]?.color
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: statusConfig[latestResult.status]?.color }}>{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence */}
            <p className="text-xs mt-4" style={{ color: statusConfig[latestResult.status]?.color, opacity: 0.7 }}>
              AI confidence: {latestResult.confidence} · For informational use only
            </p>
          </div>
        )}

        {/* Tip card */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-start gap-3 border shadow-sm"
          style={{ background: "#fef6e4", borderColor: "#f5dfa5" }}
        >
          <span className="text-xl">💡</span>
          <div>
            <p className="text-xs font-medium" style={{ color: "#92650a" }}>Daily tip</p>
            <p className="text-xs mt-0.5" style={{ color: "#b07d2a" }}>
              Staying hydrated and avoiding trigger foods like spicy meals, caffeine, and alcohol can help reduce flare frequency.
            </p>
          </div>
        </div>

        {/* Symptom history */}
        <h2 className="text-base font-medium mb-4" style={{ color: "#3C3489" }}>📖 Symptom history</h2>

        {entries.length === 0 ? (
          <div className="rounded-2xl p-10 text-center border border-dashed" style={{ background: "#fffaf5", borderColor: "#d8cff0" }}>
            <p className="text-2xl mb-2">🌿</p>
            <p className="text-sm" style={{ color: "#9b8ec4" }}>No entries yet.</p>
            <p className="text-xs mt-1" style={{ color: "#c4b8e0" }}>Your logged symptoms will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => {
              const s = statusConfig[entry.status];
              const isExpanded = expandedEntry === entry._id;
              return (
                <div
                  key={entry._id}
                  className="rounded-xl shadow-sm border transition"
                  style={{ background: s?.bg || "#fffaf5", borderColor: s?.border || "#e8dff5" }}
                >
                  {/* Entry header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{s?.icon}</span>
                        <span className="text-xs font-semibold" style={{ color: s?.color }}>
                          {s?.label}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: "#9b8ec4" }}>
                        {new Date(entry.createdAt).toLocaleString("en-US", {
                          weekday: "short", month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed mb-2" style={{ color: "#3C3489" }}>
                      {entry.rawText}
                    </p>

                    {entry.summary && (
                      <p className="text-xs leading-relaxed italic" style={{ color: s?.color }}>
                        {entry.summary}
                      </p>
                    )}

                    {/* Toggle recommendations */}
                    {entry.recommendations?.length > 0 && (
                      <button
                        onClick={() => setExpandedEntry(isExpanded ? null : entry._id)}
                        className="text-xs mt-2 underline"
                        style={{ color: s?.color }}
                      >
                        {isExpanded ? "Hide recommendations" : `View ${entry.recommendations.length} recommendations`}
                      </button>
                    )}
                  </div>

                  {/* Expanded recommendations */}
                  {isExpanded && entry.recommendations?.length > 0 && (
                    <div className="px-4 pb-4 flex flex-col gap-1.5">
                      {entry.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
                            style={{ background: s?.border, color: s?.color }}
                          >
                            {i + 1}
                          </span>
                          <p className="text-xs" style={{ color: s?.color }}>{rec}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs mt-10" style={{ color: "#c4b8e0" }}>
          💜 ColitisCare · For informational use only · Not a substitute for medical advice
        </p>

      </div>
    </div>
  );
};

export default Dashboard;