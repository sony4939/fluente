# 🇮🇹 Fluente: AI-Powered Italian Tutor

👉 **Try it live (no setup required):**  
https://sony4939.github.io/fluente/

_Fluente runs directly in your browser. No installation needed._

---

## What is 🇮🇹 Fluente?

**Fluente** is a premium, beautifully designed Vanilla HTML/CSS/JS web app that helps Italian learners (A1–B2) practice speaking **like a local**.

Instead of memorizing textbook grammar, Fluente uses AI to simulate **real, spontaneous Italian conversations**, giving you corrections, explanations, and personalized feedback in real time.

---

## ✨ Features

- 🗣️ **Dynamic AI Conversations**  
  Practice natural Italian on real-life and abstract topics like modern life, travel, and culture.

- 💡 **“Explain This” Button**  
  Instantly get clear explanations for confusing verbs, prepositions, or sentence structures.

- 🎙️ **Beginner-Friendly Mic Controls**  
  Manually start and stop recording so you can pause, think, and structure your sentences confidently.

- 📊 **Personalized Session Notes**  
  After each conversation, Fluente analyzes what you said, highlights mistakes, and provides corrected examples.

- 📇 **Smart Flashcards from Your Mistakes**  
  Flashcards are automatically generated from **misspelled, mispronounced, or incorrectly used words and phrases** during your conversations — so you study exactly what you need.

- ⏱️ **Targeted Quiz Mode (Mistake-Based)**  
  Choose specific mistakes from a dropdown and generate quizzes focused **only on those errors**, in addition to daily scenario-based quizzes (Food, Travel, Family, etc.).

- 🔢 **Daily Scenarios & Custom Quiz Lengths**  
  Practice with a configurable number of daily scenarios, or drill down into a specific set of mistakes for rapid improvement.

- 🔒 **100% Client-Side Privacy**  
  Your OpenAI API key is stored locally in your browser (`localStorage`) and never touches a backend database.
---

## 🚀 How to Use (Recommended)

1. Open the live app:  
   👉 https://sony4939.github.io/fluente/

2. Go to the **Conversation** tab  
3. Click the ⚙️ **Settings** icon  
4. Paste your **OpenAI API key** (`sk-...`)  
5. Save and start speaking 🇮🇹

✅ No cloning  
✅ No local server  
✅ Works directly in the browser

> **Best experience:** Chrome or Edge (Web Speech API support)

---

## ⚠️ Notes About the Live Demo

- Hosted on **GitHub Pages**
- Runs entirely client-side
- Requires your own OpenAI API key
- Some browser features depend on Web Speech API availability

---


## 🚀 How to Run Locally

Because this app uses the Web Speech API and connects directly to the OpenAI API, it **requires** a local web server to bypass strict browser CORS (Cross-Origin Resource Sharing) security policies. You cannot simply double-click the `index.html` file!

### Step 1: Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/fluente-tutor.git
cd fluente-tutor
```

### Step 2: Start a local web server
You can use Python, Node, or any local server you prefer.

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using Node (npx):**
```bash
npx serve .
```

### Step 3: Open the app
Navigate to `http://localhost:8000` (or whatever port your server started on) in your modern web browser (Chrome or Edge recommended for best Web Speech API support).

### Step 4: Add your API Key
1. Go to the **Conversation** tab.
2. Click the ⚙️ Settings gear icon in the top right.
3. Paste in your `sk-proj-...` OpenAI API key.
4. Hit **Save** and start talking!

## 🛠️ Technology Stack
- **HTML5**: Semantic structure and SVG icons.
- **CSS3**: Premium glassmorphism design, CSS Grid/Flexbox, dynamic gradients.
- **Vanilla JavaScript (ES6)**: State management, API handling, DOM manipulation.
- **Web Speech API**: Uses standard `speechSynthesis` (TTS) and `SpeechRecognition` (STT).
- **OpenAI API (`gpt-4o-mini`)**: Powers the tutor prompts, language correction, and flashcard generation.

## 🎨 Design System
Fluente uses a dark, glassmorphism-inspired aesthetic (`rgba(255, 255, 255, 0.05)` backgrounds with heavy blur filters) and vibrant Italian-flag inspired text gradients. The typography relies on `Outfit` and `Inter` via Google Fonts.

---
*Created as part of an Advanced Agentic Coding experiment.*
