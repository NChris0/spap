// =============================================
// SPAP Module Loader
// Auto-discovers and registers modules
// =============================================

const fs = require("fs");
const path = require("path");

const moduleRegistry = require("./module.registry");

class ModuleLoader {
    constructor() {
        this.loaded = false;
    }

    /**
     * Discover all modules inside src/modules
     */
    discover() {
        const modulesPath = path.join(__dirname, "../modules");

        if (!fs.existsSync(modulesPath)) {
            return [];
        }

        return fs
            .readdirSync(modulesPath, { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .map((entry) => {
                const modulePath = path.join(modulesPath, entry.name);

                try {
                    return require(modulePath);
                } catch (error) {
                    console.warn(
                        `Failed to load module '${entry.name}': ${error.message}`
                    );
                    return null;
                }
            })
            .filter(Boolean);
    }

    /**
     * Load all discovered modules
     */
    load() {
        const modules = this.discover();

        modules.forEach((module) => {
            moduleRegistry.register(module);

            if (typeof module.register === "function") {
                module.register();
            }
        });

        this.loaded = true;

        return moduleRegistry.getAll();
    }

    /**
     * Boot all modules
     */
    boot() {
        moduleRegistry.getAll().forEach((module) => {
            if (typeof module.boot === "function") {
                module.boot();
            }
        });
    }

    /**
     * Reload all modules
     */
    reload() {
        moduleRegistry.clear();
        this.loaded = false;

        return this.load();
    }

    /**
     * Check loader status
     */
    isLoaded() {
        return this.loaded;
    }
}

module.exports = new ModuleLoader();