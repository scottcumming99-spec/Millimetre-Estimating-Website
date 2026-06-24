const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const SITE_CONFIG = window.ME_SITE_CONFIG || {};
const CONTACT_EMAIL = SITE_CONFIG.contactEmail || "info@millimetre.ltd";
const SITE_URL = SITE_CONFIG.siteUrl || window.location.origin;
const COMPANY_NAME = "Millimetre Estimating Limited";
const COOKIE_CONSENT_KEY = `me_cookie_consent_${
  SITE_CONFIG.cookieConsentVersion || "v1"
}`;

const getConsentState = () => {
  try {
    const savedValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return savedValue ? JSON.parse(savedValue) : null;
  } catch {
    return null;
  }
};

const setConsentState = (status) => {
  const payload = {
    status,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
  } catch {
    // If localStorage is unavailable, the user's choice cannot persist.
  }

  return payload;
};

let analyticsLoaded = false;
let clarityLoaded = false;

const loadGoogleAnalytics = () => {
  const measurementId = SITE_CONFIG.gaMeasurementId;
  if (!measurementId || analyticsLoaded) return;

  analyticsLoaded = true;

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId
  )}`;
  document.head.appendChild(analyticsScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};

const loadMicrosoftClarity = () => {
  const projectId = SITE_CONFIG.clarityProjectId;
  if (!projectId || clarityLoaded) return;

  clarityLoaded = true;

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
};

const applyTracking = () => {
  loadGoogleAnalytics();
  loadMicrosoftClarity();
};

const createCookieControls = () => {
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML = `
    <div class="cookie-banner-panel">
      <div>
        <strong>Privacy Notice</strong>
        <p>
          This website uses Google Analytics and Microsoft Clarity to measure usage and
          understand visitor behaviour. Read the <a href="/privacy/">Privacy Policy</a> and
          <a href="/cookies/">Cookie Policy</a> for more information.
        </p>
      </div>
      <div class="cookie-banner-actions">
        <button class="button button-primary" type="button" data-cookie-action="dismiss">Dismiss</button>
      </div>
    </div>
  `;

  const settingsButton = document.createElement("button");
  settingsButton.className = "cookie-settings-button";
  settingsButton.type = "button";
  settingsButton.textContent = "Privacy Notice";

  const openBanner = () => {
    banner.classList.remove("is-hidden");
    settingsButton.classList.add("is-visible");
  };

  const closeBanner = () => {
    banner.classList.add("is-hidden");
    settingsButton.classList.add("is-visible");
  };

  banner
    .querySelector('[data-cookie-action="dismiss"]')
    ?.addEventListener("click", () => {
      setConsentState("dismissed");
      closeBanner();
    });

  settingsButton.addEventListener("click", openBanner);

  document.body.appendChild(banner);
  document.body.appendChild(settingsButton);

  if (getConsentState()) {
    banner.classList.add("is-hidden");
    settingsButton.classList.add("is-visible");
  } else {
    openBanner();
  }
};

const setStatusMessage = (node, message, isError = false) => {
  if (!node) return;
  node.textContent = message;
  node.classList.toggle("is-error", isError);
};

const copyToClipboard = async (value) => {
  if (!navigator.clipboard?.writeText) return false;

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};

const buildContactEnquiry = (form) => {
  const getValue = (name) => form.elements.namedItem(name)?.value?.trim() || "";
  const attachmentField = form.elements.namedItem("attachment");
  const attachmentNames =
    attachmentField instanceof HTMLInputElement && attachmentField.files
      ? Array.from(attachmentField.files).map((file) => file.name)
      : [];

  const rows = [
    ["Full Name", getValue("name")],
    ["Company / Client Type", getValue("company")],
    ["Email Address", getValue("email")],
    ["Telephone", getValue("phone")],
    ["Project Location", getValue("project_location")],
    ["Service Required", getValue("service")],
    ["Project Type", getValue("project_type")],
    ["Required Return Date", getValue("required_return_date")],
    ["Project / Tender Details", getValue("message")],
  ];

  if (attachmentNames.length) {
    rows.push(["Files To Attach Separately", attachmentNames.join(", ")]);
  }

  const populatedRows = rows.filter(([, value]) => value);
  const nameForSubject = getValue("name") || "New enquiry";
  const serviceForSubject = getValue("service");
  const subject = `Website enquiry - ${nameForSubject}${
    serviceForSubject ? ` - ${serviceForSubject}` : ""
  }`;
  const body = [
    `Website enquiry submitted via ${SITE_URL}`,
    "",
    ...populatedRows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Please reply to: ${getValue("email") || CONTACT_EMAIL}`,
  ].join("\n");

  return { subject, body, attachmentNames };
};

const setupContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  const statusNode = document.querySelector("[data-form-status]");
  if (!(form instanceof HTMLFormElement) || !statusNode) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }

    const { subject, body, attachmentNames } = buildContactEnquiry(form);
    const copied = await copyToClipboard(body);
    const maxBodyLength = 1800;
    const isTruncated = body.length > maxBodyLength;
    const mailtoBody = isTruncated
      ? `${body.slice(0, maxBodyLength)}\n\n[The full enquiry has been copied to your clipboard if supported.]`
      : body;

    window.location.href = `mailto:${encodeURIComponent(
      CONTACT_EMAIL
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    const messages = [
      `An email draft to ${CONTACT_EMAIL} should open now.`,
    ];

    if (attachmentNames.length) {
      messages.push(
        `Add your selected file${
          attachmentNames.length > 1 ? "s" : ""
        } to the email before sending.`
      );
    }

    if (copied) {
      messages.push(
        isTruncated
          ? "The full enquiry has also been copied to your clipboard in case the draft body is shortened."
          : "A copy of the enquiry has also been copied to your clipboard."
      );
    } else {
      messages.push(
        "If your email app does not open, email info@millimetre.ltd directly and paste in your enquiry details."
      );
    }

    setStatusMessage(statusNode, messages.join(" "));
  });
};

const formatNumber = (value, decimals = 2) =>
  Number(value).toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const readNumber = (form, name, fallback = 0) => {
  const element = form.elements.namedItem(name);
  if (!element) return fallback;
  const value = Number(element.value);
  return Number.isFinite(value) ? value : fallback;
};

const setResult = (container, key, value) => {
  const target = container.querySelector(`[data-result="${key}"]`);
  if (target) target.textContent = value;
};

const getControlDisplayValue = (control) => {
  if (
    control instanceof HTMLSelectElement &&
    control.selectedOptions &&
    control.selectedOptions[0]
  ) {
    return control.selectedOptions[0].textContent.trim();
  }

  if (control instanceof HTMLInputElement && control.type === "file") {
    return control.files?.length
      ? Array.from(control.files)
          .map((file) => file.name)
          .join(", ")
      : "None selected";
  }

  if (
    control instanceof HTMLInputElement ||
    control instanceof HTMLTextAreaElement
  ) {
    return control.value.trim() || "Not provided";
  }

  return "Not provided";
};

const extractFormRows = (form) =>
  Array.from(form.querySelectorAll(".field")).map((field) => {
    const label = field.querySelector("label")?.textContent?.trim() || "Field";
    const control = field.querySelector("input, select, textarea");
    return {
      label,
      value: getControlDisplayValue(control),
    };
  });

const extractResultRows = (results) =>
  Array.from(results.querySelectorAll(".result-item")).map((item) => ({
    label: item.querySelector(".result-label")?.textContent?.trim() || "Result",
    value: item.querySelector("strong")?.textContent?.trim() || "-",
  }));

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const drawRows = (ctx, rows, x, y, width, title) => {
  const padding = 30;
  const rowHeight = 56;
  const headerHeight = 74;
  const height = headerHeight + rows.length * rowHeight + 18;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(95, 67, 48, 0.12)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, x, y, width, height, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#5f4330";
  ctx.font = "700 28px Georgia, serif";
  ctx.fillText(title, x + padding, y + 42);

  ctx.strokeStyle = "rgba(95, 67, 48, 0.12)";
  ctx.beginPath();
  ctx.moveTo(x + padding, y + headerHeight - 10);
  ctx.lineTo(x + width - padding, y + headerHeight - 10);
  ctx.stroke();

  rows.forEach((row, index) => {
    const rowY = y + headerHeight + index * rowHeight;
    ctx.fillStyle = "#7b5a42";
    ctx.font = "600 18px Arial, sans-serif";
    ctx.fillText(row.label, x + padding, rowY + 24);

    ctx.fillStyle = "#241d18";
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText(row.value, x + padding, rowY + 48);
  });

  return height;
};

const exportCalculatorAsImage = (type) => {
  const definition = calculatorExportDefinitions[type];
  const form = document.querySelector(`[data-calculator="${type}"]`);
  const results = document.querySelector(`[data-results="${type}"]`);
  const statusNode = document.querySelector(`[data-export-status="${type}"]`);

  if (!definition || !form || !results) {
    setStatusMessage(statusNode, "The calculator export could not be prepared.", true);
    return;
  }

  definition.recalculate();

  const inputRows = extractFormRows(form);
  const resultRows = extractResultRows(results);

  const width = 1400;
  const topSectionHeight = 260;
  const cardHeight =
    74 + Math.max(inputRows.length, resultRows.length) * 56 + 18;
  const height = topSectionHeight + cardHeight + 190;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    setStatusMessage(statusNode, "The browser could not generate the export image.", true);
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#fbf8f3");
  gradient.addColorStop(1, "#efe6d9");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate((-18 * Math.PI) / 180);
  ctx.fillStyle = "rgba(95, 67, 48, 0.06)";
  ctx.font = "700 100px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(COMPANY_NAME, 0, 0);
  ctx.restore();

  ctx.fillStyle = "#5f4330";
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText(COMPANY_NAME.toUpperCase(), 72, 72);

  ctx.fillStyle = "#241d18";
  ctx.font = "700 54px Georgia, serif";
  ctx.fillText(definition.title, 72, 145);

  ctx.fillStyle = "#5a4d43";
  ctx.font = "500 24px Arial, sans-serif";
  ctx.fillText(
    `Generated ${new Date().toLocaleString("en-GB")} | ${SITE_URL.replace(
      "https://",
      ""
    )}`,
    72,
    192
  );

  ctx.fillStyle = "#7b5a42";
  ctx.font = "500 22px Arial, sans-serif";
  ctx.fillText(
    `Indicative estimate only | Email: ${CONTACT_EMAIL} | Company Reg: SC765980`,
    72,
    230
  );

  const leftX = 72;
  const rightX = 716;
  const cardY = 286;
  const cardWidth = 612;
  drawRows(ctx, inputRows, leftX, cardY, cardWidth, "Inputs");
  drawRows(ctx, resultRows, rightX, cardY, cardWidth, "Results");

  ctx.fillStyle = "#5a4d43";
  ctx.font = "500 22px Arial, sans-serif";
  ctx.fillText(
    "Prepared from the Millimetre Estimating online calculator tools.",
    72,
    height - 82
  );
  ctx.fillText(
    "For project-specific pricing, tender support, or formal measurement, contact Millimetre Estimating Limited.",
    72,
    height - 46
  );

  const link = document.createElement("a");
  const slugDate = new Date().toISOString().slice(0, 10);
  link.download = `millimetre-${definition.filePrefix}-${slugDate}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  setStatusMessage(
    statusNode,
    "PNG export downloaded with Millimetre branding and watermark."
  );
};

