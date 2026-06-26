# 🌿 Sahara — Grief Logistics Assistant

> *"When grief is heavy, logistics shouldn't be."*

Sahara is a compassionate web application designed to help families navigate the overwhelming practical responsibilities that follow the loss of a loved one. While grief demands your heart, Sahara handles the checklist.

**Live Demo:** [https://sahara-blush.vercel.app](https://sahara-blush.vercel.app)
**Backend API:** [https://sahara-x622.onrender.com](https://sahara-x622.onrender.com)

---

## 🧭 The Problem

Losing someone is devastating — and yet, within days, families are expected to:

- Cancel subscriptions and memberships
- Close bank accounts and handle investments
- Notify government and insurance bodies
- Sort through a lifetime of legal and financial documents

There is no centralised guide. No compassionate assistant. Families are left to figure it out alone, often while still in shock.

**Sahara exists to change that.**

---

## ✨ Features

### ✅ Guided Grief Checklists
Step-by-step checklists organised by life category — finances, legal, subscriptions, medical, and more. Each task is clearly explained, with progress saved automatically to the cloud so families can return and pick up where they left off.

- Tasks broken down into manageable steps
- Progress saved per user to MongoDB
- Custom tasks can be added or removed
- Visual progress bar showing completion percentage

### 🤖 AI Grief Assistant
An empathetic AI assistant powered by Groq, trained to understand the emotional and practical context of grief logistics. Ask it anything — from "how do I close a joint bank account?" to "what documents do I need for probate?"

- Contextually aware of grief logistics
- Warm, non-clinical tone
- Real-time streaming responses
- Available on every checklist page

### 🗄️ LegacyVault — *Our Signature Feature*
LegacyVault is Sahara's most powerful and unique feature. It serves as a **secure digital repository** where families can record and organise a deceased person's key financial and legal information in one place.

**What LegacyVault tracks:**
- 🏦 **Bank Accounts** — bank name, account type, branch, account number
- 📈 **Investments** — mutual funds, stocks, FDs, demat accounts
- 🛡️ **Insurance Policies** — policy type, provider, policy number, nominee
- 🏠 **Property** — type, location, registration details, co-owners

**Why it matters:**

In India alone, an estimated ₹40,000+ crore lies unclaimed in bank accounts and insurance policies — not due to fraud, but because families simply *didn't know*. LegacyVault is built to solve this. It gives families a structured place to capture everything before it's too late, or to reconstruct what they know after a loss.

**PDF Export:** Once all information is entered, LegacyVault generates a clean, formatted PDF document — a complete record of the deceased's financial and legal footprint, ready to share with lawyers, banks, or other family members.

**Document Guide:** Built-in guidance on which documents to gather for each asset category (e.g., passbook for bank accounts, policy bond for insurance), so families know exactly what to collect.

### 🔐 Secure Authentication
Full user authentication system so progress, vault entries, and personal data stay private and protected.

- Signup and login with email + password
- Passwords hashed with bcrypt
- JWT-based session management
- Protected routes — dashboard and features only accessible when logged in

### 📊 Personal Dashboard
A clean, welcoming dashboard that greets users by name and gives them quick access to all features — checklists, AI assistant, and LegacyVault — with visual progress cards showing how far along they are.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Custom CSS with CSS variables |
| Animations | Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | bcrypt + JSON Web Tokens (JWT) |
| AI Assistant | Groq API (LLaMA 3) |
| PDF Export | jsPDF |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Project Structure

```
Sahara/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx       # Home/marketing page
│   │   │   ├── Login.jsx         # Auth (login + signup)
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   ├── Checklist.jsx     # Task checklists + AI panel
│   │   │   └── LegacyVault.jsx   # Digital asset registry
│   │   ├── components/
│   │   │   ├── AssistantPanel.jsx  # AI assistant sidebar
│   │   │   └── ProtectedRoute.jsx  # Auth guard
│   │   └── main.jsx
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── auth.js           # Signup/login endpoints
│   │   ├── checklist.js      # Checklist CRUD + progress
│   │   └── llm.js            # Groq AI proxy
│   ├── models/
│   │   ├── User.js
│   │   └── ChecklistProgress.js
│   ├── db.js
│   └── server.js
│
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- MongoDB URI (local or Atlas)
- Groq API key

### Setup

```bash
# Clone the repo
git clone https://github.com/rakshasingh17/Sahara.git
cd Sahara
```

**Backend:**
```bash
cd backend
npm install
```

Create a `.env` file in the root:
```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
```

```bash
node server.js
# Server running on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# App running on http://localhost:5173
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://sahara-blush.vercel.app |
| Backend | Render | https://sahara-x622.onrender.com |
| Database | MongoDB Atlas | Cloud-hosted |

---

## 👥 Team

- **Raksha**
- **Shubhra**
- **Freya**
- **Bhakti**

---

## 💛 Why Sahara?

The name Sahara was chosen deliberately — a vast, difficult terrain that people cross with guidance and preparation. We wanted to build something that feels like a companion through one of life's hardest journeys: not cold, not clinical, but genuinely helpful and warm.

Grief doesn't pause for paperwork. Sahara makes sure paperwork doesn't pause your grief.

---

*Built with care — Sahara, 2026*