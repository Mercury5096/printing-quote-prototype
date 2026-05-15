import { priceConfig } from "../priceConfig";

const optionsOf = (record) => Object.keys(record);

function SelectField({ id, label, value, options, onChange }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function NumberField({ id, label, value, onChange }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        min="1"
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default function QuoteForm({ value, onChange }) {
  const update = (key, nextValue) => {
    onChange({ ...value, [key]: nextValue });
  };

  const toggleFinish = (finishName) => {
    const exists = value.coverFinishes.includes(finishName);
    const coverFinishes = exists
      ? value.coverFinishes.filter((item) => item !== finishName)
      : [...value.coverFinishes, finishName];
    update("coverFinishes", coverFinishes);
  };

  return (
    <form className="panel quote-form">
      <div className="panel-heading">
        <h2>輸入規格</h2>
      </div>

      <div className="form-grid">
        <SelectField
          id="size"
          label="書籍尺寸"
          value={value.size}
          options={optionsOf(priceConfig.sizes)}
          onChange={(nextValue) => update("size", nextValue)}
        />
        <SelectField
          id="innerPaper"
          label="內頁紙張"
          value={value.innerPaper}
          options={optionsOf(priceConfig.innerPapers)}
          onChange={(nextValue) => update("innerPaper", nextValue)}
        />
        <SelectField
          id="coverPaper"
          label="封面紙張"
          value={value.coverPaper}
          options={optionsOf(priceConfig.coverPapers)}
          onChange={(nextValue) => update("coverPaper", nextValue)}
        />
        <NumberField
          id="pageCount"
          label="頁數"
          value={value.pageCount}
          onChange={(nextValue) => update("pageCount", nextValue)}
        />
        <NumberField
          id="quantity"
          label="印量"
          value={value.quantity}
          onChange={(nextValue) => update("quantity", nextValue)}
        />
        <SelectField
          id="innerColor"
          label="內頁色彩"
          value={value.innerColor}
          options={optionsOf(priceConfig.colors)}
          onChange={(nextValue) => update("innerColor", nextValue)}
        />
        <SelectField
          id="paperColor"
          label="紙張顏色"
          value={value.paperColor}
          options={optionsOf(priceConfig.paperColors)}
          onChange={(nextValue) => update("paperColor", nextValue)}
        />
        <SelectField
          id="binding"
          label="裝訂方式"
          value={value.binding}
          options={optionsOf(priceConfig.bindings)}
          onChange={(nextValue) => update("binding", nextValue)}
        />
      </div>

      <fieldset className="finish-group">
        <legend>封面加工</legend>
        <div className="checkbox-grid">
          {optionsOf(priceConfig.coverFinishes).map((finishName) => (
            <label key={finishName} className="checkbox-field">
              <input
                type="checkbox"
                checked={value.coverFinishes.includes(finishName)}
                onChange={() => toggleFinish(finishName)}
              />
              <span>{finishName}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  );
}
