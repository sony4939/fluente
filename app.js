/**
 * Italian Tutor App Logic
 */

// --- DATA ---
const vocabData = {
    greetings: [
        { it: "Ciao", en: "Hello / Goodbye" },
        { it: "Buongiorno", en: "Good morning" },
        { it: "Buonasera", en: "Good evening" },
        { it: "Grazie", en: "Thank you" },
        { it: "Prego", en: "You're welcome" },
        { it: "Per favore", en: "Please" },
        { it: "Come stai?", en: "How are you?" },
        { it: "Bene, grazie", en: "Good, thanks" },
        { it: "Arrivederci", en: "Goodbye" },
        { it: "Mi scusi", en: "Excuse me" }
    ],
    travel: [
        { it: "Aeroporto", en: "Airport" },
        { it: "Treno", en: "Train" },
        { it: "Stazione", en: "Station" },
        { it: "Biglietto", en: "Ticket" },
        { it: "Albergo", en: "Hotel" },
        { it: "Dov'è...?", en: "Where is...?" },
        { it: "Destra", en: "Right" },
        { it: "Sinistra", en: "Left" },
        { it: "Dritta", en: "Straight" },
        { it: "Mappa", en: "Map" }
    ],
    food: [
        { it: "Acqua", en: "Water" },
        { it: "Vino", en: "Wine" },
        { it: "Pane", en: "Bread" },
        { it: "Caffè", en: "Coffee" },
        { it: "Conto", en: "Bill/Check" },
        { it: "Ristorante", en: "Restaurant" },
        { it: "Menu", en: "Menu" },
        { it: "Delizioso", en: "Delicious" },
        { it: "Tavolo", en: "Table" },
        { it: "Mangiare", en: "To eat" }
    ],
    verbs: [
        { it: "Essere", en: "To be" },
        { it: "Avere", en: "To have" },
        { it: "Fare", en: "To do / make" },
        { it: "Dire", en: "To say" },
        { it: "Potere", en: "To be able to (can)" },
        { it: "Volere", en: "To want" },
        { it: "Sapere", en: "To know" },
        { it: "Andare", en: "To go" },
        { it: "Dovere", en: "To have to (must)" },
        { it: "Vedere", en: "To see" }
    ],
    family: [
        { it: "Madre", en: "Mother" },
        { it: "Padre", en: "Father" },
        { it: "Fratello", en: "Brother" },
        { it: "Sorella", en: "Sister" },
        { it: "Figlio", en: "Son" },
        { it: "Figlia", en: "Daughter" },
        { it: "Nonno", en: "Grandfather" },
        { it: "Nonna", en: "Grandmother" },
        { it: "Zio", en: "Uncle" },
        { it: "Zia", en: "Aunt" }
    ],
    shopping: [
        { it: "Negozio", en: "Shop/Store" },
        { it: "Prezzo", en: "Price" },
        { it: "Soldi", en: "Money" },
        { it: "Caro", en: "Expensive" },
        { it: "Economico", en: "Cheap" },
        { it: "Comprare", en: "To buy" },
        { it: "Pagare", en: "To pay" },
        { it: "Sconto", en: "Discount" },
        { it: "Contanti", en: "Cash" },
        { it: "Carta di credito", en: "Credit card" }
    ],
    custom: [] // Populated dynamically from conversation mistakes
};

const scenarios = {
    free: "Dynamic, fluent, abstract conversation. Talk like a local Italian.",
    culture: "Discussing Italian culture, art, or daily life.",
    debate: "A friendly debate on a random modern topic.",
    cafe: "Ordering at a Cafe (Beginner Warmup)",
    travel: "Checking into a hotel or navigating a train station.",
    shopping: "Shopping for clothes and asking for prices.",
    hobbies: "A friendly chat about hobbies, sports, and interests."
};


// --- DOM ELEMENTS ---
const tabs = document.querySelectorAll('.tab-btn');
const views = document.querySelectorAll('.view-section');

// Flashcards
const flashcard = document.querySelector('.flashcard');
const categorySelect = document.getElementById('category-select');
const cardIt = document.getElementById('card-it');
const cardEn = document.getElementById('card-en');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnListen = document.getElementById('btn-listen');
const cardCounter = document.getElementById('card-counter');

