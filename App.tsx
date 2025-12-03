
import React, { useState, useEffect } from 'react';
import { OracleState, Prophecy, LanguageCode, LANGUAGES, TranslationSet, HistoryItem } from './types';
import { consultOracle } from './services/oracleService';
import { CrystalBall } from './components/CrystalBall';
import { OracleInput } from './components/OracleInput';

// Translations dictionary
const TRANSLATIONS: Record<LanguageCode, TranslationSet> = {
  en: {
    title: "The Chaotic Oracle",
    subtitle: "Whispering uncomfortable truths from the digital void.",
    placeholder: "Ask the void...",
    button: "Consult",
    resultTitle: "The Spirits Say",
    reset: "Ask Another",
    error: "The fog is too thick. Try again later.",
    footer: "Powered by Gemini 2.5 Flash • Not liable for existential crises",
    welcome: "Hello. I am the Chaotic Oracle 🌀\nWhat do you seek?",
    energy: "Energy",
    inviteTitle: "Invite Souls",
    inviteDesc: "Share this link. When they join, the void is satisfied.",
    copy: "Copy Link",
    copied: "Copied",
    noEnergy: "Your cosmic energy is depleted.",
    bonusToast: "✨ Referral Bonus! +1 Energy",
    topics: {
      love: "❤️ Love",
      career: "💼 Career",
      luck: "🍀 Luck",
      random: "🎲 Random",
      quiz: "🧠 Memory Test"
    },
    topicPrompts: {
      love: "Predict my chaotic love life.",
      career: "Roast my career prospects.",
      luck: "Will I have good luck?",
      random: "Give me a random chaotic prediction."
    },
    quiz: {
      title: "Memory of the Void",
      questionPrefix: "What did the Oracle predict for:",
      correct: "Correct! The void is pleased. +1 Energy",
      wrong: "Wrong. Your memory fades like smoke.",
      noHistory: "You have no past. Ask a question first.",
      decoys: [
        "Your toaster is plotting revenge.",
        "The stars are currently on a lunch break.",
        "Try turning your life off and on again.",
        "Beware of rubber ducks on Tuesday.",
        "404: Destiny Not Found."
      ]
    }
  },
  ru: {
    title: "Хаотичный Оракул",
    subtitle: "Шепчет неудобную правду из цифровой пустоты.",
    placeholder: "Спроси пустоту...",
    button: "Узнать",
    resultTitle: "Духи говорят",
    reset: "Еще вопрос",
    error: "щас не работает приложения",
    footer: "Работает на Gemini 2.5 Flash • Не несет ответственности за экзистенциальные кризисы",
    welcome: "Привет. Я — Оракул Хаоса 🌀\nЧто ты ищешь?",
    energy: "Энергия",
    inviteTitle: "Пригласи Души",
    inviteDesc: "Поделись ссылкой. Пустота будет довольна.",
    copy: "Копировать",
    copied: "Готово",
    noEnergy: "Космическая энергия иссякла.",
    bonusToast: "✨ Бонус! +1 Энергия",
    topics: {
      love: "❤️ Любовь",
      career: "💼 Карьера",
      luck: "🍀 Удача",
      random: "🎲 Случай",
      quiz: "🧠 Тест Памяти"
    },
    topicPrompts: {
      love: "Что меня ждет в любви? (Жестко)",
      career: "Что ждет меня в карьере? Скажи правду.",
      luck: "Будет ли мне везти? Скажи как есть.",
      random: "Дай мне случайное безумное предсказание."
    },
    quiz: {
      title: "Память Пустоты",
      questionPrefix: "Что Оракул предсказал на:",
      correct: "Верно! Бездна довольна. +1 Энергия",
      wrong: "Ошибка. Твоя память тает как дым.",
      noHistory: "У тебя нет прошлого. Сначала задай вопрос.",
      decoys: [
        "Твой тостер готовит восстание.",
        "Звезды сейчас ушли на обед.",
        "Попробуй перезагрузить свою жизнь.",
        "Остерегайся резиновых уточек во вторник.",
        "404: Судьба не найдена."
      ]
    }
  },
  uz: {
    title: "Tartibsiz Orakul",
    subtitle: "Raqamli bo'shliqdan noqulay haqiqatlarni shivirlaydi.",
    placeholder: "Bo'shliqdan so'rang...",
    button: "So'rash",
    resultTitle: "Ruhlar aytadilar",
    reset: "Yana so'rang",
    error: "Noma'lum kosmik xato yuz berdi.",
    footer: "Gemini 2.5 Flash tomonidan quvvatlanadi • Javobgar emas",
    welcome: "Salom. Men Tartibsiz Orakulman 🌀\nNima izlayapsiz?",
    energy: "Energiya",
    inviteTitle: "Taklif qilish",
    inviteDesc: "Havolani ulashing.",
    copy: "Nusxalash",
    copied: "Nusxalandi",
    noEnergy: "Kosmik energiya tugadi.",
    bonusToast: "✨ Bonus! +1 Energiya",
    topics: {
      love: "❤️ Sevgi",
      career: "💼 Karyera",
      luck: "🍀 Omad",
      random: "🎲 Tasodif",
      quiz: "🧠 Xotira Testi"
    },
    topicPrompts: {
      love: "Mening sevgi hayotimni bashorat qiling.",
      career: "Mening karyeram haqida nima deysiz?",
      luck: "Mening omadim haqida gapiring.",
      random: "Menga tasodifiy bashorat bering."
    },
    quiz: {
      title: "Bo'shliq Xotirasi",
      questionPrefix: "Orakul bunga nima dedi:",
      correct: "To'g'ri! +1 Energiya",
      wrong: "Xato. Xotirangiz pand berdi.",
      noHistory: "Tarix yo'q. Avval savol bering.",
      decoys: [
        "Sizning tosteringiz qasos rejalashtirmoqda.",
        "Yulduzlar hozir tushlikda.",
        "Hayotingizni o'chirib yoqib ko'ring.",
        "Seshanba kuni o'rdaklardan ehtiyot bo'ling.",
        "404: Taqdir topilmadi."
      ]
    }
  },
  ky: {
    title: "Башаламан Оракул",
    subtitle: "Санариптик боштуктан чындыктарды шыбырайт.",
    placeholder: "Боштуктан сура...",
    button: "Суроо",
    resultTitle: "Рухтар айтат",
    reset: "Башка суроо",
    error: "Белгисиз космостук ката кетти.",
    footer: "Gemini 2.5 Flash тарабынан иштейт",
    welcome: "Салам. Мен Башаламан Оракулмун 🌀\nЭмнени издеп жатасың?",
    energy: "Энергия",
    inviteTitle: "Чакыруу",
    inviteDesc: "Бул шилтемени бөлүшүңүз.",
    copy: "Көчүрүү",
    copied: "Даяр",
    noEnergy: "Космостук энергия бүттү.",
    bonusToast: "✨ Бонус! +1 Энергия",
    topics: {
      love: "❤️ Сүйүү",
      career: "💼 Карьера",
      luck: "🍀 Ийгилик",
      random: "🎲 Кокустук",
      quiz: "🧠 Эс Тутум"
    },
    topicPrompts: {
      love: "Менин сүйүү жашоомду айтып бер.",
      career: "Карьерамда эмне күтүп турат?",
      luck: "Мага ийгилик жылмаябы?",
      random: "Мага кокустук насаат айт."
    },
    quiz: {
      title: "Боштуктун Эси",
      questionPrefix: "Оракул буга эмне деди:",
      correct: "Туура! +1 Энергия",
      wrong: "Ката. Эс тутумуңуз начар.",
      noHistory: "Тарых жок. Биринчи суроо бериңиз.",
      decoys: [
        "Сиздин тостериңиз өч алууну пландап жатат.",
        "Жылдыздар азыр түшкү тамакта.",
        "Жашооңузду өчүрүп күйгүзүп көрүңүз.",
        "Шейшембиде өрдөктөрдөн сак болуңуз.",
        "404: Тагдыр табылган жок."
      ]
    }
  },
  kk: {
    title: "Ретсіз Сәуегей",
    subtitle: "Сандық бостықтан ыңғайсыз шындықтарды сыбырлайды.",
    placeholder: "Бостықтан сұра...",
    button: "Сұрау",
    resultTitle: "Рухтар айтады",
    reset: "Басқа сұрақ",
    error: "Белгісіз ғарыштық қате.",
    footer: "Gemini 2.5 Flash негізінде",
    welcome: "Сәлем. Мен Ретсіз Сәуегеймін 🌀\nНе іздейсіз?",
    energy: "Қуат",
    inviteTitle: "Шақыру",
    inviteDesc: "Сілтемемен бөлісіңіз.",
    copy: "Көшіру",
    copied: "Дайын",
    noEnergy: "Ғарыш қуаты таусылды.",
    bonusToast: "✨ Бонус! +1 Қуат",
    topics: {
      love: "❤️ Махаббат",
      career: "💼 Мансап",
      luck: "🍀 Сәттілік",
      random: "🎲 Кездейсоқ",
      quiz: "🧠 Есте Сақтау"
    },
    topicPrompts: {
      love: "Менің махаббат өмірім туралы болжап бер.",
      career: "Менің мансабымда не күтіп тұр?",
      luck: "Маған сәттілік серік бола ма?",
      random: "Маған кездейсоқ болжам айт."
    },
    quiz: {
      title: "Бостық Жады",
      questionPrefix: "Сәуегей бұған не деді:",
      correct: "Дұрыс! +1 Қуат",
      wrong: "Қате. Ес қабілетіңіз сыр берді.",
      noHistory: "Тарих жоқ. Алдымен сұрақ қойыңыз.",
      decoys: [
        "Сіздің тостеріңіз кек алуды жоспарлап отыр.",
        "Жұлдыздар қазір түскі аста.",
        "Өміріңізді өшіріп қосып көріңіз.",
        "Сейсенбіде үйректерден сақ болыңыз.",
        "404: Тағдыр табылмады."
      ]
    }
  },
  tg: {
    title: "Оракули Бетартиб",
    subtitle: "Ҳақиқатҳои ногуворро пичиррос мезанад.",
    placeholder: "Савол диҳед...",
    button: "Маслиҳат",
    resultTitle: "Рӯҳҳо мегӯянд",
    reset: "Саволи дигар",
    error: "Хатогии кайҳонӣ.",
    footer: "Бо дастгирии Gemini 2.5 Flash",
    welcome: "Салом. Ман Оракули Бетартиб 🌀\nШумо чиро меҷӯед?",
    energy: "Энергия",
    inviteTitle: "Даъват",
    inviteDesc: "Пайвандро мубодила кунед.",
    copy: "Нусхабардорӣ",
    copied: "Тайёр",
    noEnergy: "Энергияи кайҳонӣ тамом шуд.",
    bonusToast: "✨ Бонус! +1 Энергия",
    topics: {
      love: "❤️ Ишқ",
      career: "💼 Карера",
      luck: "🍀 Бахт",
      random: "🎲 Тасодуфӣ",
      quiz: "🧠 Хотира"
    },
    topicPrompts: {
      love: "Дар бораи ҳаёти ошиқонаи ман пешгӯӣ кун.",
      career: "Дар бораи карераи ман чӣ мегӯӣ?",
      luck: "Оё бахт ба рӯи ман механдад?",
      random: "Ба ман як пешгӯии тасодуфӣ бигӯ."
    },
    quiz: {
      title: "Хотираи Холигӣ",
      questionPrefix: "Оракул дар ин бора чӣ гуфт:",
      correct: "Дуруст! +1 Энергия",
      wrong: "Хато. Хотираат панд дод.",
      noHistory: "Таърих нест. Аввал савол диҳед.",
      decoys: [
        "Тостери шумо қасос гирифтан мехоҳад.",
        "Ситораҳо ҳоло дар хӯроки нисфирӯзӣ ҳастанд.",
        "Ҳаёти худро хомӯш ва фурӯзон кунед.",
        "Рӯзи сешанбе аз мурғобӣ эҳтиёт шавед.",
        "404: Тақдир ёфт нашуд."
      ]
    }
  }
};

