// =============================================
// SPAP Module Registry
// Registers all platform modules
// =============================================

class ModuleRegistry {
    constructor() {
        this.modules = new Map();
    }

    /**
     * Register a module
     * @param {Object} module
     */
    register(module) {
        if (!module) {
            throw new Error("Module is required.");
        }

        if (!module.key) {
            throw new Error("Module key is required.");
        }

        if (this.modules.has(module.key)) {
            throw new Error(
                `Module '${module.key}' is already registered.`
            );
        }

        this.modules.set(module.key, module);

        return module;
    }

    /**
     * Get one module
     * @param {String} key
     */
    get(key) {
        return this.modules.get(key) || null;
    }

    /**
     * Check if module exists
     * @param {String} key
     */
    has(key) {
        return this.modules.has(key);
    }

    /**
     * Remove module
     * @param {String} key
     */
    unregister(key) {
        return this.modules.delete(key);
    }

    /**
     * Get all registered modules
     */
    getAll() {
        return [...this.modules.values()];
    }

    /**
     * Get module keys
     */
    keys() {
        return [...this.modules.keys()];
    }

    /**
     * Clear registry
     */
    clear() {
        this.modules.clear();
    }

    /**
     * Total registered modules
     */
    count() {
        return this.modules.size;
    }
}

module.exports = new ModuleRegistry();