// Quiz
const btnStartQuiz = document.getElementById('btn-start-quiz');
const quizSetup = document.getElementById('quiz-setup');
const quizCategorySelect = document.getElementById('quiz-category-select');
const quizActive = document.getElementById('quiz-active');
const quizResult = document.getElementById('quiz-result');
const quizQuestionWord = document.getElementById('quiz-question-word');
const quizOptions = document.getElementById('quiz-options');
const quizScoreEl = document.getElementById('quiz-score');
const quizFinalScoreEl = document.getElementById('quiz-final-score');
const quizTimerBar = document.getElementById('quiz-timer');
const btnRestartQuiz = document.getElementById('btn-restart-quiz');

// Converse
const speechRateSelect = document.getElementById('speech-rate');
const scenarioSelect = document.getElementById('scenario-select');
const levelSelect = document.getElementById('level-select');
const btnStartChat = document.getElementById('btn-start-chat');
const chatInterface = document.getElementById('chat-interface');
const chatHistoryEl = document.getElementById('chat-history');
const btnEndSession = document.getElementById('btn-end-session');
const btnRecordStart = document.getElementById('btn-record-start');
const btnRecordStop = document.getElementById('btn-record-stop');
const sessionSummary = document.getElementById('session-summary');
const summaryContent = document.getElementById('summary-content');
const btnCloseSummary = document.getElementById('btn-close-summary');
const micStatus = document.getElementById('mic-status');
const userTranscript = document.getElementById('user-transcript');

// Settings & Memory
const btnSettings = document.getElementById('btn-settings');
const settingsModal = document.getElementById('settings-modal');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const apiKeyInput = document.getElementById('api-key-input');
const memoryStrengths = document.getElementById('memory-strengths');
const memoryWeaknesses = document.getElementById('memory-weaknesses');

// --- STATE ---
let currentCategory = 'greetings';
let currentCardIndex = 0;

let quizCards = [];
let currentQuizIndex = 0;
let quizScore = 0;
let timerInterval;

// OpenAI Chat State
let chatHistory = [];
let isRecognizing = false;
let isManualRecording = false;
let aggregatedTranscript = '';
let interimTranscript = '';

// Config & Memory Data
const CONFIG_KEY = 'italian_tutor_config';
const MEMORY_KEY = 'italian_tutor_memory';
const CUSTOM_VOCAB_KEY = 'italian_tutor_custom_vocab';

let config = { apiKey: '' };
let memoryData = {
    strengths: [],
    weaknesses: [],
    mistakes: [] // store exact mistakes as context strings
};

// --- INITIALIZATION ---
function init() {
    loadSettings();
    loadMemory();
    loadCustomVocab();
    setupNavigation();
    loadFlashcard();
    setupSpeechRecognition();

    // Set up listeners
    flashcard.addEventListener('click', () => flashcard.classList.toggle('is-flipped'));
    categorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        currentCardIndex = 0;
        loadFlashcard();
    });

    btnNext.addEventListener('click', () => {
        if (currentCardIndex < vocabData[currentCategory].length - 1) {
            currentCardIndex++;
            loadFlashcard();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            loadFlashcard();
        }
    });

    btnListen.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent flipping when clicking listen
        speakItalian(cardIt.textContent);
    });

    // Quiz Listeners
    btnStartQuiz.addEventListener('click', startQuiz);
    btnRestartQuiz.addEventListener('click', startQuiz);

    // Converse Listeners
    btnStartChat.addEventListener('click', startScenario);
    btnEndSession.addEventListener('click', generateSessionSummary);
    btnCloseSummary.addEventListener('click', () => {
        sessionSummary.classList.add('hidden');
        document.querySelector('.conversation-setup').classList.remove('hidden');
    });

    // Settings Listeners
    btnSettings.addEventListener('click', openSettings);
    btnCloseSettings.addEventListener('click', closeSettings);
    btnSaveSettings.addEventListener('click', saveSettings);

    // Close modal if clicked outside content
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettings();
        }
    });
}

// --- SETTINGS & MEMORY ---
function loadSettings() {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
        config = JSON.parse(savedConfig);
        apiKeyInput.value = config.apiKey;
    }
}

function saveSettings() {
    config.apiKey = apiKeyInput.value.trim();
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    closeSettings();
}

function openSettings() {
    settingsModal.classList.remove('hidden');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function loadMemory() {
    const savedMemory = localStorage.getItem(MEMORY_KEY);
    if (savedMemory) {
        try {
            memoryData = JSON.parse(savedMemory);
        } catch (e) {
            console.error("Failed to parse memory", e);
        }
    }
    renderMemory();
}

function saveMemory() {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memoryData));
    renderMemory();
}