const setupCalculatorExports = () => {
  document.querySelectorAll("[data-export-calculator]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-export-calculator");
      if (type) exportCalculatorAsImage(type);
    });
  });
};

const calculateMortarMix = () => {
  const form = document.querySelector('[data-calculator="mortar-mix"]');
  const results = document.querySelector('[data-results="mortar-mix"]');
  if (!form || !results) return;

  const preset = form.elements.namedItem("mixPreset")?.value || "4";
  const customRatio = Math.max(readNumber(form, "customRatio", 4), 1);
  const sandParts = preset === "custom" ? customRatio : Math.max(Number(preset), 1);
  const mortarVolume = Math.max(readNumber(form, "mortarVolume", 0), 0);
  const wasteFactor = Math.max(readNumber(form, "wasteFactor", 1.33), 1);
  const bagVolume = Math.max(readNumber(form, "bagVolume", 0.035), 0.001);
  const sandDensity = Math.max(readNumber(form, "sandDensity", 1600), 1);
  const cementCost = Math.max(readNumber(form, "cementCost", 0), 0);
  const sandCostPerTonne = Math.max(readNumber(form, "sandCostPerTonne", 0), 0);

  const totalDryVolume = mortarVolume * wasteFactor;
  const totalParts = sandParts + 1;
  const cementVolume = totalDryVolume / totalParts;
  const sandVolume = totalDryVolume - cementVolume;
  const cementBags = cementVolume / bagVolume;
  const sandWeightKg = sandVolume * sandDensity;
  const sandWeightTonnes = sandWeightKg / 1000;
  const totalCost = cementBags * cementCost + sandWeightTonnes * sandCostPerTonne;
  const costPerM3 = mortarVolume > 0 ? totalCost / mortarVolume : 0;

  setResult(results, "mixUsed", `1:${formatNumber(sandParts, sandParts % 1 === 0 ? 0 : 1)}`);
  setResult(results, "cementBags", formatNumber(cementBags, 2));
  setResult(results, "sandVolume", `${formatNumber(sandVolume, 2)} m3`);
  setResult(results, "sandWeight", `${formatNumber(sandWeightKg, 0)} kg`);
  setResult(results, "totalCost", formatCurrency(totalCost));
  setResult(results, "costPerM3", formatCurrency(costPerM3));
};

