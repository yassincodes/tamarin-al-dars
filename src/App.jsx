import { useState } from "react";

const C = {
  green: "#58CC02", greenDark: "#46A302", blue: "#1CB0F6",
  red: "#FF4B4B", orange: "#FF9600", purple: "#CE82FF",
  yellow: "#FFC800", text: "#3C3C3C", muted: "#AFAFAF",
  correct: "#D7FFB8", wrong: "#FFD0D0",
};

const CONFETTI_COLORS = ["#FF4B4B","#58CC02","#1CB0F6","#FFC800","#CE82FF","#FF9600"];

const SALMA_STEPS = [
  {
    id:1, type:"intro",
    title:"رحلة سلمى إلى السوق 🛒",
    subtitle:"ساعد سلمى في حساب مشترياتها",
    story:[
      {emoji:"👩",  text:"أمّ سلمى أرسلتها إلى السوق الأسبوعية"},
      {emoji:"💵",  text:"أعطتها مبلغاً قدره 400 دينار"},
      {emoji:"🥩",  text:"تحتاج لحماً وبطاطا وسمكاً"},
      {emoji:"🧮",  text:"سلمى تريد معرفة ما أنفقت وما تبقّى"},
    ],
  },
  {
    id:2, type:"mcq",
    title:"ثمن اللّحم 🥩",
    question:"اشترت سلمى 3 كلغ من اللحم. ثمن الكيلو 65,500 مليم. كم يكلّف؟",
    hint:"65,500 × 3 = ؟",
    visual:["🥩 65,500","🥩 65,500","🥩 65,500"],
    options:["195,000 مليم","196,500 مليم","196,000 مليم","165,500 مليم"],
    correct:1,
    explanation:"✅ رائع! 65,500 × 3 = 196,500 مليم",
  },
  {
    id:3, type:"mcq",
    title:"ثمن البطاطا 🥔",
    question:"اشترت سلمى 12 كلغ من البطاطا. ثمن الكيلو 2,250 مليم. كم يكلّف؟",
    hint:"2,250 × 12 = ؟",
    visual:["🥔 2,250","🥔 2,250","🥔 2,250","+ 9 كلغ أخرى"],
    options:["24,000 مليم","27,000 مليم","26,500 مليم","22,500 مليم"],
    correct:1,
    explanation:"✅ ممتاز! 2,250 × 12 = 27,000 مليم",
  },
  {
    id:4, type:"mcq",
    title:"ثمن السّمك 🐟",
    question:"اشترت سلمى 4 كلغ من السمك. ثمن الكيلو 27,345 مليم. كم يكلّف؟",
    hint:"27,345 × 4 = ؟",
    visual:["🐟 27,345","🐟 27,345","🐟 27,345","🐟 27,345"],
    options:["109,280 مليم","108,380 مليم","109,380 مليم","107,380 مليم"],
    correct:2,
    explanation:"✅ رائع! 27,345 × 4 = 109,380 مليم",
  },
  {
    id:5, type:"table",
    title:"جدول المشتريات 📋",
    subtitle:"راجع الأثمان المحسوبة",
    rows:[
      {emoji:"🥩", label:"اللحم",   qty:"3 كلغ",  unitPrice:"65,500",  total:196500},
      {emoji:"🥔", label:"البطاطا", qty:"12 كلغ", unitPrice:"2,250",   total:27000},
      {emoji:"🐟", label:"السمك",   qty:"4 كلغ",  unitPrice:"27,345",  total:109380},
    ],
  },
  {
    id:6, type:"sum",
    title:"المبلغ الجملي 🧮",
    question:"احسب مجموع كل المشتريات",
    rows:[
      {emoji:"🥩", label:"اللحم",   value:196500},
      {emoji:"🥔", label:"البطاطا", value:27000},
      {emoji:"🐟", label:"السمك",   value:109380},
    ],
    options:["331,880 مليم","332,880 مليم","333,880 مليم","330,880 مليم"],
    correct:1,
    explanation:"✅ 196,500 + 27,000 + 109,380 = 332,880 مليم",
  },
  {
    id:7, type:"remain",
    title:"كم تبقّى مع سلمى؟ 💰",
    question:"سلمى عندها 400 دينار = 400,000 مليم. أنفقت 332,880 مليم. كم تبقّى؟",
    budget:400000,
    spent:332880,
    hint:"400,000 − 332,880 = ؟",
    options:["66,120 مليم","67,120 مليم","68,120 مليم","65,120 مليم"],
    correct:1,
    explanation:"✅ 400,000 − 332,880 = 67,120 مليم",
  },
  { id:8, type:"finish",
    summary:[
      "🥩 اللحم (3كغ):    196,500 م",
      "🥔 البطاطا (12كغ):  27,000 م",
      "🐟 السمك (4كغ):   109,380 م",
      "─────────────────",
      "🛒 المجموع: 332,880 م",
      "💵 عندها: 400,000 م",
      "✅ تبقّى:   67,120 م",
    ],
  },
];