function loadCustomVocab() {
    const savedCustom = localStorage.getItem(CUSTOM_VOCAB_KEY);
    if (savedCustom) {
        try {
            vocabData.custom = JSON.parse(savedCustom);
        } catch (e) {
            console.error("Failed to parse custom vocab", e);
        }
    }
}

function saveCustomVocab() {
    localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(vocabData.custom));
}

function renderMemory() {
    // Strengths
    if (memoryData.strengths.length === 0) {
        memoryStrengths.innerHTML = '<li>No data yet. Keep talking!</li>';
    } else {
        memoryStrengths.innerHTML = memoryData.strengths.map(s => `<li>${s}</li>`).join('');
    }

    // Weaknesses
    if (memoryData.weaknesses.length === 0) {
        memoryWeaknesses.innerHTML = '<li>No data yet. Keep talking!</li>';
    } else {
        memoryWeaknesses.innerHTML = memoryData.weaknesses.map(w => `<li>${w}</li>`).join('');
    }
}

// --- NAVIGATION ---
function setupNavigation() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add to clicked
            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });
}

// --- FLASHCARDS LOGIC ---
function loadFlashcard() {
    const list = vocabData[currentCategory];

    if (!list || list.length === 0) {
        cardIt.textContent = "Nessuna parola!";
        cardEn.textContent = "No words yet! Have a conversation first.";
        cardCounter.textContent = `0 / 0`;
        btnPrev.disabled = true;
        btnNext.disabled = true;
        btnPrev.style.opacity = '0.3';
        btnNext.style.opacity = '0.3';
        return;
    }

    const card = list[currentCardIndex];

    // Remove flip class to reset view
    flashcard.classList.remove('is-flipped');

    // Small timeout to allow flip animation to finish before changing text
    setTimeout(() => {
        cardIt.textContent = card.it;
        cardEn.textContent = card.en;
        cardCounter.textContent = `${currentCardIndex + 1} / ${list.length}`;

        btnPrev.disabled = currentCardIndex === 0;
        btnNext.disabled = currentCardIndex === list.length - 1;

        btnPrev.style.opacity = currentCardIndex === 0 ? '0.3' : '1';
        btnNext.style.opacity = currentCardIndex === list.length - 1 ? '0.3' : '1';
    }, 150);
}

// --- SPEECH SYNTHESIS (TTS) ---
function speakItalian(text) {
    if (!('speechSynthesis' in window)) return;

    // Stop any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';

    // Apply speed modifier based on current view
    if (document.getElementById('view-converse').classList.contains('active')) {
        utterance.rate = parseFloat(speechRateSelect.value);
    } else {
        utterance.rate = 0.9; // Slightly slower for flashcards by default
    }

    window.speechSynthesis.speak(utterance);
}

// --- QUIZ LOGIC ---
function startQuiz() {
    let allVocab = [];
    const selectedCategory = quizCategorySelect ? quizCategorySelect.value : 'all';

    if (selectedCategory === 'all') {
        const categories = Object.keys(vocabData);
        categories.forEach(cat => {
            allVocab = allVocab.concat(vocabData[cat]);
        });
    } else {
        allVocab = [...(vocabData[selectedCategory] || [])];
    }

    if (selectedCategory === 'custom' && allVocab.length < 4) {
        alert("Not enough words in 'My Mistakes'! Please generate more flashcards from your conversations first.");
        return;
    }

    if (allVocab.length < 4) {
        alert("Not enough words in this category to start a quiz! Ensure there are at least 4 words.");
        return;
    }

    // Shuffle the array to ensure randomness
    allVocab.sort(() => Math.random() - 0.5);

    // Take exactly 10 unique items for this session to guarantee no repeats
    quizCards = allVocab.slice(0, 10);

    currentQuizIndex = 0;
    quizScore = 0;
    quizScoreEl.textContent = '0';

    quizSetup.classList.add('hidden');
    quizResult.classList.add('hidden');
    quizActive.classList.remove('hidden');

    loadQuizQuestion();
}

