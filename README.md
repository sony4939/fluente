# 🇮🇹 Fluente: AI-Powered Italian Tutor

Fluente is a premium, beautifully designed Vanilla HTML/CSS/JS web application that helps Italian learners from level A1-B2 practice speaking "like a local". Instead of just memorizing textbook grammar, Fluente connects directly to the **OpenAI API** to provide dynamic, spontaneous conversation practice right in your browser.

## ✨ Features

- **🗣️ Dynamic AI Conversations**: Practice fluently on abstract topics like modern life, travel, and culture.
- **💡 "Explain This" Button**: The AI Tutor will break down confusing Italian verbs or prepositions with a single click in the chat.
- **🎙️ Beginner-Friendly Mic Controls**: Manually start and stop recording, allowing you to pause, think, and structure your Italian sentences without being cut off.
- **📊 Personalized Session Notes**: After you finish a conversation, the app analyzes your mistakes and gives you actionable feedback and example sentences.
- **📇 Auto-Generated Flashcards**: The tutor automatically generates custom flashcards based on the exact words you struggled with during your chat!
- **⏱️ Rapid Fire Quiz Mode**: Test your knowledge across categories like Food, Travel, Family, and your own custom mistakes.
- **🔒 100% Client-Side Privacy**: Your OpenAI API key is saved locally in your browser's `localStorage` and never touches a backend database.

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