const YOUSSEF_STEPS = [
  {
    id:1, type:"intro",
    title:"يوسف يتسوّق! 🛍️",
    subtitle:"ساعد يوسف في حساب مشترياته",
    story:[
      {emoji:"👦", text:"يوسف وفّر مصروفه اليومي طوال العام"},
      {emoji:"🏦", text:"عند تكسير حصّالته وجد 520,500 مليم"},
      {emoji:"📺", text:"شاهد إعلاناً بمناسبة العيد"},
      {emoji:"🎁", text:"يريد مفاجأة أختيه وشراء مستلزمات العيد"},
    ],
  },
  {
    id:2, type:"mcq",
    title:"كم يملك يوسف؟ 💰",
    question:"اختر المبلغ الصحيح الذي وجده يوسف في حصّالته",
    options:["250,500 مليم","520,500 مليم","502,500 مليم","525,000 مليم"],
    correct:1,
    explanation:"✅ صحيح! يوسف يملك 520,500 مليم",
  },
  {
    id:3, type:"prices",
    title:"أسعار المشتريات 🏷️",
    subtitle:"تعرّف على أسعار كل المنتجات",
    items:[
      {emoji:"👕", name:"كسوة العيد (للواحد)", price:"120,000 مليم", count:"× 3 (ليوسف وأختيه)"},
      {emoji:"🎮", name:"لعبة فيديو",           price:"196,500 مليم", count:"× 1"},
      {emoji:"🧸", name:"دبي محشو (للواحدة)",   price:"35,600 مليم",  count:"× 2 (لأختيه)"},
    ],
  },
  {
    id:4, type:"mcq",
    title:"احسب ثمن الكسوات 👕",
    question:"يريد يوسف شراء كسوة له ولأختيه (3 أشخاص). كم يكلّف ذلك؟",
    hint:"120,000 × 3 = ؟",
    visual:["👕 120,000","👕 120,000","👕 120,000"],
    options:["240,000 مليم","360,000 مليم","300,000 مليم","480,000 مليم"],
    correct:1,
    explanation:"✅ رائع! 120,000 × 3 = 360,000 مليم",
  },
  {
    id:5, type:"mcq",
    title:"احسب ثمن الدببة 🧸",
    question:"يريد يوسف شراء دبّيْن محشوّيْن لأختيه. كم يكلّف ذلك؟",
    hint:"35,600 × 2 = ؟",
    visual:["🧸 35,600","🧸 35,600"],
    options:["71,200 مليم","71,600 مليم","35,600 مليم","70,200 مليم"],
    correct:0,
    explanation:"✅ ممتاز! 35,600 × 2 = 71,200 مليم",
  },
  {
    id:6, type:"sum",
    title:"المجموع الكلّي 🧮",
    question:"احسب مجموع كل المشتريات",
    rows:[
      {emoji:"👕", label:"كسوات العيد (×3)", value:360000},
      {emoji:"🎮", label:"لعبة فيديو",        value:196500},
      {emoji:"🧸", label:"دبّة محشوة (×2)",   value:71200},
    ],
    options:["617,700 مليم","627,700 مليم","637,700 مليم","607,700 مليم"],
    correct:1,
    explanation:"✅ 360,000 + 196,500 + 71,200 = 627,700 مليم",
  },
  {
    id:7, type:"compare",
    title:"هل يكفيه المبلغ؟ ⚖️",
    question:"قارن بين ما يملكه يوسف وما يحتاجه",
    budget:520500, total:627700,
    options:["نعم، يكفيه المبلغ","لا، لا يكفيه المبلغ"],
    correct:1,
    explanation:"✅ لا يكفيه! 520,500 < 627,700 مليم",
  },
  {
    id:8, type:"finish",
    summary:[
      "👕 كسوات (×3):  360,000 م",
      "🎮 لعبة فيديو:  196,500 م",
      "🧸 دبب (×2):     71,200 م",
      "─────────────────",
      "🛒 المجموع: 627,700 م",
      "💰 عنده: 520,500 م",
      "❌ ينقصه: 107,200 م",
    ],
  },
];

