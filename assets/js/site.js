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

document.querySelector('[data-calc-action="calculate-mortar-mix"]')?.addEventListener("click", calculateMortarMix);
document.querySelector('[data-calc-action="calculate-wall-estimator"]')?.addEventListener("click", calculateWallEstimator);

if (document.querySelector('[data-calculator="mortar-mix"]')) {
  calculateMortarMix();
}

if (document.querySelector('[data-calculator="wall-estimator"]')) {
  calculateWallEstimator();
}

createCookieControls();
applyTracking();
