import React, { useState } from "react";

// Simple CBSE Class 10 Chemistry KBC-style quiz game
// Drop this component into a React app (e.g., App.jsx) and render it.

const QUESTIONS = [
  {
    level: "Easy",
    money: "₹1,000",
    question: "Which gas is released when Zinc reacts with Hydrochloric acid?",
    options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
    correctIndex: 2,
    score: 10,
    hint: "It is a colourless gas that burns with a pop sound.",
  },
  {
    level: "Easy",
    money: "₹2,000",
    question: "Which of the following is a base?",
    options: ["HCl", "H₂SO₄", "NaOH", "CO₂"],
    correctIndex: 2,
    score: 10,
    hint: "It is a common strong alkali used in soaps.",
  },
  {
    level: "Easy",
    money: "₹5,000",
    question: "Burning of a candle is an example of which type of reaction?",
    options: ["Endothermic", "Exothermic", "Displacement", "Photochemical"],
    correctIndex: 1,
    score: 10,
    hint: "Does it release heat or absorb heat?",
  },
  {
    level: "Medium",
    money: "₹10,000",
    question: "The chemical formula of washing soda is:",
    options: ["NaCl", "Na₂CO₃·10H₂O", "NaHCO₃", "CaCO₃"],
    correctIndex: 1,
    score: 15,
    hint: "It is hydrated sodium carbonate.",
  },
  {
    level: "Medium",
    money: "₹20,000",
    question: "Which metal is stored in kerosene?",
    options: ["Iron", "Sodium", "Copper", "Aluminium"],
    correctIndex: 1,
    score: 15,
    hint: "It is a very soft and highly reactive metal.",
  },
  {
    level: "Medium",
    money: "₹40,000",
    question: "Identify the reaction: CaO + H₂O → Ca(OH)₂",
    options: ["Decomposition", "Displacement", "Combination", "Double displacement"],
    correctIndex: 2,
    score: 15,
    hint: "Two substances combine to form a single product.",
  },
  {
    level: "Medium",
    money: "₹80,000",
    question: "What happens to blue litmus paper in an acid?",
    options: ["Turns red", "Turns green", "No change", "Turns yellow"],
    correctIndex: 0,
    score: 15,
    hint: "Acids turn this colour.",
  },
  {
    level: "Hard",
    money: "₹1,60,000",
    question: "What is corrosion?",
    options: [
      "Shining of metals",
      "Damage of metals by air and moisture",
      "Formation of bases",
      "Reaction of metal with acid only",
    ],
    correctIndex: 1,
    score: 20,
    hint: "Think of rusting of iron.",
  },
  {
    level: "Hard",
    money: "₹3,20,000",
    question: "On strong heating, CaCO₃ gives:",
    options: ["Ca + CO₂", "CaO + CO₂", "Ca(OH)₂ + CO₂", "CaO + H₂O"],
    correctIndex: 1,
    score: 20,
    hint: "It decomposes into calcium oxide and a gas.",
  },
  {
    level: "Hard",
    money: "₹6,40,000",
    question: "Which is more reactive: Sodium or Calcium?",
    options: ["Calcium", "Sodium", "Both same", "None"],
    correctIndex: 1,
    score: 20,
    hint: "It is placed above the other in the reactivity series.",
  },
  // --- Added: Acids, Bases & Salts (10 questions) ---
  {
    level: "Medium",
    money: "₹7,50,000",
    question: "Which acid is present in lemon?",
    options: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Sulphuric acid"],
    correctIndex: 1,
    score: 15,
    hint: "It is named after citrus fruits.",
  },
  {
    level: "Medium",
    money: "₹8,00,000",
    question: "Which base is used in making soap?",
    options: ["Calcium hydroxide", "Sodium hydroxide", "Ammonium hydroxide", "Potassium nitrate"],
    correctIndex: 1,
    score: 15,
    hint: "Also called caustic soda.",
  },
  {
    level: "Medium",
    money: "₹8,50,000",
    question: "What is the pH value of a neutral solution?",
    options: ["0", "7", "14", "5"],
    correctIndex: 1,
    score: 15,
    hint: "It lies exactly in the middle of the pH scale.",
  },
  {
    level: "Medium",
    money: "₹9,00,000",
    question: "Which gas is produced when an acid reacts with a metal carbonate?",
    options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
    correctIndex: 2,
    score: 15,
    hint: "It turns lime water milky.",
  },
  {
    level: "Medium",
    money: "₹9,50,000",
    question: "Which salt is called baking soda?",
    options: ["NaCl", "NaHCO₃", "Na₂CO₃", "CaCO₃"],
    correctIndex: 1,
    score: 15,
    hint: "Used in cakes and bread.",
  },
  {
    level: "Hard",
    money: "₹10,00,000",
    question: "Which acid is present in the stomach?",
    options: ["Sulphuric acid", "Nitric acid", "Hydrochloric acid", "Citric acid"],
    correctIndex: 2,
    score: 20,
    hint: "Helps in digestion.",
  },
  {
    level: "Hard",
    money: "₹11,00,000",
    question: "Tooth decay starts when pH of mouth falls below:",
    options: ["7.0", "6.5", "5.5", "4.5"],
    correctIndex: 2,
    score: 20,
    hint: "It is slightly acidic.",
  },
  {
    level: "Hard",
    money: "₹12,00,000",
    question: "Which salt is used to remove hardness of water?",
    options: ["Baking soda", "Washing soda", "Bleaching powder", "Common salt"],
    correctIndex: 1,
    score: 20,
    hint: "Used in laundry and softening water.",
  },
  {
    level: "Hard",
    money: "₹13,00,000",
    question: "Which indicator is naturally obtained from lichens?",
    options: ["Litmus", "Methyl orange", "Phenolphthalein", "Turmeric"],
    correctIndex: 0,
    score: 20,
    hint: "Used to test acids and bases.",
  },
  {
    level: "Hard",
    money: "₹15,00,000",
    question: "Which substance is used to neutralize acidic soil in farms?",
    options: ["Slaked lime", "Baking soda", "Vinegar", "Bleaching powder"],
    correctIndex: 0,
    score: 20,
    hint: "It is calcium hydroxide.",
  },

  // --- Added: Metals & Non-metals (10 questions) ---
  {
    level: "Easy",
    money: "₹16,00,000",
    question: "Which of the following is a non-metal?",
    options: ["Iron", "Copper", "Sulphur", "Aluminium"],
    correctIndex: 2,
    score: 10,
    hint: "It is a yellow coloured non-metal.",
  },
  {
    level: "Easy",
    money: "₹17,00,000",
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Aluminium", "Sodium"],
    correctIndex: 1,
    score: 10,
    hint: "Used in thermometers.",
  },
  {
    level: "Medium",
    money: "₹18,00,000",
    question: "Which gas is essential for combustion?",
    options: ["Hydrogen", "Carbon dioxide", "Oxygen", "Nitrogen"],
    correctIndex: 2,
    score: 15,
    hint: "Supports burning.",
  },
  {
    level: "Medium",
    money: "₹19,00,000",
    question: "Which metal is used for galvanisation of iron?",
    options: ["Copper", "Zinc", "Silver", "Lead"],
    correctIndex: 1,
    score: 15,
    hint: "Coating prevents rusting.",
  },
  {
    level: "Medium",
    money: "₹20,00,000",
    question: "Which property of metals allows them to be drawn into wires?",
    options: ["Malleability", "Ductility", "Conductivity", "Sonority"],
    correctIndex: 1,
    score: 15,
    hint: "Used in making electric wires.",
  },
  {
    level: "Hard",
    money: "₹21,00,000",
    question: "Which metal is extracted by electrolysis?",
    options: ["Iron", "Zinc", "Aluminium", "Copper"],
    correctIndex: 2,
    score: 20,
    hint: "Obtained from bauxite.",
  },
  {
    level: "Hard",
    money: "₹22,00,000",
    question: "Which non-metal is the best conductor of electricity?",
    options: ["Sulphur", "Carbon (graphite)", "Phosphorus", "Chlorine"],
    correctIndex: 1,
    score: 20,
    hint: "Used in pencils.",
  },
  {
    level: "Hard",
    money: "₹23,00,000",
    question: "Which metal is the main constituent of steel?",
    options: ["Aluminium", "Copper", "Iron", "Nickel"],
    correctIndex: 2,
    score: 20,
    hint: "Used in construction.",
  },
  {
    level: "Hard",
    money: "₹24,00,000",
    question: "Which process is used to prevent rusting?",
    options: ["Electrolysis", "Galvanisation", "Distillation", "Evaporation"],
    correctIndex: 1,
    score: 20,
    hint: "Zinc coating on iron.",
  },
  {
    level: "Hard",
    money: "₹25,00,000",
    question: "Which of the following is the most reactive metal?",
    options: ["Iron", "Zinc", "Potassium", "Copper"],
    correctIndex: 2,
    score: 20,
    hint: "Placed at the top of reactivity series.",
  },
  // --- Short Answer Practice (examples) ---
  {
    level: "Short Answer",
    money: "Practice",
    type: "short",
    question: "Name the gas released when zinc reacts with dilute hydrochloric acid.",
    acceptableAnswers: ["hydrogen", "hydrogen gas", "h2"],
    score: 10,
    hint: "It burns with a pop sound.",
  },
  {
    level: "Short Answer",
    money: "Practice",
    type: "short",
    question: "What is the pH of a neutral solution at 25°C?",
    acceptableAnswers: ["7", "ph 7", "seven"],
    score: 10,
    hint: "It lies at the centre of the pH scale.",
  },
  {
    level: "Short Answer",
    money: "Practice",
    type: "short",
    question: "Write the IUPAC name of CH₃–CH₂–OH.",
    acceptableAnswers: ["ethanol"],
    score: 10,
    hint: "It is a common alcohol used in spirits.",
  },
  {
    level: "Short Answer",
    money: "Practice",
    type: "short",
    question: "Which property of metals allows them to be beaten into thin sheets?",
    acceptableAnswers: ["malleability", "it is malleable"],
    score: 10,
    hint: "Aluminium foil is an example.",
  },
  {
    level: "Short Answer",
    money: "Practice",
    type: "short",
    question: "Name the acid present in vinegar.",
    acceptableAnswers: ["acetic acid", "ethanoic acid"],
    score: 10,
    hint: "Also called ethanoic acid.",
  },
];

