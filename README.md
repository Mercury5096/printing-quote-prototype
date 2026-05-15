# AI輔助書籍印製報價原型系統

React + Vite 單頁式 MVP，用於展示書籍印製規格輸入與模擬報價計算。

## 開發與測試

請透過 Vite 開發伺服器開啟，不要直接用瀏覽器打開 `index.html`，否則頁面會是空白，因為 JSX 與模組路徑需要 Vite 處理。

```bash
npm install
npm run dev
```

啟動後打開終端機顯示的網址，通常是：

```text
http://127.0.0.1:5173
```

價格資料集中於 `src/priceConfig.js`，報價公式集中於 `src/calculateQuote.js`。
