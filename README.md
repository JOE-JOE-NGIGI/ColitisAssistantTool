<div align="center">

# 💜 ColitisCare

### AI-Powered Symptom Tracker for Ulcerative Colitis Patients

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-purple.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Made with React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js Backend](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://vercel.com/)

![UC Awareness](https://img.shields.io/badge/UC%20%26%20IBD-Awareness-8B5CF6)

**[Live App](https://colitis-assistant-tool.vercel.app) · [Report a Bug](https://github.com/JOE-JOE-NGIGI/ColitisAssistantTool/issues) · [Request a Feature](https://github.com/JOE-JOE-NGIGI/ColitisAssistantTool/issues)**

</div>

---

## 🩺 About

**ColitisCare** is an AI-assisted symptom tracker built for patients living with Ulcerative Colitis (UC). It helps patients log daily symptoms, detect whether they are in remission or experiencing a flare, and receive actionable next steps — all in a warm, supportive interface designed with the patient in mind.

> Ulcerative colitis is a chronic inflammatory bowel disease that causes inflammation and ulcers in the large intestine. Symptoms can flare unpredictably, making daily tracking essential for better outcomes.

💜 _Purple ribbon — UC & IBD awareness. You are not alone in this journey._

---

## ✨ Features

- 📝 **Symptom Logging** — Describe symptoms in plain language, logged securely to your profile
- 🤖 **AI Flare Detection** — AI analyzes symptoms and classifies status as remission, mild flare, or active flare
- 📋 **Actionable Recommendations** — Personalized next steps based on symptom severity and urgency
- 📈 **Symptom History** — View all past entries with timestamps
- 💊 **Medication Tracking** _(coming soon)_ — Track medication adherence
- 📤 **Doctor Reports** _(coming soon)_ — Share symptom summaries with your care team
- 🩺 **Clinician Dashboard** _(coming soon)_ — Gastroenterologists can monitor patient trends

---

## 🛠️ Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Frontend   | React, Vite, Tailwind CSS        |
| Backend    | Node.js, Express.js              |
| Database   | MongoDB Atlas                    |
| AI         | Google Gemini / Anthropic Claude |
| Auth       | JWT (JSON Web Tokens)            |
| Deployment | Vercel                           |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- MongoDB (local or Atlas)
- A Gemini or Anthropic API key

### 1. Clone the repository

```bash
git clone https://github.com/JOE-JOE-NGIGI/ColitisAssistantTool.git
cd ColitisAssistantTool
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```properties
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Project Structure

```
ColitisAssistantTool/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # AI service (Gemini)
│   │   └── server.js       # Entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── assets/         # Images, ribbon.webp
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── services/       # Axios API config
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login and receive JWT token |

### Symptoms

| Method | Endpoint        | Description                | Auth Required |
| ------ | --------------- | -------------------------- | ------------- |
| POST   | `/api/symptoms` | Log symptoms + AI analysis | ✅            |
| GET    | `/api/symptoms` | Get all symptom entries    | ✅            |

---

## 🤖 AI Flare Detection

ColitisCare uses AI to analyze free-text symptom descriptions and return:

```json
{
  "status": "mild_flare",
  "confidence": "high",
  "summary": "You're experiencing some symptoms that suggest a mild flare...",
  "recommendations": [
    "Contact your GI specialist within 2-3 days",
    "Avoid trigger foods and increase hydration",
    "Do not skip your medications"
  ],
  "urgency": "soon"
}
```

**Status levels:**

- 🟢 `remission` — Minimal or no symptoms
- 🟡 `mild_flare` — Some symptoms, moderate frequency
- 🔴 `active_flare` — Significant symptoms requiring attention

---

## 🔒 Security

- Passwords hashed with **bcryptjs**
- Authentication via **JWT tokens**
- Rate limiting with **express-rate-limit**
- HTTP security headers via **Helmet**
- All health data encrypted in transit

---

## 🗺️ Roadmap

- [x] User authentication (register/login)
- [x] Symptom logging
- [x] AI flare detection
- [ ] Medication tracking
- [ ] Trend charts (14-day history)
- [ ] Doctor report export (PDF)
- [ ] Clinician dashboard
- [ ] Push notification reminders
- [ ] Mayo Score integration
- [ ] Mobile app (React Native)

---

## ⚠️ Disclaimer

ColitisCare is for **informational purposes only** and does not constitute medical advice. Always consult your gastroenterologist or healthcare provider regarding your treatment and care.

---

## 📄 License

This project is licensed under the **AGPL-3.0 License** — see the [LICENSE](LICENSE) file for details.

Anyone who uses this code must also open source their modifications under the same license.

---

## 👨‍💻 Author

**JOE-JOE-NGIGI**

- GitHub: [@JOE-JOE-NGIGI](https://github.com/JOE-JOE-NGIGI)

---

<div align="center">

💜 _Built with care for the UC community_

</div>
