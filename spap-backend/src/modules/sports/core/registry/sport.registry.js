// =============================================
// Sports Registry
// Supported Sports Configuration
// =============================================

const SPORTS_REGISTRY = new Map([
  [
    "football",
    {
      id: "football",
      code: "football",
      name: "Football",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "basketball",
    {
      id: "basketball",
      code: "basketball",
      name: "Basketball",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "volleyball",
    {
      id: "volleyball",
      code: "volleyball",
      name: "Volleyball",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "rugby",
    {
      id: "rugby",
      code: "rugby",
      name: "Rugby",
      version: "1.0.0",
      enabled: false,
    },
  ],

  [
    "athletics",
    {
      id: "athletics",
      code: "athletics",
      name: "Athletics",
      version: "1.0.0",
      enabled: false,
    },
  ],
]);

Object.freeze(SPORTS_REGISTRY);

module.exports = SPORTS_REGISTRY;