// =============================================
// Sports Metric Registry
// Registers all sport metrics
// =============================================

class MetricRegistry {
    constructor() {
        this.metrics = new Map();
    }

    /**
     * Register a metric
     * @param {Object} metric
     */
    register(metric) {
        if (!metric) {
            throw new Error("Metric is required.");
        }

        if (!metric.key) {
            throw new Error("Metric key is required.");
        }

        if (this.metrics.has(metric.key)) {
            throw new Error(
                `Metric '${metric.key}' is already registered.`
            );
        }

        this.metrics.set(metric.key, metric);

        return metric;
    }

    /**
     * Get one metric
     * @param {String} key
     */
    get(key) {
        return this.metrics.get(key) || null;
    }

    /**
     * Check metric existence
     */
    has(key) {
        return this.metrics.has(key);
    }

    /**
     * Remove metric
     */
    unregister(key) {
        return this.metrics.delete(key);
    }

    /**
     * Get all metrics
     */
    getAll() {
        return [...this.metrics.values()];
    }

    /**
     * Get metrics by sport
     */
    getBySport(sport) {
        return this.getAll().filter(
            (metric) => metric.sport === sport
        );
    }

    /**
     * Clear registry
     */
    clear() {
        this.metrics.clear();
    }

    /**
     * Total metrics
     */
    count() {
        return this.metrics.size;
    }
}

module.exports = new MetricRegistry();