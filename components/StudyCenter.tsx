
import React, { useState, useEffect } from 'react';
import { DEMOCRACY_DIMENSIONS, CONCEPT_FLASHCARDS, QUIZ_LEVELS } from '../constants';
import { Flashcard, QuizLevel, QuizQuestion } from '../types';
import { Layers, Brain, ChevronLeft, ChevronRight, Trophy, Lock, Unlock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

type Mode = 'menu' | 'flashcards' | 'quiz';

const StudyCenter: React.FC = () => {
  const [mode, setMode] = useState<Mode>('menu');

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {mode === 'menu' && <StudyMenu onSelect={setMode} />}
      {mode === 'flashcards' && <FlashcardDeckSelection onBack={() => setMode('menu')} />}
      {mode === 'quiz' && <QuizLevelSelect onBack={() => setMode('menu')} />}
    </div>
  );
};

const StudyMenu: React.FC<{ onSelect: (mode: Mode) => void }> = ({ onSelect }) => (
  <div className="max-w-4xl mx-auto w-full space-y-8 p-4">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-serif font-bold text-uwm-black">Study Center</h2>
      <p className="text-gray-600">Master the Lijphart Framework through active recall.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button 
        onClick={() => onSelect('flashcards')}
        className="group bg-white p-8 rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 transition-all flex flex-col items-center text-center space-y-4"
      >
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Layers size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Flashcards</h3>
          <p className="text-sm text-gray-500 mt-2">Review dimensions and key concepts like "Manufactured Majority".</p>
        </div>
      </button>

      <button 
        onClick={() => onSelect('quiz')}
        className="group bg-white p-8 rounded-xl shadow-sm border-2 border-transparent hover:border-uwm-gold transition-all flex flex-col items-center text-center space-y-4"
      >
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Brain size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Tiered Quiz</h3>
          <p className="text-sm text-gray-500 mt-2">Progress from Novice to Expert. Unlock levels by passing.</p>
        </div>
      </button>
    </div>
  </div>
);

// --- FLASHCARDS COMPONENTS ---

const FlashcardDeckSelection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedDeck, setSelectedDeck] = useState<Flashcard[] | null>(null);

  // Convert Dimensions to Flashcard format
  const dimensionCards: Flashcard[] = DEMOCRACY_DIMENSIONS.map(d => ({
    id: d.id,
    category: 'Dimension',
    front: d.name,
    back: `Westminster: ${d.westminster}\n\nConsensus: ${d.consensus}`
  }));

  if (selectedDeck) {
    return <FlashcardPlayer cards={selectedDeck} onBack={() => setSelectedDeck(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-4 space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black mb-4">← Back to Menu</button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Deck</h2>
      
      <div className="grid gap-4">
        <button 
          onClick={() => setSelectedDeck(dimensionCards)}
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-all text-left flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">Core Dimensions</h3>
            <p className="text-sm text-gray-500">The 10 institutional variables (Ch 4-13)</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{dimensionCards.length} Cards</span>
        </button>

        <button 
          onClick={() => setSelectedDeck(CONCEPT_FLASHCARDS)}
          className="p-6 bg-white border rounded-xl hover:shadow-md transition-all text-left flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">Key Concepts</h3>
            <p className="text-sm text-gray-500">Specific terminology (e.g., Magic Formula, Corporatism)</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">{CONCEPT_FLASHCARDS.length} Cards</span>
        </button>
      </div>
    </div>
  );
};

const FlashcardPlayer: React.FC<{ cards: Flashcard[], onBack: () => void }> = ({ cards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 200);
  };

  return (
    <div className="max-w-2xl mx-auto w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black font-medium">← Back to Decks</button>
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Card {currentIndex + 1} of {cards.length}</span>
      </div>

      <div 
        className="w-full aspect-[16/10] cursor-pointer group perspective-1000"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-all duration-500"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          
          {/* Front Face */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' 
            }}
          >
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4 bg-blue-50 px-3 py-1 rounded-full">
              {currentCard.category}
            </span>
            <h3 className="text-3xl font-serif font-bold text-gray-900 text-center">{currentCard.front}</h3>
            <p className="text-xs text-gray-400 absolute bottom-6">Click to flip</p>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 w-full h-full bg-uwm-black rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white text-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
             <p className="text-lg leading-relaxed whitespace-pre-wrap">{currentCard.back}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button onClick={(e) => { e.stopPropagation(); prevCard(); }} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 text-gray-600">
          <ChevronLeft />
        </button>
        <button onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }} className="px-6 py-3 bg-uwm-gold text-uwm-black font-bold rounded-lg shadow-sm hover:bg-yellow-400 transition-colors min-w-[140px]">
          {isFlipped ? 'Show Term' : 'Show Definition'}
        </button>
        <button onClick={(e) => { e.stopPropagation(); nextCard(); }} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 text-gray-600">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};


