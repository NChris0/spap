// =============================================
// Sports Registry Service
// Unified access to all sports registries
// =============================================

const moduleRegistry = require("../../../core/module.registry");
const engineRegistry = require("./engine.registry");
const metricRegistry = require("./metric.registry");

class RegistryService {
    // =============================
    // Modules
    // =============================

    getModule(key) {
        return moduleRegistry.get(key);
    }

    getModules() {
        return moduleRegistry.getAll();
    }

    hasModule(key) {
        return moduleRegistry.has(key);
    }

    // =============================
    // Engines
    // =============================

    getEngine(key) {
        return engineRegistry.get(key);
    }

    getEngines() {
        return engineRegistry.getAll();
    }

    hasEngine(key) {
        return engineRegistry.has(key);
    }

    // =============================
    // Metrics
    // =============================

    getMetric(key) {
        return metricRegistry.get(key);
    }

    getMetrics() {
        return metricRegistry.getAll();
    }

    getMetricsBySport(sport) {
        return metricRegistry.getBySport(sport);
    }

    hasMetric(key) {
        return metricRegistry.has(key);
    }

    // =============================
    // Summary
    // =============================

    summary() {
        return {
            modules: moduleRegistry.count(),
            engines: engineRegistry.count(),
            metrics: metricRegistry.count(),
        };
    }
}

module.exports = new RegistryService();