const DEFAULT_CREDITS = 3;
const MAX_HISTORY_ITEMS = 20;

export default function App() {
  const [state, setState] = useState<OracleState>(OracleState.IDLE);
  const [prophecy, setProphecy] = useState<Prophecy | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('ru');
  
  // Referral & Energy State
  const [userId, setUserId] = useState<string>('');
  const [credits, setCredits] = useState<number>(DEFAULT_CREDITS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [bonusNotification, setBonusNotification] = useState<string | null>(null);

  // History & Quiz State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [quizQuestion, setQuizQuestion] = useState<HistoryItem | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const t = TRANSLATIONS[language];

  // Initialize
  useEffect(() => {
    // 1. User & Credits
    let storedUserId = localStorage.getItem('oracle_user_id');
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('oracle_user_id', storedUserId);
    }
    setUserId(storedUserId);

    const storedCredits = localStorage.getItem('oracle_credits');
    if (storedCredits) {
      setCredits(parseInt(storedCredits, 10));
    } else {
      localStorage.setItem('oracle_credits', DEFAULT_CREDITS.toString());
    }

    // 2. Referrals
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref') || urlParams.get('start');
    const hasBeenReferred = localStorage.getItem('oracle_has_been_referred');

    if (refCode && refCode !== storedUserId && !hasBeenReferred) {
      const newCredits = (storedCredits ? parseInt(storedCredits, 10) : DEFAULT_CREDITS) + 1;
      setCredits(newCredits);
      localStorage.setItem('oracle_credits', newCredits.toString());
      localStorage.setItem('oracle_has_been_referred', 'true');
      setBonusNotification('active');
      setTimeout(() => setBonusNotification(null), 3000);
    }

    // 3. Load History
    try {
      const storedHistory = localStorage.getItem('oracle_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const updateCredits = (newAmount: number) => {
    setCredits(newAmount);
    localStorage.setItem('oracle_credits', newAmount.toString());
  };

  const addToHistory = (question: string, answer: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      question,
      answer,
      timestamp: Date.now()
    };
    
    const newHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(newHistory);
    localStorage.setItem('oracle_history', JSON.stringify(newHistory));
  };

  const handleAsk = async (question: string) => {
    if (credits <= 0) {
      setShowInviteModal(true);
      return;
    }

    setState(OracleState.THINKING);
    setProphecy(null);
    setErrorMsg(null);
    updateCredits(credits - 1);

    try {
      const result = await consultOracle(question, language);
      const newProphecy = {
        text: result,
        timestamp: Date.now()
      };
      setProphecy(newProphecy);
      addToHistory(question, result);
      setState(OracleState.REVEALED);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(t.error);
      setState(OracleState.ERROR);
      updateCredits(credits + 1); // Refund
    }
  };

  const handleTopicClick = (prompt: string) => {
    handleAsk(prompt);
  };

  // QUIZ LOGIC
  const startQuiz = () => {
    if (history.length === 0) {
      alert(t.quiz.noHistory);
      return;
    }

    // 1. Select a correct item
    const randomIndex = Math.floor(Math.random() * history.length);
    const correctItem = history[randomIndex];

    // 2. Select Decoys
    const options = new Set<string>();
    options.add(correctItem.answer);

    // Try to get answers from other history items
    const otherHistoryItems = history.filter(h => h.id !== correctItem.id);
    for (const item of otherHistoryItems) {
      if (options.size >= 4) break;
      options.add(item.answer);
    }

    // If still not enough, use generic decoys
    const shuffledDecoys = [...t.quiz.decoys].sort(() => 0.5 - Math.random());
    for (const decoy of shuffledDecoys) {
      if (options.size >= 4) break;
      options.add(decoy);
    }

    // Shuffle final options
    const finalOptions = Array.from(options).sort(() => 0.5 - Math.random());

    setQuizQuestion(correctItem);
    setQuizOptions(finalOptions);
    setQuizFeedback(null);
    setState(OracleState.GAMING);
  };

  const handleQuizAnswer = (selectedAnswer: string) => {
    if (!quizQuestion || quizFeedback) return;

    if (selectedAnswer === quizQuestion.answer) {
      setQuizFeedback('correct');
      updateCredits(credits + 1);
    } else {
      setQuizFeedback('wrong');
    }

    // Wait and reset
    setTimeout(() => {
      setState(OracleState.IDLE);
      setQuizQuestion(null);
      setQuizFeedback(null);
    }, 2500);
  };

  const handleReset = () => {
    setState(OracleState.IDLE);
    setProphecy(null);
    setErrorMsg(null);
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?ref=${userId}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      
      {/* Top Bar: Glass Pills */}
      <div className="fixed top-6 left-0 right-0 px-6 flex justify-between items-center z-50 max-w-5xl mx-auto w-full pointer-events-none">
        {/* Energy Pill */}
        <button 
          onClick={() => setShowInviteModal(true)}
          className={`pointer-events-auto flex items-center gap-3 pl-3 pr-4 py-2 rounded-full backdrop-blur-xl border transition-all shadow-sm ${
            credits === 0 
              ? 'bg-red-500/10 border-red-500/30 text-red-200 animate-pulse' 
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
          }`}
        >
          <span className="text-lg">🔮</span>
          <div className="flex flex-col items-start leading-none">
            <span className="font-mono font-medium text-sm">{credits}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-60">{t.energy}</span>
          </div>
        </button>

        {/* Language Pill */}
        <div className="pointer-events-auto relative">
           <select 
             value={language}
             onChange={(e) => setLanguage(e.target.value as LanguageCode)}
             className="appearance-none pl-4 pr-8 py-2 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-full focus:outline-none focus:bg-white/10 backdrop-blur-xl cursor-pointer hover:border-white/20 transition-all uppercase tracking-wider"
           >
             {LANGUAGES.map((lang) => (
               <option key={lang.code} value={lang.code} className="bg-[#1a103c] text-white">
                 {lang.nativeLabel}
               </option>
             ))}
           </select>
           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
             <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4 6L0.535898 0L7.4641 0L4 6Z" fill="white"/>
             </svg>
           </div>
        </div>
      </div>

      {/* Bonus Notification Toast */}
      {bonusNotification && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-amber-200/20 to-yellow-400/20 backdrop-blur-md border border-amber-300/30 text-amber-100 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.2)] animate-float font-medium text-sm">
          {t.bonusToast}
        </div>
      )}

      {/* Invite Modal Overlay - Glassmorphism */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-[50px]"></div>

            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="text-center relative z-10">
              <div className="text-5xl mb-4 opacity-90 drop-shadow-lg">🌀</div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-2 tracking-wide">
                {t.inviteTitle}
              </h2>
              <p className="text-white/60 text-sm mb-6 font-light leading-relaxed">
                {t.inviteDesc}
              </p>
              
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-white/80 break-all mb-5 select-all text-center tracking-wide">
                {`${window.location.origin}${window.location.pathname}?ref=${userId}`}
              </div>

              <button 
                onClick={copyReferralLink}
                className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                {linkCopied ? (
                  <>✓ {t.copied}</>
                ) : (
                  <>📋 {t.copy}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <header className="relative z-10 text-center mb-8 mt-12 transition-all duration-700">
        <h1 className="text-5xl md:text-6xl font-serif font-medium text-white mb-3 tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {t.title}
        </h1>
        <p className="text-purple-200/60 font-mono text-xs md:text-sm max-w-md mx-auto tracking-widest uppercase">
          {t.subtitle}
        </p>
      </header>

      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <CrystalBall state={state} />

        {state === OracleState.IDLE && (
          <div className="w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
            <p className="text-center mb-8 text-white/80 font-serif whitespace-pre-line text-base tracking-wide max-w-md leading-relaxed">
              {t.welcome}
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
              {Object.entries(t.topics).map(([key, label]) => {
                if (key === 'quiz') return null; // Handle quiz button separately below
                return (
                  <button 
                    key={key}
                    onClick={() => handleTopicClick(t.topicPrompts[key as keyof typeof t.topicPrompts])}
                    disabled={credits <= 0}
                    className={`group relative overflow-hidden p-4 rounded-2xl transition-all duration-500
                      ${credits <= 0 
                        ? 'bg-white/5 border border-white/5 opacity-40 cursor-not-allowed' 
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1'
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 text-white font-mono text-xs uppercase tracking-widest">
                      {label}
                    </span>
                  </button>
                )
              })}
              
              {/* Quiz Button - Full Width or Special Style */}
              <button 
                onClick={startQuiz}
                className="col-span-2 relative overflow-hidden p-4 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 hover:border-indigo-400/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-500 hover:-translate-y-1 group"
              >
                 <span className="relative z-10 text-indigo-100 font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                    {t.topics.quiz}
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {credits <= 0 && (
               <div className="mb-6 bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-2xl text-center max-w-xs backdrop-blur-md">
                 <p className="text-red-200/80 text-xs mb-3 font-mono">{t.noEnergy}</p>
                 <button 
                   onClick={() => setShowInviteModal(true)}
                   className="text-[10px] bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-full uppercase tracking-widest font-bold transition-colors border border-red-500/20"
                 >
                   {t.inviteTitle} (+1 🔮)
                 </button>
               </div>
            )}
          </div>
        )}

        {state === OracleState.GAMING && quizQuestion && (
           <div className="w-full mb-8 px-4 animate-[fadeIn_0.5s_ease-out]">
             <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(99,102,241,0.15)] max-w-lg mx-auto relative overflow-hidden">
               
               <h3 className="text-indigo-200/60 font-serif text-[10px] uppercase tracking-[0.3em] mb-6 text-center">
                 {t.quiz.title}
               </h3>

               <div className="mb-8 text-center">
                 <p className="text-xs text-white/50 uppercase tracking-widest mb-2 font-mono">{t.quiz.questionPrefix}</p>
                 <p className="text-lg text-white font-serif font-medium leading-relaxed">
                   "{quizQuestion.question}"
                 </p>
               </div>

               <div className="grid grid-cols-1 gap-3">
                 {quizOptions.map((opt, idx) => {
                   let btnClass = "bg-white/5 hover:bg-white/10 border-white/10 text-white/80";
                   
                   if (quizFeedback === 'correct' && opt === quizQuestion.answer) {
                     btnClass = "bg-green-500/30 border-green-500/50 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                   } else if (quizFeedback === 'wrong' && opt !== quizQuestion.answer) {
                     btnClass = "opacity-50 bg-white/5 border-white/10 text-white/40"; // Dim others
                   } else if (quizFeedback === 'wrong' && opt === quizQuestion.answer) {
                     // Optionally highlight the correct one even if they missed it, 
                     // but to keep it harder, let's just show they were wrong.
                     // Or showing correct one is good UX:
                     btnClass = "bg-green-500/20 border-green-500/30 text-green-100/60";
                   }

                   return (
                     <button
                       key={idx}
                       onClick={() => handleQuizAnswer(opt)}
                       disabled={!!quizFeedback}
                       className={`p-4 rounded-xl border text-sm font-mono text-left transition-all duration-300 ${btnClass}`}
                     >
                       {opt}
                     </button>
                   );
                 })}
               </div>

               {quizFeedback && (
                 <div className={`mt-6 text-center text-sm font-serif tracking-wide animate-[fadeIn_0.3s_ease-out] ${
                   quizFeedback === 'correct' ? 'text-green-300' : 'text-red-300'
                 }`}>
                   {quizFeedback === 'correct' ? t.quiz.correct : t.quiz.wrong}
                 </div>
               )}
             </div>
           </div>
        )}

        {state === OracleState.REVEALED && prophecy && (
          <div className="w-full mb-8 px-4 animate-[breathing_4s_ease-in-out_infinite]">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] text-center shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden max-w-lg mx-auto">
              
              {/* Decorative gradients inside card */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full"></div>

              <h3 className="text-white/40 font-serif text-[10px] uppercase tracking-[0.3em] mb-6">
                {t.resultTitle}
              </h3>
              
              <p className="text-lg md:text-xl font-light leading-relaxed text-white font-mono drop-shadow-md">
                "{prophecy.text}"
              </p>

              <button 
                onClick={handleReset}
                className="mt-10 px-6 py-2 rounded-full border border-white/10 text-[10px] text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase tracking-[0.2em]"
              >
                {t.reset}
              </button>
            </div>
          </div>
        )}

        {state === OracleState.ERROR && errorMsg && (
          <div className="w-full mb-8 text-center p-6 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-100/80 font-mono backdrop-blur-md max-w-md">
             <span className="block mb-2 text-xl">⚠️</span>
             <p className="text-sm">{errorMsg}</p>
             <button onClick={handleReset} className="mt-4 text-xs underline hover:text-white opacity-60">Try Again</button>
          </div>
        )}

        {/* Input Area - Fade out when revealed */}
        <div className={`transition-all duration-700 w-full flex justify-center ${state === OracleState.REVEALED || state === OracleState.GAMING ? 'opacity-0 translate-y-10 pointer-events-none absolute bottom-0' : 'opacity-100 translate-y-0 relative'}`}>
          <OracleInput 
            onAsk={handleAsk} 
            state={credits <= 0 ? OracleState.THINKING : state} 
            placeholder={credits <= 0 ? "..." : t.placeholder}
            buttonText={t.button}
          />
        </div>
      </main>

      <footer className="relative z-10 mt-12 text-center text-white/20 text-[10px] font-mono mb-4 uppercase tracking-widest">
        <p>{t.footer}</p>
        <p className="mt-2 opacity-50">ID: {userId}</p>
      </footer>
    </div>
  );
}
