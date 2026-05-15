import { priceConfig } from "./priceConfig";

const roundCurrency = (value) => Math.round(value);

const toPositiveInteger = (value) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
};

export function validateQuoteInput(input) {
  const errors = [];
  const warnings = [];
  const pageCount = toPositiveInteger(input.pageCount);
  const quantity = toPositiveInteger(input.quantity);

  if (!pageCount) {
    errors.push("頁數必須大於 0，且需為正整數。");
  } else if (pageCount % 4 !== 0) {
    errors.push("頁數必須是 4 的倍數。");
  }

  if (!quantity) {
    errors.push("印量必須大於 0，且需為正整數。");
  }

  if (pageCount && input.binding === "騎馬釘" && pageCount > 64) {
    warnings.push("頁數較多，不建議使用騎馬釘。");
  }

  if (pageCount && input.binding === "精裝" && pageCount < 48) {
    warnings.push("頁數較少，精裝成本可能偏高。");
  }

  return { errors, warnings, pageCount, quantity };
}

export function calculateQuote(input) {
  const validation = validateQuoteInput(input);

  if (validation.errors.length > 0) {
    return {
      isValid: false,
      errors: validation.errors,
      warnings: validation.warnings,
      breakdown: null,
      total: 0,
      unitPrice: 0,
    };
  }

  const { pageCount, quantity } = validation;
  const innerPageUnitPrice =
    priceConfig.colors[input.innerColor] *
    priceConfig.sizes[input.size] *
    priceConfig.innerPapers[input.innerPaper];

  const innerPagesCost = pageCount * innerPageUnitPrice * quantity;
  const coverCost = priceConfig.coverPapers[input.coverPaper] * quantity;
  const coverFinishCost = input.coverFinishes.reduce((sum, finishName) => {
    const finish = priceConfig.coverFinishes[finishName];
    return sum + finish.base + finish.perCopy * quantity;
  }, 0);
  const bindingCost = priceConfig.bindings[input.binding] * quantity;
  const paperColorExtra =
    input.paperColor === "米色"
      ? innerPagesCost * priceConfig.paperColors[input.paperColor]
      : 0;
  const total =
    innerPagesCost +
    coverCost +
    coverFinishCost +
    bindingCost +
    paperColorExtra;

  return {
    isValid: true,
    errors: [],
    warnings: validation.warnings,
    breakdown: {
      innerPageUnitPrice: roundCurrency(innerPageUnitPrice),
      innerPagesCost: roundCurrency(innerPagesCost),
      coverCost: roundCurrency(coverCost),
      coverFinishCost: roundCurrency(coverFinishCost),
      bindingCost: roundCurrency(bindingCost),
      paperColorExtra: roundCurrency(paperColorExtra),
    },
    total: roundCurrency(total),
    unitPrice: roundCurrency(total / quantity),
  };
}
