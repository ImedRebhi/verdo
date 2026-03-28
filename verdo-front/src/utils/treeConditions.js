export const crops = [
  {
    key: "olive",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/033/288/551/small/many-olives-top-view-ai-generated-image-photo.jpg",
    p: [6, 8.5],
    s: 25,
    sal: 4,
    region: "all",
  },
  {
    key: "almond",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/011/968/353/small_2x/sicily-almond-tree-fruit-detail-photo.jpg",
    p: [6, 8],
    s: 20,
    sal: 3.5,
    region: "all",
  },
  {
    key: "date_palm",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/072/894/231/small_2x/a-striking-detailed-botanical-image-presents-a-solitary-elegant-date-palm-tree-with-ripe-fruit-photo.jpeg",
    p: [7, 8.5],
    s: 10,
    sal: 6,
    region: "south",
  },
  {
    key: "pistachio",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/071/602/466/small_2x/pistachio-nuts-on-the-pistachio-tree-in-focus-photo.jpg",
    p: [7, 8.5],
    s: 15,
    sal: 4.5,
    region: "all",
  },
  {
    key: "orange",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/039/622/899/small_2x/ai-generated-fresh-citrus-fruit-on-tree-ripe-and-healthy-outdoors-generated-by-ai-free-photo.jpg",
    p: [6, 7.5],
    s: 10,
    sal: 2,
    region: "north",
  },
  {
    key: "lemon",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/032/484/299/small_2x/lemons-growing-in-a-sunny-garden-on-amalfi-coast-in-italy-ai-generated-free-photo.jpg",
    p: [6, 7.5],
    s: 10,
    sal: 2,
    region: "north",
  },
];

const API_ACTIVITY_TO_CROP = {
  olive: ["olive orchard", "olive"],
  almond: ["almond orchard", "almond"],
  date_palm: ["date palm orchard", "date palm", "dates"],
  pistachio: ["pistachio orchard", "pistachio"],
  orange: ["orange orchard", "orange", "citrus orchard", "citrus"],
  lemon: ["lemon orchard", "lemon", "citrus orchard", "citrus"],
};

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const getApiRecommendationForCrop = (recommendations, cropKey) => {
  const aliases = API_ACTIVITY_TO_CROP[cropKey] || [];
  return recommendations.find((item) =>
    aliases.includes(normalizeText(item.activity)),
  ) || null;
};