function loadQuizQuestion() {
    if (currentQuizIndex >= quizCards.length) {
        endQuiz();
        return;
    }

    const currentQ = quizCards[currentQuizIndex];
    quizQuestionWord.textContent = currentQ.it;

    // Generate options (1 correct, 3 random wrong)
    let options = [currentQ.en];

    // We pool wrong answers from all categories to ensure enough variety
    let allEn = [];
    Object.keys(vocabData).forEach(cat => {
        allEn = allEn.concat(vocabData[cat].map(v => v.en));
    });

    while (options.length < 4) {
        const randomOpt = allEn[Math.floor(Math.random() * allEn.length)];
        if (!options.includes(randomOpt)) {
            options.push(randomOpt);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render options
    quizOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, opt === currentQ.en);
        quizOptions.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    quizTimerBar.style.width = '100%';
    quizTimerBar.style.backgroundColor = 'var(--success)';

    let timeLeft = 100; // percent
    timerInterval = setInterval(() => {
        timeLeft -= 1; // Decrease 1% every 50ms = 5 seconds total
        quizTimerBar.style.width = `${timeLeft}%`;

        if (timeLeft <= 30) {
            quizTimerBar.style.backgroundColor = 'var(--error)';
        } else if (timeLeft <= 60) {
            quizTimerBar.style.backgroundColor = '#f59e0b'; // warning color
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 50);
}

function checkAnswer(btn, isCorrect) {
    clearInterval(timerInterval);

    // Disable all options
    const allBtns = quizOptions.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        quizScore++;
        quizScoreEl.textContent = quizScore;
    } else {
        btn.classList.add('wrong');
        // Highlight correct
        allBtns.forEach(b => {
            const currentQ = quizCards[currentQuizIndex];
            if (b.textContent === currentQ.en) b.classList.add('correct');
        });
    }

    setTimeout(() => {
        currentQuizIndex++;
        loadQuizQuestion();
    }, 1500);
}

function handleTimeOut() {
    const allBtns = quizOptions.querySelectorAll('.option-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        const currentQ = quizCards[currentQuizIndex];
        if (b.textContent === currentQ.en) b.classList.add('correct');
    });

    setTimeout(() => {
        currentQuizIndex++;
        loadQuizQuestion();
    }, 1500);
}

function endQuiz() {
    quizActive.classList.add('hidden');
    quizResult.classList.remove('hidden');
    quizFinalScoreEl.textContent = quizScore;
}


// --- CONVERSE LOGIC (SPEECH REC) ---
let recognition;
function setupSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (window.SpeechRecognition) {
        recognition = new window.SpeechRecognition();
        recognition.lang = 'it-IT';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
            isRecognizing = true;
            micStatus.textContent = "Listening... (Take your time, pauses are okay!)";
        };

        recognition.onresult = (event) => {
            interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    aggregatedTranscript += event.results[i][0].transcript + ' ';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            userTranscript.textContent = aggregatedTranscript + interimTranscript;
        };

        recognition.onspeechend = () => {
            // Do nothing, wait for user to hit stop or auto-restart
        };

        recognition.onerror = (event) => {
            console.log("Speech error", event.error);
            if (event.error === 'no-speech' && isManualRecording) {
                // Ignore standard timeout, we just wait for the user
            }
        };

        recognition.onend = () => {
            isRecognizing = false;
            // If the user hasn't explicitly hit stop, restart the recognizer!
            if (isManualRecording) {
                try { recognition.start(); } catch (e) { }
            }
        };

        btnRecordStart.addEventListener('click', (e) => {
            e.preventDefault();
            isManualRecording = true;
            aggregatedTranscript = '';
            interimTranscript = '';
            userTranscript.textContent = '';

            btnRecordStart.classList.add('hidden');
            btnRecordStop.classList.remove('hidden');

            try { recognition.start(); } catch (e) { }
        });

        btnRecordStop.addEventListener('click', (e) => {
            e.preventDefault();
            isManualRecording = false; // Prevents auto-restart

            btnRecordStop.classList.add('hidden');
            btnRecordStart.classList.remove('hidden');
            btnRecordStart.disabled = true; // wait for API
            micStatus.textContent = "Processing...";

            try { recognition.stop(); } catch (e) { }

            const finalTranscript = (aggregatedTranscript + interimTranscript).trim();
            if (finalTranscript) {
                addChatBubble(finalTranscript, 'student');
                userTranscript.textContent = 'Sending to Tutor...';

                chatHistory.push({ role: 'user', content: finalTranscript });
                callOpenAIAPI();
            } else {
                micStatus.textContent = "Tap Start Speaking when ready.";
                btnRecordStart.disabled = false;
            }
        });

    } else {
        btnRecordStart.disabled = true;
        micStatus.textContent = "Speech recognition not supported in this browser.";
    }
}

