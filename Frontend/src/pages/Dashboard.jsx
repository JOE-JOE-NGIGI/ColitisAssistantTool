import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [rawText, setRawText] = useState("");

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    fetchEntries();

  }, []);

  const fetchEntries = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await API.get(
        "/symptoms",
        config
      );

      setEntries(data);

    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await API.post(
        "/symptoms",
        { rawText },
        config
      );

      setRawText("");

      fetchEntries();

    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          UC AI Dashboard
        </h1>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <form
        onSubmit={submitHandler}
        className="mb-8"
      >

        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Describe your symptoms..."
          className="w-full border p-4 rounded h-32"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded mt-4"
        >
          Save Symptoms
        </button>

      </form>

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Symptom History
        </h2>

        {entries.map((entry) => (

          <div
            key={entry._id}
            className="border p-4 rounded mb-4"
          >

            <p>{entry.rawText}</p>

            <small>
              {new Date(entry.createdAt).toLocaleString()}
            </small>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Dashboard;