const fitBonus = (fit) => {
  const normalized = normalizeText(fit);
  if (normalized === "high") return 16;
  if (normalized === "medium") return 10;
  if (normalized === "low") return 2;
  if (normalized === "unsuitable") return -10;
  return 0;
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const pushReason = (reasons, value) => {
  if (value && !reasons.includes(value)) {
    reasons.push(value);
  }
};

const applySoilRules = ({ crop, ph, hasPh, slope, hasSlope, salinity, organicMatter, reasons, tips, t }) => {
  let score = 0;

  if (hasPh && ph >= crop.p[0] && ph <= crop.p[1]) {
    score += 10;
    pushReason(reasons, t("geoai.reasons.soilPhSuitable"));
  } else if (hasPh) {
    score -= 12;
    pushReason(reasons, t("geoai.reasons.soilPhOutside"));
  }

  if (hasSlope && slope <= crop.s) {
    score += 6;
    pushReason(reasons, t("geoai.reasons.slopeManageable"));
  } else if (hasSlope) {
    score -= 10;
    pushReason(reasons, t("geoai.reasons.slopeHigh"));
    tips.push(t("geoai.tips.terraces"));
  }

  if (salinity !== null && salinity > crop.sal) {
    score -= 12;
    pushReason(reasons, t("geoai.reasons.salinityHigh"));
  }

  if (organicMatter !== null && organicMatter >= 2) {
    score += 4;
  }

  return score;
};

const getBaseContext = ({ form, result }) => {
  const lat = Number(form.lat);
  const ph = Number(form.soilPh);
  const slope = Number(form.slopeMax);
  const salinity = form.waterSalinity === "" ? null : Number(form.waterSalinity);
  const organicMatter =
    form.organicMatter === "" ? null : Number(form.organicMatter);
  const hasPh = form.soilPh !== "" && Number.isFinite(ph);
  const hasSlope = form.slopeMax !== "" && Number.isFinite(slope);
  const water =
    form.waterAccess === "true"
      ? true
      : form.waterAccess === "false"
        ? false
        : null;
  const indicators = result?.indicators || {};
  const annualRain = Number(indicators.annual_rainfall_mm_est);
  const hot35 = Number(indicators.hot_days_ge_35_per_year_est);
  const hot40 = Number(indicators.hot_days_ge_40_per_year_est);
  const frost = Number(indicators.frost_days_le_0_per_year_est);
  const aridity = normalizeText(indicators.aridity_class);
  const droughtRisk = normalizeText(
    indicators.drought_risk_no_irrigation || indicators.drought_risk,
  );

  return {
    lat,
    ph,
    slope,
    salinity,
    organicMatter,
    hasPh,
    hasSlope,
    water,
    annualRain,
    hot35,
    hot40,
    frost,
    aridity,
    droughtRisk,
    isNorth: Number.isFinite(lat) && lat >= 36,
    isCentral: Number.isFinite(lat) && lat >= 34.3 && lat < 36,
    isSouth: Number.isFinite(lat) && lat < 34.3,
    isExtremeArid: aridity === "extreme_arid",
    isArid: aridity === "arid",
    isSemiArid: aridity === "semi_arid",
  };
};

const scoreOlive = (context, t) => {
  let score = 42;
  const reasons = [];

  if (context.isArid || context.isSemiArid) score += 16;
  if (Number.isFinite(context.annualRain) && context.annualRain >= 180 && context.annualRain <= 550) score += 14;
  if (Number.isFinite(context.hot35) && context.hot35 >= 15 && context.hot35 <= 70) score += 8;
  if (context.droughtRisk === "medium" || context.droughtRisk === "high") {
    score += 6;
    pushReason(reasons, t("geoai.reasons.dryConditions"));
  }
  if (
    (context.isArid || context.isSemiArid) &&
    Number.isFinite(context.annualRain) &&
    context.annualRain >= 150 &&
    context.annualRain <= 280 &&
    Number.isFinite(context.hot35) &&
    context.hot35 >= 30
  ) {
    score -= 8;
  }
  if (context.isExtremeArid) score -= 20;
  if (Number.isFinite(context.annualRain) && context.annualRain > 650) score -= 8;
  if (context.isNorth && context.water !== false && Number.isFinite(context.annualRain) && context.annualRain >= 380 && context.droughtRisk === "low") {
    score -= 14;
    pushReason(reasons, t("geoai.reasons.citrusZone"));
  }

  return { score, reasons };
};

const scoreAlmond = (context, t) => {
  let score = 40;
  const reasons = [];

  if (context.isSemiArid) score += 18;
  if (Number.isFinite(context.annualRain) && context.annualRain >= 240 && context.annualRain <= 450) score += 16;
  if (Number.isFinite(context.frost) && context.frost >= 1 && context.frost <= 12) score += 10;
  if (Number.isFinite(context.hot35) && context.hot35 >= 10 && context.hot35 <= 55) score += 8;
  if (context.isExtremeArid) score -= 20;
  if (Number.isFinite(context.annualRain) && context.annualRain < 180) score -= 14;
  if (Number.isFinite(context.hot35) && context.hot35 > 75) score -= 10;
  if (
    context.isNorth &&
    Number.isFinite(context.annualRain) &&
    context.annualRain >= 380 &&
    context.droughtRisk === "low" &&
    Number.isFinite(context.frost) &&
    context.frost <= 2
  ) {
    score -= 18;
    pushReason(reasons, t("geoai.reasons.citrusZone"));
  }

  return { score, reasons };
};

const scorePistachio = (context, t) => {
  let score = 38;
  const reasons = [];

  if (context.isArid || context.isSemiArid) score += 18;
  if (Number.isFinite(context.annualRain) && context.annualRain >= 180 && context.annualRain <= 320) score += 18;
  if (Number.isFinite(context.hot35) && context.hot35 >= 25 && context.hot35 <= 75) score += 12;
  if (context.isCentral || context.isSouth) score += 6;
  if (
    (context.isArid || context.isSemiArid) &&
    Number.isFinite(context.annualRain) &&
    context.annualRain >= 150 &&
    context.annualRain <= 280 &&
    Number.isFinite(context.hot35) &&
    context.hot35 >= 30
  ) {
    score += 12;
  }
  if (Number.isFinite(context.annualRain) && context.annualRain > 450) score -= 10;
  if (context.isExtremeArid && Number.isFinite(context.annualRain) && context.annualRain < 140) score -= 8;

  return { score, reasons };
};

const scoreDatePalm = (context, t) => {
  let score = 28;
  const reasons = [];

  if (context.isSouth) {
    score += 22;
    pushReason(reasons, t("geoai.reasons.southBetter"));
  }
  if (context.isArid) score += 14;
  if (context.isExtremeArid) score += 26;
  if (Number.isFinite(context.annualRain) && context.annualRain < 180) score += 16;
  if (Number.isFinite(context.hot35) && context.hot35 >= 80) score += 18;
  if (context.water === true) score += 8;
  if (context.water === false) {
    score -= 14;
    pushReason(reasons, t("geoai.reasons.needsIrrigation"));
  }
  if (context.isNorth) score -= 20;
  if (Number.isFinite(context.frost) && context.frost > 0) score -= 16;
  if (Number.isFinite(context.annualRain) && context.annualRain > 250) score -= 12;

  return { score, reasons };
};

const scoreOrange = (context, t) => {
  let score = 26;
  const reasons = [];

  if (context.isNorth) {
    score += 20;
    pushReason(reasons, t("geoai.reasons.northBetter"));
  }
  if (Number.isFinite(context.annualRain) && context.annualRain >= 380) score += 18;
  if (context.isSemiArid || context.aridity === "humid") score += 10;
  if (context.droughtRisk === "low") {
    score += 12;
    pushReason(reasons, t("geoai.reasons.citrusZone"));
  }
  if (context.water === true) score += 12;
  if (context.water === null) score += 4;
  if (context.water === false) {
    score -= 22;
    pushReason(reasons, t("geoai.reasons.needsIrrigation"));
  }
  if (Number.isFinite(context.hot35) && context.hot35 > 55) score -= 10;
  if (Number.isFinite(context.frost) && context.frost > 2) score -= 14;
  if (context.isSouth) score -= 14;
  if (Number.isFinite(context.annualRain) && context.annualRain < 250) score -= 16;

  return { score, reasons };
};

const scoreLemon = (context, t) => {
  let score = 28;
  const reasons = [];

  if (context.isNorth) {
    score += 18;
    pushReason(reasons, t("geoai.reasons.northBetter"));
  }
  if (Number.isFinite(context.annualRain) && context.annualRain >= 320) score += 16;
  if (context.isSemiArid || context.aridity === "humid") score += 10;
  if (context.droughtRisk === "low") {
    score += 12;
    pushReason(reasons, t("geoai.reasons.citrusZone"));
  }
  if (context.water === true) score += 12;
  if (context.water === null) score += 5;
  if (context.water === false) {
    score -= 22;
    pushReason(reasons, t("geoai.reasons.needsIrrigation"));
  }
  if (Number.isFinite(context.hot40) && context.hot40 > 20) score -= 8;
  if (Number.isFinite(context.frost) && context.frost > 3) score -= 12;
  if (context.isSouth) score -= 12;
  if (Number.isFinite(context.annualRain) && context.annualRain < 220) score -= 18;

  return { score, reasons };
};

const getCropSpecificScore = (cropKey, context, t) => {
  if (cropKey === "olive") return scoreOlive(context, t);
  if (cropKey === "almond") return scoreAlmond(context, t);
  if (cropKey === "pistachio") return scorePistachio(context, t);
  if (cropKey === "date_palm") return scoreDatePalm(context, t);
  if (cropKey === "orange") return scoreOrange(context, t);
  if (cropKey === "lemon") return scoreLemon(context, t);
  return { score: 35, reasons: [] };
};

export const getCropResults = ({ form, result, t, badgeClassForVerdict }) => {
  const context = getBaseContext({ form, result });
  const apiRecommendations = Array.isArray(result?.recommendations)
    ? result.recommendations
    : [];

  return crops
    .map((crop) => {
      const localizedCrop = {
        ...crop,
        name: t(`geoai.crops.${crop.key}.name`),
        localName: t(`geoai.crops.${crop.key}.localName`),
        tip: t(`geoai.crops.${crop.key}.tip`),
      };
      const reasons = [];
      const tips = [];
      const apiRec = getApiRecommendationForCrop(apiRecommendations, localizedCrop.key);
      let score = 0;

      if (apiRec) {
        score += fitBonus(apiRec.fit);
        if (apiRec.fit) {
          reasons.push(t("geoai.reasons.geoAiFit", { fit: apiRec.fit }));
        }
      }

      score += applySoilRules({
        crop: localizedCrop,
        ph: context.ph,
        hasPh: context.hasPh,
        slope: context.slope,
        hasSlope: context.hasSlope,
        salinity: context.salinity,
        organicMatter: context.organicMatter,
        reasons,
        tips,
        t,
      });

      const cropScore = getCropSpecificScore(localizedCrop.key, context, t);
      score += cropScore.score;
      cropScore.reasons.forEach((reason) => pushReason(reasons, reason));

      score = clamp(score, 20, 95);

      const verdictKey =
        score >= 82
          ? "excellent"
          : score >= 68
            ? "good"
            : score < 50
              ? "notRecommended"
              : "possible";

      const verdict =
        verdictKey === "excellent"
          ? t("geoai.verdicts.excellent")
          : verdictKey === "good"
            ? t("geoai.verdicts.good")
            : verdictKey === "possible"
              ? t("geoai.verdicts.possible")
              : t("geoai.verdicts.notRecommended");

      return {
        ...localizedCrop,
        score,
        verdictKey,
        verdict,
        badgeClass: badgeClassForVerdict(verdictKey),
        reasons: reasons.slice(0, 4),
        tips: (tips.length ? tips : [localizedCrop.tip]).slice(0, 3),
        recommendation:
          verdictKey === "notRecommended"
            ? t("geoai.full.notSafeFirstChoice", { crop: localizedCrop.name })
            : t("geoai.full.viableOption", { crop: localizedCrop.name }),
        simpleMessage:
          verdictKey === "excellent"
            ? t("geoai.simple.excellent", { crop: localizedCrop.name })
            : verdictKey === "good"
              ? t("geoai.simple.good", { crop: localizedCrop.name })
              : verdictKey === "possible"
                ? t("geoai.simple.possible", { crop: localizedCrop.name })
                : t("geoai.simple.notRecommended", { crop: localizedCrop.name }),
      };
    })
    .sort((left, right) => right.score - left.score);
};