function startScenario() {
    if (!config.apiKey) {
        alert("Please set your OpenAI API Key in Settings first!");
        openSettings();
        return;
    }

    const scenarioKey = scenarioSelect.value;
    const scenarioTopic = scenarios[scenarioKey];
    const userLevel = levelSelect.value; // e.g. A1, A2, B1, B2

    document.querySelector('.conversation-setup').classList.add('hidden');
    chatInterface.classList.remove('hidden');
    chatHistoryEl.innerHTML = '';

    // System Prompt context
    let systemInstruction = `You are an expert Italian Tutor and a Native Speaker. The user is an English speaker wanting to learn Italian at the ${userLevel} proficiency level.
    
    Current focus/topic: "${scenarioTopic}".
    
    If the topic is "Dynamic, fluent, abstract conversation", you should initiate an engaging, natural conversation about ANY abstract or interesting topic (e.g., philosophy, modern life, travel, technology, dreams). Be spontaneous. Switch topics naturally if the user does.
    
    Rules for your responses:
    1. Tailor your vocabulary, grammar complexity, and sentence length strictly to the ${userLevel} level. If A1/A2, use very simple, short sentences. If B1/B2, use more complex phrasing and idioms.
    2. Keep your responses short (1-3 sentences maximum). Talk naturally.
    3. Analyze the user's Italian. If they make a mistake, gently correct them in English in a separate paragraph at the end of your response. CRITICALLY: Always tell them "How a local would actually say it" so they learn natural phrasing instead of textbook translations.
    4. Ask follow-up questions to keep them talking.
    
    If you see a pattern of strengths or weaknesses, format the very last line of your response EXACTLY like this:
    MEMORY_UPDATE|STRENGTHS: list strengths|WEAKNESSES: list strictly grammar/vocab weaknesses

    Previous memory context:
    Strengths: ${memoryData.strengths.join(', ')}
    Weaknesses: ${memoryData.weaknesses.join(', ')}`;

    chatHistory = [
        { role: 'system', content: systemInstruction },
        { role: 'assistant', content: 'Capito. Iniziamo!' },
        // Trigger the tutor to speak first based on the scenario
        { role: 'user', content: "Start the conversation now. Jump right in and say something interesting or ask an engaging question in Italian." }
    ];

    micStatus.textContent = "Tutor is typing...";
    userTranscript.textContent = "";
    callOpenAIAPI();
}

async function callOpenAIAPI() {
    micStatus.textContent = "Waiting for tutor...";
    btnRecordStart.disabled = true;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: chatHistory,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        let tutorText = data.choices[0].message.content;

        // Parse out memory updates if any
        if (tutorText.includes('MEMORY_UPDATE|')) {
            const parts = tutorText.split('MEMORY_UPDATE|');
            tutorText = parts[0].trim(); // the actual response
            const memoryStr = parts[1];

            // basic parsing "STRENGTHS: a, b|WEAKNESSES: c, d"
            if (memoryStr.includes('STRENGTHS:')) {
                const sMatch = memoryStr.match(/STRENGTHS:(.*?)(\||$)/);
                if (sMatch && sMatch[1].trim()) memoryData.strengths = sMatch[1].split(',').map(s => s.trim()).filter(Boolean);
            }
            if (memoryStr.includes('WEAKNESSES:')) {
                const wMatch = memoryStr.match(/WEAKNESSES:(.*?)(\||$)/);
                if (wMatch && wMatch[1].trim()) memoryData.weaknesses = wMatch[1].split(',').map(w => w.trim()).filter(Boolean);
            }
            saveMemory();
        }

        // Add to history
        chatHistory.push({ role: 'assistant', content: tutorText });

        // Speak and Display
        addChatBubble(tutorText, 'tutor');
        speakItalian(tutorText); // TTS will read the whole thing, including English corrections if present

        // Re-enable mic after TTS is likely done
        const waitTime = Math.max(2000, tutorText.length * 60 / parseFloat(speechRateSelect.value));
        setTimeout(() => {
            btnRecordStart.disabled = false;
            micStatus.textContent = "Your turn! Tap Start Speaking.";
            userTranscript.textContent = "";
        }, waitTime);

    } catch (e) {
        console.error(e);
        addChatBubble("Scusa, c'è stato un errore di connessione. Riprova.", 'system');
        btnRecordStart.disabled = false;
        micStatus.textContent = "Error. Check connection or API key.";
    }
}

