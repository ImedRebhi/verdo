const express = require("express");
const jwt = require("jsonwebtoken");
const Analysis = require("../models/Analysis");

const router = express.Router();

const GEOAI_API_URL =
  process.env.GEOAI_API_URL ||
  "https://geoai-ahao.onrender.com/v1/site-analysis";
const OVERPASS_API_URLS = (
  process.env.OVERPASS_API_URLS ||
  process.env.OVERPASS_API_URL ||
  [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://lz4.overpass-api.de/api/interpreter",
  ].join(",")
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);
const REVERSE_GEOCODE_URLS = (
  process.env.REVERSE_GEOCODE_URLS ||
  [
    "https://nominatim.openstreetmap.org/reverse",
    "https://geocode.maps.co/reverse",
  ].join(",")
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const BUILDING_LANDUSE_TAGS = new Set([
  "residential",
  "commercial",
  "industrial",
  "retail",
  "construction",
  "brownfield",
  "garages",
  "railway",
  "port",
  "military",
]);

const AGRICULTURAL_LANDUSE_TAGS = new Set([
  "farmland",
  "farmyard",
  "orchard",
  "vineyard",
  "greenhouse_horticulture",
  "plant_nursery",
  "meadow",
]);

const WATER_LANDUSE_TAGS = new Set([
  "basin",
  "reservoir",
  "salt_pond",
]);

const WATER_NATURAL_TAGS = new Set([
  "water",
  "bay",
  "coastline",
  "wetland",
  "strait",
]);

const WATERWAY_TAGS = new Set([
  "river",
  "stream",
  "canal",
  "drain",
  "wadi",
]);

const URBAN_PLACE_TAGS = new Set([
  "city",
  "town",
  "suburb",
  "neighbourhood",
  "quarter",
  "borough",
  "village",
]);

const URBAN_AMENITY_TAGS = new Set([
  "school",
  "hospital",
  "clinic",
  "university",
  "college",
  "marketplace",
  "parking",
  "fuel",
  "bank",
  "restaurant",
  "cafe",
  "pharmacy",
  "bus_station",
  "police",
  "townhall",
  "courthouse",
]);

const URBAN_HIGHWAY_TAGS = new Set([
  "motorway",
  "trunk",
  "primary",
  "secondary",
  "tertiary",
  "residential",
  "living_street",
  "service",
]);

const OVERPASS_RADIUS_METERS = 80;
const WATER_SCAN_RADIUS_METERS = 750;
const LAND_USE_REQUEST_TIMEOUT_MS = 9000;

const resolveUserId = (req) => {
  if (req.body?.userId) {
    return req.body.userId;
  }

  if (req.query?.userId) {
    return req.query.userId;
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      return null;
    }
  }

  if (req.cookies?.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      return null;
    }
  }

  return null;
};

const fetchWithTimeout = async (url, options = {}, timeoutMs = LAND_USE_REQUEST_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const runOverpassQuery = async (lat, lon) => {
  const query = `
    [out:json][timeout:20];
    is_in(${lat},${lon})->.containingAreas;
    (
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["building"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["building"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["landuse"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["building"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["landuse"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["landuse"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["place"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["place"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["place"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["amenity"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["amenity"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["highway"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["highway"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["natural"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["natural"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["natural"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["water"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["water"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["water"];
      node(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["waterway"];
      way(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["waterway"];
      relation(around:${OVERPASS_RADIUS_METERS},${lat},${lon})["waterway"];
      way(pivot.containingAreas)["natural"="water"];
      relation(pivot.containingAreas)["natural"="water"];
      way(pivot.containingAreas)["water"];
      relation(pivot.containingAreas)["water"];
      way(pivot.containingAreas)["landuse"];
      relation(pivot.containingAreas)["landuse"];
      way(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["natural"="coastline"];
      relation(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["natural"="coastline"];
      way(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["natural"="water"];
      relation(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["natural"="water"];
      way(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["water"];
      relation(around:${WATER_SCAN_RADIUS_METERS},${lat},${lon})["water"];
    );
    out tags center;
  `.trim();

  const errors = [];

  for (const endpoint of OVERPASS_API_URLS) {
    try {
      const response = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams({ data: query }),
      });

      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      errors.push(`${endpoint}: ${error.message}`);
    }
  }

  throw new Error(`All Overpass endpoints failed. ${errors.join(" | ")}`);
};