function MCQ({ step, onNext, onWrong }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const ok = sel === step.correct;
  const check = () => { if (sel === null) return; setDone(true); if (!ok) onWrong(); };
  return (
    <div>
      <p className="question-text">{step.question}</p>
      {step.hint && <div className="hint">💡 {step.hint}</div>}
      {step.visual && (
        <div className="visual-box">
          {step.visual.map((v,i) => <span key={i} className="visual-chip">{v}</span>)}
          <span className="visual-eq">= ؟</span>
        </div>
      )}
      <div className="options-grid">
        {step.options.map((o,i) => (
          <button key={i}
            className={`option-btn ${done?(i===step.correct?"opt-correct":i===sel?"opt-wrong":""):sel===i?"opt-selected":""}`}
            onClick={() => !done && setSel(i)}>{o}</button>
        ))}
      </div>
      {done && <div className={`feedback ${ok?"fb-correct":"fb-wrong"}`}>{step.explanation}</div>}
      {!done
        ? <button className={`main-btn ${sel===null?"btn-disabled":"btn-green"}`} onClick={check}>تحقّق ✓</button>
        : <button className="main-btn btn-green" onClick={onNext}>التالي →</button>}
    </div>
  );
}

function SumStep({ step, onNext, onWrong }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const ok = sel === step.correct;
  const check = () => { if (sel === null) return; setDone(true); if (!ok) onWrong(); };
  return (
    <div>
      <p className="question-text">{step.question}</p>
      <div className="sum-table">
        {step.rows.map((r,i) => (
          <div key={i} className="sum-row" style={{borderBottom:i<step.rows.length-1?"1px dashed #D0B0FF":"none"}}>
            <span>{r.emoji} {r.label}</span>
            <span className="sum-val">{r.value.toLocaleString()} م</span>
          </div>
        ))}
        <div className="sum-total-row">
          <span>المجموع</span>
          <span className="sum-total-val">؟ مليم</span>
        </div>
      </div>
      <div className="options-grid">
        {step.options.map((o,i) => (
          <button key={i}
            className={`option-btn ${done?(i===step.correct?"opt-correct":i===sel?"opt-wrong":""):sel===i?"opt-selected":""}`}
            onClick={() => !done && setSel(i)}>{o}</button>
        ))}
      </div>
      {done && <div className={`feedback ${ok?"fb-correct":"fb-wrong"}`}>{step.explanation}</div>}
      {!done
        ? <button className={`main-btn ${sel===null?"btn-disabled":"btn-green"}`} onClick={check}>تحقّق ✓</button>
        : <button className="main-btn btn-green" onClick={onNext}>التالي →</button>}
    </div>
  );
}

function CompareStep({ step, onNext, onWrong }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const ok = sel === step.correct;
  const check = () => { if (sel === null) return; setDone(true); if (!ok) onWrong(); };
  return (
    <div>
      <p className="question-text">{step.question}</p>
      <div className="compare-row">
        <div className="compare-card compare-budget">
          <div className="compare-emoji">💰</div>
          <div className="compare-label">يوسف يملك</div>
          <div className="compare-amount">{step.budget.toLocaleString()}</div>
          <div className="compare-unit">مليم</div>
        </div>
        <div className="compare-mid">⚖️</div>
        <div className="compare-card compare-total">
          <div className="compare-emoji">🛒</div>
          <div className="compare-label">المجموع الكلّي</div>
          <div className="compare-amount">{step.total.toLocaleString()}</div>
          <div className="compare-unit">مليم</div>
        </div>
      </div>
      <div className="options-col">
        {step.options.map((o,i) => (
          <button key={i}
            className={`option-btn option-full ${done?(i===step.correct?"opt-correct":i===sel?"opt-wrong":""):sel===i?"opt-selected":""}`}
            onClick={() => !done && setSel(i)}>{o}</button>
        ))}
      </div>
      {done && (
        <div className={`feedback ${ok?"fb-correct":"fb-wrong"}`} style={{whiteSpace:"pre-line"}}>
          {step.explanation}{ok && `\n💸 ينقصه: ${(step.total-step.budget).toLocaleString()} مليم`}
        </div>
      )}
      {!done
        ? <button className={`main-btn ${sel===null?"btn-disabled":"btn-green"}`} onClick={check}>تحقّق ✓</button>
        : <button className="main-btn btn-green" onClick={onNext}>التالي →</button>}
    </div>
  );
}

