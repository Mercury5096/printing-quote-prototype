# 專案交接說明

## 專案定位

這是一個 React + Vite 單頁式 MVP，名稱為「AI輔助書籍印製報價原型系統」。目前用途是讓業主先查看書籍印製報價流程的基礎模型：使用者輸入書籍規格，系統依照模擬價格表與公式即時計算報價結果。

目前沒有後端、沒有資料庫、沒有登入、沒有付款、沒有真實 AI API 串接。這些都不是目前 MVP 範圍。

線上展示網址：

```text
https://mercury5096.github.io/printing-quote-prototype/
```

GitHub repository：

```text
https://github.com/Mercury5096/printing-quote-prototype
```

## 本機啟動

請使用 Vite dev server，不要直接用瀏覽器開 `index.html`。

```bash
npm install
npm run dev
```

通常會在以下網址開啟：

```text
http://127.0.0.1:5173
```

建置檢查：

```bash
npm run build
```

## 目前重要檔案

- `PROJECT_SPEC.md`：原始規格書。
- `README.md`：專案簡介、開發方式、線上展示網址。
- `src/priceConfig.js`：價格資料、倍率、選項集中管理。
- `src/calculateQuote.js`：驗證規則、提醒條件、報價公式集中管理。
- `src/App.jsx`：頁面主結構，組合表單與結果。
- `src/components/QuoteForm.jsx`：書籍規格輸入表單。
- `src/components/QuoteResult.jsx`：報價結果、明細、錯誤與提醒顯示。
- `src/styles.css`：整體版面與視覺樣式。
- `vite.config.js`：Vite 設定，目前包含 GitHub Pages 需要的 `base`。
- `.github/workflows/deploy.yml`：GitHub Pages 自動部署流程。

## 修改價格與公式的位置

如果業主只要修改價格、倍率或選項，優先改：

```text
src/priceConfig.js
```

如果業主要修改計算方式、驗證規則或提醒邏輯，優先改：

```text
src/calculateQuote.js
```

目前 `src/calculateQuote.js` 內主要分成兩個函式：

- `validateQuoteInput(input)`：處理頁數、印量、裝訂提醒等驗證與提示。
- `calculateQuote(input)`：處理內頁費、封面費、封面加工費、裝訂費、紙張顏色加價、總價、單本價格。

## 目前書籍印刷模型

目前支援的輸入包含：

- 書籍尺寸：A4、B5、A5、A6
- 內頁紙張
- 封面紙張
- 頁數
- 印量
- 內頁色彩
- 封面加工複選
- 紙張顏色
- 裝訂方式

目前支援的結果包含：

- 內頁費
- 封面費
- 封面加工費
- 裝訂費
- 紙張顏色加價
- 總價
- 單本價格
- 錯誤訊息
- 提醒訊息
- 展示用價格聲明

## 部署狀態

目前專案已推送到 GitHub，並使用 GitHub Actions 部署到 GitHub Pages。

每次推送到 `main` 分支後，`.github/workflows/deploy.yml` 會自動建置並部署 `dist`。

注意：workflow 目前使用 `npm install`，不是 `npm ci`。原因是第一次部署時 GitHub runner 的 npm 版本對目前 Vite/Rolldown lockfile 的 optional dependency 判定較嚴格，導致 `npm ci` 失敗。若未來固定 Vite 版本或整理 lockfile，可再評估改回 `npm ci`。

## 未來可能需求：書籍印刷與包裝盒印刷切換

業主提過後續可能還需要「包裝盒子印刷」報價。包裝盒印刷會有更多選項與更複雜公式，但整體功能型態與目前書籍報價相似：

- 表單輸入規格
- 依照價格表計算報價
- 顯示報價明細
- 顯示總價與單價
- 顯示驗證錯誤與提醒
- 使用展示用模擬價格

若要擴充，建議不要直接把包裝盒邏輯塞進目前的 `src/priceConfig.js` 和 `src/calculateQuote.js`。比較好的方向是先重構成報價類型模組，例如：

```text
src/
  quoteTypes/
    book/
      priceConfig.js
      calculateQuote.js
      defaultInput.js
      fields.js
    packaging/
      priceConfig.js
      calculateQuote.js
      defaultInput.js
      fields.js
  components/
    QuoteForm.jsx
    QuoteResult.jsx
  App.jsx
```

畫面上可以加一個模式切換：

```text
[ 書籍印刷 ] [ 包裝盒印刷 ]
```

切換到不同模式時，載入對應的：

- 欄位定義
- 預設輸入值
- 價格表
- 驗證規則
- 計算公式
- 報價明細標籤

這樣未來業主修改書籍或包裝盒的價格與公式時，不會互相干擾。

## 建議下一步

目前先不要改動架構，讓業主查看基礎書籍印刷 MVP。若業主確認需要包裝盒印刷，再建議依照以下順序處理：

1. 先將目前書籍印刷邏輯搬進 `src/quoteTypes/book/`，並確認畫面與結果完全不變。
2. 將表單與結果元件調整成可接收不同 quote type 設定。
3. 新增 `src/quoteTypes/packaging/`，放入包裝盒價格表、欄位與公式。
4. 在 `App.jsx` 加入「書籍印刷 / 包裝盒印刷」切換。
5. 跑 `npm run build`，確認 GitHub Pages 部署正常。

## 交接提醒

- 不要直接開 `index.html` 測試，請使用 `npm run dev`。
- 修改報價公式前，先讀 `PROJECT_SPEC.md` 與 `src/calculateQuote.js`。
- 修改價格前，先讀 `src/priceConfig.js`。
- 若要部署，提交後推送到 `main` 即可觸發 GitHub Pages。
- 若改到 Vite base path，要確認 GitHub Pages 網址仍能正常載入靜態資源。