const MAX_LIVES = 3;

const ChemistryKBCGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [usedSkip, setUsedSkip] = useState(false);
  const [usedDouble, setUsedDouble] = useState(false);
  const [doubleActive, setDoubleActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [showCorrectText, setShowCorrectText] = useState(false);

  const question = QUESTIONS[currentIndex];

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setLives(MAX_LIVES);
    setMessage("");
    setLocked(false);
    setUsedHint(false);
    setUsedSkip(false);
    setUsedDouble(false);
    setDoubleActive(false);
    setShowSummary(false);
    setSelectedIndex(null);
    setShortAnswer("");
    setShowCorrectText(false);
  };

  const handleAnswer = (index) => {
    setSelectedIndex(index);
    if (locked || showSummary) return;

    const isCorrect = index === question.correctIndex;
    setLocked(true);

    if (isCorrect) {
      const gained = doubleActive ? question.score * 2 : question.score;
      setScore((prev) => prev + gained);
      setMessage(`Correct! You earned ${gained} points.`);
      setDoubleActive(false);
    } else {
      setLives((prev) => prev - 1);
      setMessage("Oops! That's incorrect.");
      setDoubleActive(false);
    }

    setTimeout(() => {
      setShowCorrectText(false);
      const nextLives = isCorrect ? lives : lives - 1;
      const isLastQuestion = currentIndex === QUESTIONS.length - 1;

      if (nextLives <= 0 || isLastQuestion) {
        setShowSummary(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedIndex(null);
        setShortAnswer("");
        setMessage("");
        setLocked(false);
      }
    }, 1200);
  };

  const handleShortAnswer = () => {
    if (locked || showSummary) return;
    if (!shortAnswer.trim()) {
      setMessage("Please type an answer before submitting.");
      return;
    }

    const normalized = shortAnswer.trim().toLowerCase();
    const acceptable = (question.acceptableAnswers || []).map((a) => a.toLowerCase());
    const isCorrect = acceptable.some(
      (ans) => normalized === ans || normalized.includes(ans)
    );

    setLocked(true);
    setShowCorrectText(!isCorrect);

    if (isCorrect) {
      const gained = doubleActive ? question.score * 2 : question.score;
      setScore((prev) => prev + gained);
      setMessage(`Correct! You earned ${gained} points.`);
      setDoubleActive(false);
    } else {
      setLives((prev) => prev - 1);
      const correctText = acceptable[0] || "Check your textbook solution.";
      setMessage(`Not correct. Example correct answer: "${correctText}"`);
      setDoubleActive(false);
    }

    setTimeout(() => {
      const nextLives = isCorrect ? lives : lives - 1;
      const isLastQuestion = currentIndex === QUESTIONS.length - 1;

      if (nextLives <= 0 || isLastQuestion) {
        setShowSummary(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedIndex(null);
        setShortAnswer("");
        setShowCorrectText(false);
        setMessage("");
        setLocked(false);
      }
    }, 1600);
  };

  const handleHint = () => {
    if (usedHint || locked || showSummary) return;
    setUsedHint(true);
    setMessage(question.hint || "Think carefully about the concept.");
                                                                                                                                                };

  const handleSkip = () => {
    if (usedSkip || locked || showSummary) return;
    setUsedSkip(true);
    setMessage("Question skipped. No points gained or lost.");
    setLocked(true);

    setTimeout(() => {
      const isLastQuestion = currentIndex === QUESTIONS.length - 1;
      if (isLastQuestion) {
        setShowSummary(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setShortAnswer("");
        setMessage("");
        setLocked(false);
      }
    }, 800);
  };

  const handleDouble = () => {
    if (usedDouble || locked || showSummary) return;
    setUsedDouble(true);
    setDoubleActive(true);
    setMessage("Double points activated for this question!");
  };

  const getTitle = () => {
    if (score >= 120) return "Chemistry Grandmaster";
    if (score >= 80) return "Chemistry Champion";
    if (score >= 50) return "Rising Scientist";
    return "Needs More Practice";
  };

  const progressPercent = ((currentIndex) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Kaun Banega <span className="text-emerald-400">Chemistry Champion</span>
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              CBSE Class 10 | KBC-style quiz game for your revision.
            </p>
          </div>
          <div className="flex flex-col items-end text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Score:</span>
              <span className="text-lg font-semibold text-emerald-400">{score}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-slate-300">Lives:</span>
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-full ${
                    i < lives ? "bg-rose-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {showSummary ? (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Game Over</h2>
            <p className="text-slate-200 mb-2">Final Score: {score}</p>
            <p className="text-emerald-300 font-medium mb-4">Title: {getTitle()}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-2 text-xs sm:text-sm text-slate-300">
                <span>
                  Q{currentIndex + 1} of {QUESTIONS.length} • {question.level}
                </span>
                <span className="font-medium text-amber-300">Prize: {question.money}</span>
              </div>
              <p className="text-lg sm:text-xl font-semibold mb-4">
                {question.question}
              </p>

              {question.type === "short" ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Type your answer here"
                    value={shortAnswer}
                    onChange={(e) => setShortAnswer(e.target.value)}
                    disabled={locked}
                  />
                  {showCorrectText && question.acceptableAnswers && (
                    <p className="text-xs text-slate-300">
                      Example correct answer: <span className="text-emerald-300">{question.acceptableAnswers[0]}</span>
                    </p>
                  )}
                  <button
                    onClick={handleShortAnswer}
                    disabled={locked}
                    className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-300"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((opt, idx) => {
                    const isCorrect = idx === question.correctIndex;
                    const showCorrect = locked && idx === selectedIndex && isCorrect;
                    const showWrong = locked && idx === selectedIndex && !isCorrect;
                    return (
                      <button
                        key={idx}
                        disabled={locked}
                        onClick={() => handleAnswer(idx)}
                        className={`text-left px-3 py-3 rounded-xl border text-sm sm:text-base transition-all ${
                          locked
                            ? showCorrect
                              ? "bg-emerald-500/90 border-emerald-300 text-slate-900"
                              : showWrong
                              ? "bg-rose-500/90 border-rose-300 text-slate-900"
                              : "bg-slate-800 border-slate-600 text-slate-300"
                            : "bg-slate-800/70 border-slate-600 hover:border-emerald-400 hover:bg-slate-700"
                        }`}
                      >
                        <span className="font-mono mr-2 text-emerald-300">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Lifelines / Power-ups */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleHint}
                  disabled={usedHint || locked}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
                    usedHint || locked
                      ? "bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed"
                      : "bg-slate-900 border-sky-400 text-sky-300 hover:bg-slate-800"
                  }`}
                >
                  💡 Hint {usedHint && "(used)"}
                </button>
                <button
                  onClick={handleSkip}
                  disabled={usedSkip || locked}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
                    usedSkip || locked
                      ? "bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed"
                      : "bg-slate-900 border-amber-400 text-amber-300 hover:bg-slate-800"
                  }`}
                >
                  ⏭️ Skip {usedSkip && "(used)"}
                </button>
                <button
                  onClick={handleDouble}
                  disabled={usedDouble || locked || doubleActive}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border transition ${
                    usedDouble || locked || doubleActive
                      ? "bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed"
                      : "bg-slate-900 border-emerald-400 text-emerald-300 hover:bg-slate-800"
                  }`}
                >
                  ✨ Double Points {usedDouble && "(used)"}
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-300">
                {message ||
                  (doubleActive
                    ? "Double points active! Choose carefully."
                    : "Choose the correct option or use a lifeline.")}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChemistryKBCGame;