function RemainStep({ step, onNext, onWrong }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const ok = sel === step.correct;
  const check = () => { if (sel === null) return; setDone(true); if (!ok) onWrong(); };
  return (
    <div>
      <p className="question-text">{step.question}</p>
      <div className="hint">💡 {step.hint}</div>
      <div className="compare-row">
        <div className="compare-card compare-budget">
          <div className="compare-emoji">💵</div>
          <div className="compare-label">المبلغ الأصلي</div>
          <div className="compare-amount">{step.budget.toLocaleString()}</div>
          <div className="compare-unit">مليم</div>
        </div>
        <div className="compare-mid">➖</div>
        <div className="compare-card compare-total">
          <div className="compare-emoji">🛒</div>
          <div className="compare-label">ما أنفقته</div>
          <div className="compare-amount">{step.spent.toLocaleString()}</div>
          <div className="compare-unit">مليم</div>
        </div>
      </div>
      <div className="options-grid">
        {step.options.map((o,i) => (
          <button key={i}
            className={`option-btn ${done?(i===step.correct?"opt-correct":i===sel?"opt-wrong":""):sel===i?"opt-selected":""}`}
            onClick={() => !done && setSel(i)}>{o}</button>
        ))}
      </div>
      {done && <div className={`feedback ${ok?"fb-correct":"fb-wrong"}`}>{step.explanation}</div>}
      {!done
        ? <button className={`main-btn ${sel===null?"btn-disabled":"btn-green"}`} onClick={check}>تحقّق ✓</button>
        : <button className="main-btn btn-green" onClick={onNext}>التالي →</button>}
    </div>
  );
}

