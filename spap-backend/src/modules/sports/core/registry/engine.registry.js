// ==================================================
// Sports Engine Registry
// Shared Sports Engines Configuration
// ==================================================

const ENGINE_REGISTRY = new Map([
  [
    "performance",
    {
      id: "performance",
      code: "performance",
      name: "Performance",
      category: "analysis",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "analytics",
    {
      id: "analytics",
      code: "analytics",
      name: "Analytics",
      category: "analysis",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "reports",
    {
      id: "reports",
      code: "reports",
      name: "Reports",
      category: "reporting",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "training",
    {
      id: "training",
      code: "training",
      name: "Training",
      category: "operations",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "medical",
    {
      id: "medical",
      code: "medical",
      name: "Medical",
      category: "health",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "gps",
    {
      id: "gps",
      code: "gps",
      name: "GPS",
      category: "tracking",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "ai",
    {
      id: "ai",
      code: "ai",
      name: "Artificial Intelligence",
      category: "intelligence",
      version: "1.0.0",
      enabled: true,
    },
  ],

  [
    "notifications",
    {
      id: "notifications",
      code: "notifications",
      name: "Notifications",
      category: "communication",
      version: "1.0.0",
      enabled: true,
    },
  ],
]);

Object.freeze(ENGINE_REGISTRY);

module.exports = ENGINE_REGISTRY;