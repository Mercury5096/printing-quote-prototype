import { useMemo, useState } from "react";
import { defaultQuoteInput } from "./priceConfig";
import { calculateQuote } from "./calculateQuote";
import QuoteForm from "./components/QuoteForm";
import QuoteResult from "./components/QuoteResult";

export default function App() {
  const [quoteInput, setQuoteInput] = useState(defaultQuoteInput);
  const quote = useMemo(() => calculateQuote(quoteInput), [quoteInput]);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Book Printing Quote MVP</p>
          <h1>AI輔助書籍印製報價原型系統</h1>
          <p className="subtitle">展示用模擬價格，實際價格可由廠商替換</p>
        </div>
      </header>

      <section className="workspace" aria-label="書籍印製報價">
        <QuoteForm value={quoteInput} onChange={setQuoteInput} />
        <QuoteResult quote={quote} input={quoteInput} />
      </section>
    </main>
  );
}