function addChatBubble(text, type) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;
    bubble.innerHTML = `<span>${text.replace(/\n/g, '<br/>')}</span>`;

    if (type === 'tutor') {
        const explainBtn = document.createElement('button');
        explainBtn.className = 'glass-btn small secondary explain-btn mt-2';
        explainBtn.innerHTML = '💡 Explain This';
        explainBtn.onclick = () => explainTutorMessage(text, explainBtn);
        bubble.appendChild(explainBtn);
    }

    chatHistoryEl.appendChild(bubble);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
}

// --- IN-CONTEXT EXPLANATION ---
async function explainTutorMessage(text, btnElement) {
    btnElement.disabled = true;
    btnElement.innerHTML = 'Analyzing...';

    const explainPrompt = `Please explain the grammar, verbs, and prepositions used in this specific previous sentence of yours: "${text}". Break it down simply for a ${levelSelect.value} learner so they understand WHY you used those specific words. Keep it very concise.`;

    // We don't add this to the main chatHistory array so it doesn't clutter the actual conversation context
    let explainHistory = [...chatHistory, { role: 'user', content: explainPrompt }];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: explainHistory,
                max_tokens: 300
            })
        });

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        const explanation = data.choices[0].message.content;

        // Append explanation directly below the button
        const expDiv = document.createElement('div');
        expDiv.className = 'explanation-box mt-4';
        expDiv.innerHTML = `<strong>Explanation:</strong><br/>${explanation.replace(/\n/g, '<br/>')}`;
        btnElement.parentNode.appendChild(expDiv);
        btnElement.remove(); // Remove button once explained

        chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;

    } catch (e) {
        console.error(e);
        btnElement.innerHTML = 'Error. Try again';
        btnElement.disabled = false;
    }
}

// --- SESSION SUMMARY (END CHAT) ---
async function generateSessionSummary() {
    if (chatHistory.length <= 3) {
        alert("Have a conversation first before getting notes!");
        return;
    }

    btnEndSession.disabled = true;
    btnEndSession.textContent = "Generating Notes...";
    micStatus.textContent = "Analyzing conversation...";
    btnRecordStart.disabled = true;

    const summaryPrompt = `The conversation has ended. Please do TWO things based ONLY on the mistakes the student made and vocabulary they struggled with in this specific conversation:
    1. Provide a VERY CONCISE set of study notes. Format it in a clean HTML string with <h3> and <ul> elements. Include a 'Feedback & Corrections' section and an 'Example Sentences' section.
    2. At the very end of your response, output a strict JSON array wrapped in a <json> tag containing exactly 3-5 new flashcards for the student to practice. Format: <json>[{"it":"Italian word/phrase", "en":"English translation"}]</json>.
    Do not use markdown wrappers like \`\`\`html. Check your JSON syntax carefully.`;

    let summaryHistory = [...chatHistory, { role: 'user', content: summaryPrompt }];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: summaryHistory,
                max_tokens: 500
            })
        });

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        let notes = data.choices[0].message.content.replace(/```html|```|```json/g, ''); // strip markdown blocks

        let customCardsArr = [];
        const jsonMatch = notes.match(/<json>([\s\S]*?)<\/json>/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                customCardsArr = JSON.parse(jsonMatch[1].trim());
            } catch (e) { console.error("Could not parse flashcards JSON", e); }
            // Remove the JSON block from the HTML notes
            notes = notes.replace(jsonMatch[0], '');
        }

        if (customCardsArr.length > 0) {
            // Append new cards to custom vocab without duplicates
            customCardsArr.forEach(newCard => {
                if (!vocabData.custom.find(c => c.it.toLowerCase() === newCard.it.toLowerCase())) {
                    vocabData.custom.push(newCard);
                }
            });
            saveCustomVocab();
            notes += `<h3 class="mt-4">Added ${customCardsArr.length} new cards to the 'My Mistakes' Flashcards!</h3>`;

            // Auto switch category to custom if they jump to Learn tab
            document.getElementById('category-select').value = 'custom';
            currentCategory = 'custom';
            currentCardIndex = 0;
            loadFlashcard();
        }

        chatInterface.classList.add('hidden');
        sessionSummary.classList.remove('hidden');
        summaryContent.innerHTML = notes.trim();

    } catch (e) {
        console.error(e);
        micStatus.textContent = "Error generating notes.";
        alert("Could not generate summary.");
    }

    btnEndSession.disabled = false;
    btnEndSession.textContent = "End Chat & Get Notes";
    btnRecordStart.disabled = false;
    isManualRecording = false;
}


// Start app
document.addEventListener('DOMContentLoaded', init);