const runReverseGeocodeFallback = async (lat, lon) => {
  const errors = [];

  for (const endpoint of REVERSE_GEOCODE_URLS) {
    try {
      const separator = endpoint.includes("?") ? "&" : "?";
      const url = `${endpoint}${separator}format=jsonv2&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;
      const response = await fetchWithTimeout(
        url,
        {
          headers: {
            "User-Agent": "Verdolive/1.0 GeoAI land-use fallback",
          },
        },
        LAND_USE_REQUEST_TIMEOUT_MS,
      );

      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      errors.push(`${endpoint}: ${error.message}`);
    }
  }

  throw new Error(`All reverse geocode endpoints failed. ${errors.join(" | ")}`);
};

const analyzeLandUse = (payload = {}) => {
  const elements = Array.isArray(payload.elements) ? payload.elements : [];

  let buildingCount = 0;
  let urbanLanduseCount = 0;
  let urbanPlaceCount = 0;
  let urbanAmenityCount = 0;
  let urbanHighwayCount = 0;
  let agriculturalCount = 0;
  let waterCount = 0;
  let coastlineCount = 0;
  const tags = [];

  for (const element of elements) {
    const currentTags = element.tags || {};
    if (!Object.keys(currentTags).length) {
      continue;
    }

    tags.push(currentTags);

    if (currentTags.building) {
      buildingCount += 1;
    }

    if (BUILDING_LANDUSE_TAGS.has(currentTags.landuse)) {
      urbanLanduseCount += 1;
    }

    if (URBAN_PLACE_TAGS.has(currentTags.place)) {
      urbanPlaceCount += 1;
    }

    if (URBAN_AMENITY_TAGS.has(currentTags.amenity)) {
      urbanAmenityCount += 1;
    }

    if (URBAN_HIGHWAY_TAGS.has(currentTags.highway)) {
      urbanHighwayCount += 1;
    }

    if (
      WATER_LANDUSE_TAGS.has(currentTags.landuse) ||
      WATER_NATURAL_TAGS.has(currentTags.natural) ||
      WATERWAY_TAGS.has(currentTags.waterway) ||
      currentTags.water
    ) {
      waterCount += 1;
    }

    if (currentTags.natural === "coastline") {
      coastlineCount += 1;
    }

    if (
      AGRICULTURAL_LANDUSE_TAGS.has(currentTags.landuse) ||
      currentTags.crop ||
      currentTags.irrigation === "yes"
    ) {
      agriculturalCount += 1;
    }
  }

  const urbanSignalScore =
    buildingCount * 5 +
    urbanLanduseCount * 4 +
    urbanPlaceCount * 3 +
    urbanAmenityCount * 2 +
    urbanHighwayCount;

  const hasBuildings =
    buildingCount > 0 ||
    urbanLanduseCount > 0 ||
    urbanPlaceCount > 0 ||
    urbanSignalScore >= 5;
  const onlyWaterSignals =
    !hasBuildings &&
    agriculturalCount === 0 &&
    urbanAmenityCount === 0 &&
    urbanHighwayCount === 0 &&
    urbanPlaceCount === 0 &&
    urbanLanduseCount === 0;
  const looksLikeWater =
    onlyWaterSignals && (waterCount > 0 || coastlineCount > 0);
  const looksAgricultural = agriculturalCount > 0 && !hasBuildings;

  return {
    source: "overpass",
    radiusMeters: OVERPASS_RADIUS_METERS,
    hasBuildings,
    buildingCount,
    urbanLanduseCount,
    urbanPlaceCount,
    urbanAmenityCount,
    urbanHighwayCount,
    urbanSignalScore,
    agriculturalCount,
    waterCount,
    coastlineCount,
    isAgricultureAvailable: !hasBuildings && !looksLikeWater,
    classification: hasBuildings
      ? "built_up"
      : looksLikeWater
      ? "water"
      : looksAgricultural
      ? "agricultural"
      : "open_land",
    summary: hasBuildings
      ? "This coordinate appears to fall on buildings, roads, amenities, or urban land."
      : looksLikeWater
      ? "This coordinate appears to fall on sea or open water, not on agricultural land."
      : looksAgricultural
      ? "This coordinate appears open and suitable for agricultural analysis."
      : "No buildings were detected nearby. The land looks open enough for agricultural analysis.",
    matchedTags: tags.slice(0, 8),
  };
};

const analyzeReverseGeocodeLandUse = (payload = {}) => {
  const category = String(payload.category || payload.class || "").toLowerCase();
  const type = String(payload.type || payload.addresstype || "").toLowerCase();
  const address = payload.address || {};
  const displayName = String(payload.display_name || "").toLowerCase();
  const addressValues = Object.values(address).map((value) =>
    String(value || "").toLowerCase(),
  );

  const strongWaterCategories = new Set(["natural", "water"]);
  const strongWaterTypes = new Set([
    "water",
    "sea",
    "ocean",
    "bay",
    "coastline",
    "strait",
    "reservoir",
    "lake",
    "lagoon",
  ]);
  const strongUrbanCategories = new Set([
    "building",
    "highway",
    "amenity",
    "landuse",
  ]);
  const strongUrbanTypes = new Set([
    "city",
    "town",
    "suburb",
    "quarter",
    "neighbourhood",
    "residential",
    "road",
    "house",
    "building",
    "amenity",
    "apartments",
    "commercial",
    "industrial",
  ]);

  const isWater =
    (strongWaterCategories.has(category) && strongWaterTypes.has(type)) ||
    (type === "sea" || type === "ocean") ||
    (strongWaterCategories.has(category) &&
      [" sea", " ocean", " bay", " gulf", "water "].some((token) =>
        displayName.includes(token),
      )) ||
    addressValues.some((value) =>
      ["mediterranean sea", "sea", "ocean", "gulf", "bay"].includes(value),
    );

  const isUrban =
    strongUrbanCategories.has(category) ||
    (category === "place" && strongUrbanTypes.has(type)) ||
    Boolean(address.house_number) ||
    (Boolean(address.road) &&
      Boolean(address.city || address.town || address.suburb || address.neighbourhood));

  if (isWater) {
    return {
      source: "reverse-geocode",
      isAgricultureAvailable: false,
      classification: "water",
      summary: "This coordinate appears to fall on sea or open water, not on agricultural land.",
    };
  }

  if (isUrban) {
    return {
      source: "reverse-geocode",
      isAgricultureAvailable: false,
      classification: "built_up",
      summary: "This coordinate appears to fall on buildings, roads, amenities, or urban land.",
    };
  }

  return {
    source: "reverse-geocode",
    isAgricultureAvailable: true,
    classification: "unknown",
    summary: "Reverse geocoding did not detect water or urban land at this coordinate.",
  };
};

router.post("/analyze", async (req, res) => {
  try {
    const { lat, lon, constraints = {}, soil_test = {} } = req.body;
    const userId = resolveUserId(req);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be valid numbers.",
      });
    }

    let landUseCheck;
    try {
      const overpassPayload = await runOverpassQuery(lat, lon);
      landUseCheck = analyzeLandUse(overpassPayload);
    } catch (error) {
      console.error("Overpass land-use check failed:", error);
      try {
        const reversePayload = await runReverseGeocodeFallback(lat, lon);
        landUseCheck = {
          radiusMeters: OVERPASS_RADIUS_METERS,
          hasBuildings: false,
          buildingCount: 0,
          urbanLanduseCount: 0,
          urbanPlaceCount: 0,
          urbanAmenityCount: 0,
          urbanHighwayCount: 0,
          urbanSignalScore: 0,
          agriculturalCount: 0,
          waterCount: 0,
          coastlineCount: 0,
          matchedTags: [],
          ...analyzeReverseGeocodeLandUse(reversePayload),
        };
      } catch (reverseError) {
        console.error("Reverse geocode land-use check failed:", reverseError);
        landUseCheck = {
          source: "land-use-fallback",
          radiusMeters: OVERPASS_RADIUS_METERS,
          hasBuildings: false,
          buildingCount: 0,
          urbanLanduseCount: 0,
          urbanPlaceCount: 0,
          urbanAmenityCount: 0,
          urbanHighwayCount: 0,
          urbanSignalScore: 0,
          agriculturalCount: 0,
          waterCount: 0,
          coastlineCount: 0,
          isAgricultureAvailable: true,
          classification: "unknown",
          summary:
            "Land-use verification is currently unavailable, so the result is based on GeoAI only.",
          matchedTags: [],
        };
      }
    }

    let result;
      if (!landUseCheck.isAgricultureAvailable) {
      const isWater = landUseCheck.classification === "water";
        result = {
          site: { lat, lon },
          constraints,
          soil_test,
          landUseCheck,
          siteAssessment: {
            isAgricultureAvailable: false,
            status: landUseCheck.classification,
            headline: isWater
              ? "This coordinate is sea or open water, not agricultural land."
              : "This land is not available for agriculture.",
            summary: isWater
              ? "Water was detected at this coordinate, so tree planting is not possible here."
              : "A building or dense urban land was detected at this coordinate, so tree planting is not recommended here.",
          },
          recommendedCrops: [],
        };
    } else {
      const geoAiResponse = await fetch(GEOAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          site: { lat, lon },
          constraints,
          soil_test,
        }),
      });

      if (!geoAiResponse.ok) {
        const responseText = await geoAiResponse.text();
        return res.status(502).json({
          success: false,
          message: "GeoAI request failed.",
          details: responseText || geoAiResponse.statusText,
        });
      }

      const geoAiResult = await geoAiResponse.json();
      result = {
        ...geoAiResult,
        landUseCheck,
        siteAssessment: {
          isAgricultureAvailable: true,
          status: landUseCheck.classification,
          headline: "This land looks available for agriculture.",
          summary:
            "No buildings were detected at this coordinate, so we can continue with agricultural suitability and crop recommendations.",
        },
      };
    }

    const analysis = await Analysis.create({
      userId,
      lat,
      lon,
      constraints,
      soilTest: soil_test,
      result,
    });

    res.status(200).json({
      success: true,
      analysisId: analysis._id,
      result,
    });
  } catch (error) {
    console.error("GeoAI analyze error:", error);
    res.status(500).json({
      success: false,
      message: "GeoAI request failed",
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    const userId = resolveUserId(req);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "A user id is required to load GeoAI history.",
      });
    }

    const analyses = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error("GeoAI history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load GeoAI history",
    });
  }
});

module.exports = router;