function TableStep({ step, onNext }) {
  return (
    <div>
      <p className="intro-sub" style={{marginBottom:12}}>{step.subtitle}</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>المادة</th>
            <th>الكمية</th>
            <th>ثمن الكغ</th>
            <th>الثمن الجملي</th>
          </tr>
        </thead>
        <tbody>
          {step.rows.map((r,i) => (
            <tr key={i}>
              <td>{r.emoji} {r.label}</td>
              <td>{r.qty}</td>
              <td>{r.unitPrice} م</td>
              <td className="table-total">{r.total.toLocaleString()} م</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="main-btn btn-blue" style={{marginTop:16}} onClick={onNext}>فهمت! →</button>
    </div>
  );
}

function PricesStep({ step, onNext }) {
  return (
    <div>
      <p className="intro-sub">{step.subtitle}</p>
      <div className="price-list">
        {step.items.map((it,i) => (
          <div key={i} className="price-item">
            <div className="price-left">
              <span className="price-emoji">{it.emoji}</span>
              <div>
                <div className="price-name">{it.name}</div>
                <div className="price-count">{it.count}</div>
              </div>
            </div>
            <span className="price-tag">{it.price}</span>
          </div>
        ))}
      </div>
      <button className="main-btn btn-blue" onClick={onNext}>فهمت! →</button>
    </div>
  );
}

function FinishStep({ xp, hearts, summary }) {
  const stars = hearts === 3 ? 3 : hearts === 2 ? 2 : 1;
  return (
    <div className="finish-center">
      <span className="trophy">🏆</span>
      <h2 className="finish-title">أحسنت!</h2>
      <p className="finish-sub">أنهيت الدرس بنجاح!</p>
      <div className="stars">
        {[...Array(3)].map((_,i) => (
          <span key={i} className={`star ${i<stars?"lit":"dim"}`} style={{animationDelay:`${i*0.15}s`}}>⭐</span>
        ))}
      </div>
      <div className="stats-grid">
        {[
          {l:"XP مكتسب",     v:`+${xp}`, e:"⚡", c:C.yellow},
          {l:"قلوب متبقّية", v:`${hearts}/3`, e:"❤️", c:C.red},
          {l:"النتيجة",      v:hearts===3?"مثالي!":hearts===2?"ممتاز":"جيّد", e:"🌟", c:C.green},
          {l:"المهارة",      v:"جمع وطرح", e:"🧮", c:C.blue},
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div className="stat-emoji">{s.e}</div>
            <div className="stat-value" style={{color:s.c}}>{s.v}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="summary-box">
        📊 <strong>ملخّص الحل:</strong><br/>
        {summary.map((line,i) => <span key={i}>{line}<br/></span>)}
      </div>
    </div>
  );
}

function Lesson({ steps, onBack }) {
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const step = steps[idx];
  const progress = Math.max(0, idx - 1);
  const total = steps.length - 2;
  const pct = Math.round((progress / total) * 100);

  const next = () => {
    setXp(x => x + 10);
    if (idx < steps.length - 1) {
      if (idx === steps.length - 2) { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
      setIdx(i => i + 1);
    }
  };
  const wrong = () => setHearts(h => Math.max(0, h - 1));

  return (
    <div className="app">
      {confetti && (
        <div className="confetti-wrap">
          {[...Array(20)].map((_,i) => (
            <div key={i} className="confetti-piece" style={{
              left:`${4+i*5}%`,
              background:CONFETTI_COLORS[i%6],
              borderRadius:i%3===0?"50%":2,
              animation:`fall${i%3} ${1.2+(i%4)*0.25}s ease-in ${(i%5)*0.08}s forwards`,
            }}/>
          ))}
        </div>
      )}
      <div className="card">
        <div className="header">
          <button className="back-btn" onClick={onBack}>← رجوع</button>
          <div className="hearts">
            {[...Array(3)].map((_,i) => (
              <span key={i} className={`heart ${i<hearts?"":"empty"}`}>❤️</span>
            ))}
          </div>
          <div className="xp-badge">⚡ {xp} XP</div>
        </div>

        {step.type !== "intro" && step.type !== "finish" && (
          <div className="progress-wrap">
            <div className="progress-bar-row">
              <div className="progress-track">
                <div className="progress-fill" style={{width:`${pct}%`}}/>
              </div>
              <span className="progress-pct">{pct}%</span>
            </div>
            <span className="step-label">السؤال {progress} من {total}</span>
          </div>
        )}

        {step.type !== "finish" && <h2 className="step-title">{step.title}</h2>}

        {step.type === "intro" && (
          <div className="intro-center">
            <div className="intro-icon">{step.title.split(" ").pop()}</div>
            <h2 className="intro-title">{step.title}</h2>
            <p className="intro-sub">{step.subtitle}</p>
            <div className="story-list">
              {step.story.map((s,i) => (
                <div key={i} className="story-item" style={{animationDelay:`${i*0.1}s`}}>
                  <span className="story-emoji">{s.emoji}</span>
                  <span className="story-text">{s.text}</span>
                </div>
              ))}
            </div>
            <button className="main-btn btn-green" onClick={next}>ابدأ! →</button>
          </div>
        )}

        {step.type === "prices"  && <PricesStep  key={step.id} step={step} onNext={next}/>}
        {step.type === "table"   && <TableStep   key={step.id} step={step} onNext={next}/>}
        {step.type === "mcq"     && <MCQ         key={step.id} step={step} onNext={next} onWrong={wrong}/>}
        {step.type === "sum"     && <SumStep     key={step.id} step={step} onNext={next} onWrong={wrong}/>}
        {step.type === "compare" && <CompareStep key={step.id} step={step} onNext={next} onWrong={wrong}/>}
        {step.type === "remain"  && <RemainStep  key={step.id} step={step} onNext={next} onWrong={wrong}/>}
        {step.type === "finish"  && <FinishStep xp={xp} hearts={hearts} summary={step.summary}/>}

        <div className="card-deco"/>
      </div>
    </div>
  );
}

function Home({ onSelect }) {
  return (
    <div className="app">
      <div className="card home-card">

        {/* ── Banner header matching the screenshot style ── */}
        <div className="home-banner">
          <div className="banner-title">الجمع والطرح والضّرب</div>
          <div className="banner-title">على الأعداد ذات 6 أرقام</div>
          <div className="banner-divider"/>
          <div className="banner-sub">مسايل حول الدرس</div>
          <div className="banner-teacher">المعلم خليل عنيبة 👨‍🏫</div>
        </div>

        <div className="lesson-list">
          <button className="lesson-card lc-orange" onClick={() => onSelect("salma")}>
            <div className="lc-emoji">🛒</div>
            <div className="lc-body">
              <div className="lc-tag">التوظيف</div>
              <div className="lc-title">رحلة سلمى إلى السوق</div>
              <div className="lc-desc">ضرب · جمع · طرح</div>
            </div>
            <div className="lc-arrow">←</div>
          </button>

          <button className="lesson-card lc-purple" onClick={() => onSelect("youssef")}>
            <div className="lc-emoji">🛍️</div>
            <div className="lc-body">
              <div className="lc-tag">الإدماج</div>
              <div className="lc-title">يوسف يتسوّق للعيد</div>
              <div className="lc-desc">ضرب · جمع · مقارنة · طرح</div>
            </div>
            <div className="lc-arrow">←</div>
          </button>
        </div>

        <div className="home-footer">
          <span>⚡</span><span>تعلّم وافهم خطوة بخطوة</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Noto Kufi Arabic','Segoe UI',Tahoma,sans-serif;
          background: linear-gradient(150deg,#f0f4ff 0%,#fff8f0 100%);
          min-height: 100vh;
          direction: rtl;
        }

        .app {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          padding: 22px;
          position: relative;
          overflow: hidden;
        }

        .card-deco {
          position: absolute;
          bottom: -18px; left: -18px;
          width: 70px; height: 70px;
          background: linear-gradient(135deg,#58CC0215,#1CB0F615);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── HOME BANNER ── */
        .home-card { max-width: 420px; }

        .home-banner {
          background: linear-gradient(135deg, #1a237e, #283593);
          border-radius: 16px;
          padding: 20px 16px 16px;
          text-align: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(26,35,126,0.25);
        }

        .banner-title {
          color: #ffffff;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.5;
          letter-spacing: 0.3px;
        }

        .banner-divider {
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #FFD700, #FF9600);
          border-radius: 2px;
          margin: 10px auto 10px;
        }

        .banner-sub {
          color: #FFD700;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .banner-teacher {
          color: #B3C5F0;
          font-size: 13px;
          font-weight: 700;
        }

        /* ── LESSON CARDS ── */
        .lesson-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }

        .lesson-card {
          display: flex;
          align-items: center;
          gap: 14px;
          border: none;
          border-radius: 18px;
          padding: 18px 16px;
          cursor: pointer;
          font-family: inherit;
          text-align: right;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .lesson-card:hover  { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.13); }
        .lesson-card:active { transform: translateY(0); }

        .lc-orange { background: linear-gradient(135deg,#FFF3E0,#FFE0B2); border: 2px solid #FFB74D; box-shadow: 0 4px 0 #e65100aa; }
        .lc-purple { background: linear-gradient(135deg,#F3E5F5,#E1BEE7); border: 2px solid #CE93D8; box-shadow: 0 4px 0 #7b1fa2aa; }

        .lc-emoji { font-size: 36px; flex-shrink: 0; }
        .lc-body  { flex: 1; }
        .lc-tag   { font-size: 11px; font-weight: 800; color: #888; margin-bottom: 2px; letter-spacing: 0.5px; }
        .lc-title { font-size: 15px; font-weight: 900; color: #3C3C3C; margin-bottom: 2px; }
        .lc-desc  { font-size: 11px; color: #AFAFAF; }
        .lc-arrow { font-size: 20px; color: #ccc; flex-shrink: 0; }

        .home-footer {
          text-align: center;
          font-size: 13px;
          color: #AFAFAF;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* ── LESSON HEADER ── */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          gap: 8px;
        }

        .back-btn {
          background: #F0F4FF;
          border: none;
          border-radius: 10px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #1CB0F6;
          cursor: pointer;
          font-family: inherit;
        }
        .back-btn:hover { background: #D0EEFF; }

        .hearts      { display: flex; gap: 3px; }
        .heart       { font-size: 20px; transition: opacity 0.3s; }
        .heart.empty { opacity: 0.18; }

        .xp-badge {
          background: linear-gradient(135deg,#FFD700,#FF9600);
          border-radius: 20px;
          padding: 3px 12px;
          font-weight: 800;
          font-size: 13px;
          color: #fff;
          box-shadow: 0 2px 8px rgba(255,150,0,0.35);
          white-space: nowrap;
        }

        /* ── PROGRESS ── */
        .progress-wrap    { margin-bottom: 14px; }
        .progress-bar-row { display: flex; align-items: center; gap: 10px; }
        .progress-track   { flex:1; height:14px; background:#E5E5E5; border-radius:8px; overflow:hidden; }
        .progress-fill    { height:100%; background:linear-gradient(90deg,#58CC02,#1CB0F6); border-radius:8px; transition:width 0.5s ease; }
        .progress-pct     { color:#58CC02; font-weight:800; font-size:13px; min-width:32px; }
        .step-label       { display:inline-block; background:#F0F4FF; border-radius:8px; padding:2px 10px; font-size:11px; font-weight:700; color:#1CB0F6; margin-top:6px; }

        /* ── STEP ── */
        .step-title { font-size:17px; font-weight:900; color:#3C3C3C; margin-bottom:10px; }

        /* ── INTRO ── */
        .intro-center { text-align:center; }
        .intro-icon   { font-size:52px; margin-bottom:4px; }
        .intro-title  { font-size:20px; font-weight:900; color:#3C3C3C; margin-bottom:4px; }
        .intro-sub    { color:#AFAFAF; font-size:13px; margin-bottom:16px; }
        .story-list   { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; }
        .story-item   { display:flex; align-items:center; gap:12px; background:#F0F9FF; border-radius:12px; padding:10px 14px; border:2px solid #D0EEFF; animation:fadeUp 0.4s ease both; }
        .story-emoji  { font-size:22px; }
        .story-text   { font-size:13px; font-weight:600; color:#3C3C3C; }

        /* ── PRICES ── */
        .price-list  { display:flex; flex-direction:column; gap:10px; margin-bottom:18px; }
        .price-item  { display:flex; align-items:center; justify-content:space-between; background:#FFF8F0; border-radius:12px; padding:12px 14px; border:2px solid #FFE5C2; }
        .price-left  { display:flex; align-items:center; gap:10px; }
        .price-emoji { font-size:26px; }
        .price-name  { font-weight:700; font-size:13px; color:#3C3C3C; }
        .price-count { font-size:11px; color:#AFAFAF; }
        .price-tag   { background:#FF9600; color:#fff; font-weight:800; border-radius:8px; padding:3px 10px; font-size:12px; white-space:nowrap; }

        /* ── TABLE ── */
        .data-table    { width:100%; border-collapse:collapse; font-size:12px; }
        .data-table th { background:#F0F4FF; color:#1CB0F6; font-weight:800; padding:8px 6px; text-align:center; border-bottom:2px solid #D0EEFF; }
        .data-table td { padding:8px 6px; text-align:center; border-bottom:1px solid #F0F0F0; color:#3C3C3C; font-weight:600; }
        .data-table tr:last-child td { border-bottom:none; }
        .table-total   { font-weight:900; color:#58CC02; }

        /* ── MCQ ── */
        .question-text { font-size:14px; color:#555; margin-bottom:12px; line-height:1.6; }
        .hint          { background:#FFF3CD; border-radius:10px; padding:7px 12px; margin-bottom:12px; font-size:13px; color:#856404; font-weight:600; }
        .visual-box    { display:flex; gap:6px; flex-wrap:wrap; background:#FFF8F0; border-radius:12px; padding:10px; margin-bottom:12px; border:2px dashed #FFD0A0; align-items:center; }
        .visual-chip   { background:#fff; border:2px solid #FFB347; border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700; }
        .visual-eq     { font-size:18px; font-weight:900; color:#FF9600; }
        .options-grid  { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px; }
        .options-col   { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
        .option-btn    { border:2px solid #E5E5E5; border-radius:12px; padding:11px 8px; background:#fff; cursor:pointer; font-family:inherit; font-size:13px; font-weight:700; transition:all 0.15s; text-align:center; color:#3C3C3C; }
        .option-full   { width:100%; }
        .option-btn:hover:not(.opt-correct):not(.opt-wrong):not(.opt-selected) { border-color:#1CB0F6; background:#EDF8FF; }
        .opt-selected  { border-color:#1CB0F6 !important; background:#EDF8FF !important; }
        .opt-correct   { border-color:#58CC02 !important; background:#D7FFB8 !important; }
        .opt-wrong     { border-color:#FF4B4B !important; background:#FFD0D0 !important; }
        .feedback      { border-radius:12px; padding:9px 12px; margin-bottom:10px; font-size:13px; font-weight:700; }
        .fb-correct    { background:#D7FFB8; border:2px solid #58CC02; color:#46A302; }
        .fb-wrong      { background:#FFD0D0; border:2px solid #FF4B4B; color:#FF4B4B; }

        /* ── SUM TABLE ── */
        .sum-table     { background:#F8F0FF; border-radius:12px; padding:12px; margin-bottom:12px; border:2px solid #E0C8FF; }
        .sum-row       { display:flex; justify-content:space-between; padding:5px 2px; font-size:13px; color:#3C3C3C; }
        .sum-val       { font-weight:700; color:#CE82FF; }
        .sum-total-row { display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:2px solid #CE82FF; font-weight:800; font-size:14px; }
        .sum-total-val { font-weight:900; font-size:15px; color:#CE82FF; }

        /* ── COMPARE ── */
        .compare-row    { display:flex; gap:10px; margin-bottom:14px; align-items:center; }
        .compare-card   { flex:1; border-radius:12px; padding:10px 6px; text-align:center; }
        .compare-budget { background:#D7FFB8; border:2px solid #58CC02; }
        .compare-total  { background:#FFD0D0; border:2px solid #FF4B4B; }
        .compare-mid    { font-size:22px; }
        .compare-emoji  { font-size:20px; }
        .compare-budget .compare-label  { font-size:11px; color:#46A302; font-weight:700; }
        .compare-budget .compare-amount { font-size:15px; font-weight:900; color:#46A302; }
        .compare-budget .compare-unit   { font-size:10px; color:#46A302; }
        .compare-total  .compare-label  { font-size:11px; color:#FF4B4B; font-weight:700; }
        .compare-total  .compare-amount { font-size:15px; font-weight:900; color:#FF4B4B; }
        .compare-total  .compare-unit   { font-size:10px; color:#FF4B4B; }

        /* ── BUTTONS ── */
        .main-btn        { width:100%; border:none; border-radius:14px; padding:13px 0; font-size:15px; font-weight:800; font-family:inherit; cursor:pointer; color:#fff; transition:transform 0.1s, box-shadow 0.1s; }
        .main-btn:active { transform:translateY(3px); box-shadow:none !important; }
        .btn-green       { background:#58CC02; box-shadow:0 4px 0 #46A302; }
        .btn-blue        { background:#1CB0F6; box-shadow:0 4px 0 #0b7ab5; }
        .btn-disabled    { background:#AFAFAF; cursor:not-allowed; }

        /* ── FINISH ── */
        .finish-center { text-align:center; }
        .trophy        { font-size:60px; animation:bounce 0.6s ease infinite alternate; display:block; margin-bottom:4px; }
        .finish-title  { font-size:26px; font-weight:900; color:#58CC02; margin-bottom:4px; }
        .finish-sub    { color:#888; font-size:14px; margin-bottom:16px; }
        .stars         { display:flex; justify-content:center; gap:6px; margin-bottom:18px; }
        .star          { font-size:32px; }
        .star.dim      { opacity:0.2; }
        .star.lit      { animation:starPop 0.4s ease both; }
        .stats-grid    { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
        .stat-card     { background:#FAFAFA; border-radius:12px; padding:10px 6px; border:2px solid #F0F0F0; text-align:center; }
        .stat-emoji    { font-size:20px; }
        .stat-value    { font-weight:900; font-size:17px; }
        .stat-label    { font-size:10px; color:#AFAFAF; }
        .summary-box   { background:linear-gradient(135deg,#D7FFB8,#B8F0FF); border-radius:12px; padding:12px 14px; border:2px solid #A0E8A0; text-align:right; font-size:12px; line-height:2; color:#2D6A2D; font-weight:600; }

        /* ── CONFETTI ── */
        .confetti-wrap  { position:fixed; inset:0; pointer-events:none; z-index:999; }
        .confetti-piece { position:absolute; top:-20px; width:10px; height:10px; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes fall0   { to{transform:translateY(110vh) rotate(360deg);opacity:0} }
        @keyframes fall1   { to{transform:translateY(110vh) rotate(-720deg) translateX(40px);opacity:0} }
        @keyframes fall2   { to{transform:translateY(110vh) rotate(540deg) translateX(-30px);opacity:0} }
        @keyframes bounce  { from{transform:translateY(0)} to{transform:translateY(-10px)} }
        @keyframes starPop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
      `}</style>

      {screen === "home"    && <Home onSelect={setScreen}/>}
      {screen === "salma"   && <Lesson steps={SALMA_STEPS}   onBack={() => setScreen("home")}/>}
      {screen === "youssef" && <Lesson steps={YOUSSEF_STEPS} onBack={() => setScreen("home")}/>}
    </>
  );
}