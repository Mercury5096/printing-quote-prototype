const currencyFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

export default function QuoteResult({ quote, input }) {
  const breakdownRows = quote.breakdown
    ? [
        ["內頁費", quote.breakdown.innerPagesCost],
        ["封面費", quote.breakdown.coverCost],
        ["封面加工費", quote.breakdown.coverFinishCost],
        ["裝訂費", quote.breakdown.bindingCost],
        ["紙張顏色加價", quote.breakdown.paperColorExtra],
      ]
    : [];

  return (
    <section className="panel quote-result" aria-live="polite">
      <div className="panel-heading">
        <h2>報價結果</h2>
      </div>

      {quote.errors.length > 0 && (
        <div className="message-list error-list">
          {quote.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      {quote.warnings.length > 0 && (
        <div className="message-list warning-list">
          {quote.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}

      {quote.isValid ? (
        <>
          <div className="total-card">
            <span>總價</span>
            <strong>{formatCurrency(quote.total)}</strong>
          </div>
          <div className="unit-card">
            <span>單本價格</span>
            <strong>{formatCurrency(quote.unitPrice)}</strong>
          </div>

          <table className="breakdown-table">
            <caption>報價明細</caption>
            <tbody>
              {breakdownRows.map(([label, amount]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{formatCurrency(amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="summary-list">
            <div>
              <dt>尺寸</dt>
              <dd>{input.size}</dd>
            </div>
            <div>
              <dt>頁數</dt>
              <dd>{input.pageCount}</dd>
            </div>
            <div>
              <dt>印量</dt>
              <dd>{input.quantity}</dd>
            </div>
            <div>
              <dt>裝訂</dt>
              <dd>{input.binding}</dd>
            </div>
          </dl>
        </>
      ) : (
        <div className="empty-state">
          <p>請修正輸入資料後產生報價。</p>
        </div>
      )}

      <p className="disclaimer">本報價為展示用模擬價格，不代表印刷廠正式報價。</p>
    </section>
  );
}