// --- QUIZ COMPONENTS ---

const QuizLevelSelect: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [activeLevel, setActiveLevel] = useState<QuizLevel | null>(null);

  const handleLevelComplete = (level: number, scorePercent: number) => {
    if (scorePercent >= 70) {
      if (!unlockedLevels.includes(level + 1)) {
        setUnlockedLevels([...unlockedLevels, level + 1]);
      }
    }
  };

  if (activeLevel) {
    return (
      <QuizEngine 
        level={activeLevel} 
        onComplete={(score) => handleLevelComplete(activeLevel.level, score)}
        onExit={() => setActiveLevel(null)} 
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full p-4 space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-uwm-black mb-4">← Back to Menu</button>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Challenge Levels</h2>
        <p className="text-gray-500">Score 70% or higher to unlock the next level.</p>
      </div>

      <div className="grid gap-4">
        {QUIZ_LEVELS.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.level);
          return (
            <button
              key={lvl.level}
              disabled={!isUnlocked}
              onClick={() => setActiveLevel(lvl)}
              className={`p-6 rounded-xl border-2 transition-all flex items-center justify-between text-left ${
                isUnlocked 
                  ? 'bg-white border-gray-200 hover:border-uwm-gold hover:shadow-md cursor-pointer' 
                  : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  isUnlocked ? 'bg-uwm-black text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {lvl.level}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{lvl.title}</h3>
                  <p className="text-sm text-gray-500">{lvl.description}</p>
                </div>
              </div>
              <div className="text-gray-400">
                {isUnlocked ? <Unlock size={20} className="text-green-500" /> : <Lock size={20} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const QuizEngine: React.FC<{ level: QuizLevel, onComplete: (score: number) => void, onExit: () => void }> = ({ level, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = level.questions[currentQIndex];

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    
    const correct = option === question.correctAnswer;
    setSelectedOption(option);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    if (currentQIndex < level.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0); // Calculate final score properly
      const finalScorePercent = (finalScore / level.questions.length) * 100;
      setShowResults(true);
      onComplete(finalScorePercent);
    }
  };

  if (showResults) {
    const displayScore = isCorrect ? score + 1 : score;
    const percentage = Math.round((displayScore / level.questions.length) * 100);
    const passed = percentage >= level.minScoreToUnlock;

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
        <div className={`p-10 rounded-2xl shadow-lg max-w-md w-full border-t-8 ${passed ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`}>
          {passed ? <Trophy className="w-16 h-16 text-uwm-gold mx-auto mb-4" /> : <RotateCcw className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{passed ? 'Level Complete!' : 'Try Again'}</h2>
          <p className="text-gray-500 mb-6">You scored</p>
          
          <div className="text-6xl font-black text-uwm-black mb-6">
            {percentage}%
          </div>

          <p className="text-sm text-gray-600 mb-8">
            {passed 
              ? level.level === 3 ? "You are a master of comparative politics!" : "Next level unlocked."
              : `You need ${level.minScoreToUnlock}% to advance.`}
          </p>

          <button onClick={onExit} className="w-full py-3 rounded-lg bg-uwm-black text-white font-bold hover:bg-gray-800">
            Return to Levels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-6 flex flex-col h-full justify-center">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Level {level.level}: {level.title}</span>
          <span className="text-xs font-bold text-gray-400">Q{currentQIndex + 1}/{level.questions.length}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-uwm-gold transition-all duration-500 ease-out"
            style={{ width: `${((currentQIndex) / level.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedOption === null 
                  ? 'border-gray-100 hover:border-blue-200 hover:bg-blue-50' 
                  : option === question.correctAnswer 
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : selectedOption === option 
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-100 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption && option === question.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                {selectedOption === option && option !== question.correctAnswer && <XCircle size={20} className="text-red-600" />}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback Area */}
        <div className={`mt-6 overflow-hidden transition-all duration-300 ${selectedOption ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 border-l-4 border-uwm-black">
            <span className="font-bold block mb-1">Explanation:</span>
            {question.explanation}
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={next} className="px-6 py-2 bg-uwm-black text-white font-bold rounded-lg hover:bg-gray-800">
              {currentQIndex < level.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCenter;