const unitPresets = {
  brick: { length: 215, width: 102.5, height: 65 },
  block100: { length: 440, width: 100, height: 215 },
  block140: { length: 440, width: 140, height: 215 },
  block215: { length: 440, width: 215, height: 215 },
};

const calculateWallEstimator = () => {
  const form = document.querySelector('[data-calculator="wall-estimator"]');
  const results = document.querySelector('[data-results="wall-estimator"]');
  if (!form || !results) return;

  const unitType = form.elements.namedItem("unitType")?.value || "brick";
  const unit = unitPresets[unitType] || unitPresets.brick;
  const wallLength = Math.max(readNumber(form, "wallLength", 0), 0);
  const wallHeight = Math.max(readNumber(form, "wallHeight", 0), 0);
  const openingsArea = Math.max(readNumber(form, "openingsArea", 0), 0);
  const jointThicknessMm = Math.max(readNumber(form, "jointThickness", 10), 1);
  const wastePercent = Math.max(readNumber(form, "wastePercent", 5), 0);
  const unitCost = Math.max(readNumber(form, "unitCost", 0), 0);
  const mortarCostPerM3 = Math.max(readNumber(form, "mortarCostPerM3", 0), 0);

  const grossArea = wallLength * wallHeight;
  const netArea = Math.max(grossArea - openingsArea, 0);
  const moduleLength = (unit.length + jointThicknessMm) / 1000;
  const moduleHeight = (unit.height + jointThicknessMm) / 1000;
  const faceAreaPerUnit = moduleLength * moduleHeight;
  const rawUnits = faceAreaPerUnit > 0 ? netArea / faceAreaPerUnit : 0;
  const unitsWithWaste = Math.ceil(rawUnits * (1 + wastePercent / 100));

  const wallThickness = unit.width / 1000;
  const wallVolume = netArea * wallThickness;
  const unitVolume = (unit.length / 1000) * (unit.width / 1000) * (unit.height / 1000);
  const mortarVolume = Math.max(wallVolume - rawUnits * unitVolume, 0);

  const unitMaterialCost = unitsWithWaste * unitCost;
  const totalEstimatedCost = unitMaterialCost + mortarVolume * mortarCostPerM3;

  setResult(results, "netArea", `${formatNumber(netArea, 2)} m2`);
  setResult(results, "unitsRequired", formatNumber(Math.ceil(rawUnits), 0));
  setResult(results, "unitsWithWaste", formatNumber(unitsWithWaste, 0));
  setResult(results, "mortarVolume", `${formatNumber(mortarVolume, 2)} m3`);
  setResult(results, "unitMaterialCost", formatCurrency(unitMaterialCost));
  setResult(results, "totalEstimatedCost", formatCurrency(totalEstimatedCost));
};

const calculatorExportDefinitions = {
  "mortar-mix": {
    title: "Mortar Mix Calculator",
    filePrefix: "mortar-mix",
    recalculate: calculateMortarMix,
  },
  "wall-estimator": {
    title: "Brick, Block & Mortar Quantities",
    filePrefix: "wall-estimator",
    recalculate: calculateWallEstimator,
  },
};

document.querySelector('[data-calc-action="calculate-mortar-mix"]')?.addEventListener("click", calculateMortarMix);
document.querySelector('[data-calc-action="calculate-wall-estimator"]')?.addEventListener("click", calculateWallEstimator);

if (document.querySelector('[data-calculator="mortar-mix"]')) {
  calculateMortarMix();
}

if (document.querySelector('[data-calculator="wall-estimator"]')) {
  calculateWallEstimator();
}

setupContactForm();
setupCalculatorExports();
createCookieControls();
applyTracking();
