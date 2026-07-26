/**
 * ============================================================
 * SPAP Base Engine (Enterprise)
 * ============================================================
 */

const EventEmitter = require("events");

class BaseEngine extends EventEmitter {
  constructor(name = "base-engine") {
    super();

    if (new.target === BaseEngine) {
      throw new Error("BaseEngine is abstract and cannot be instantiated.");
    }

    this.name = name;
    this.version = "1.0.0";

    this.state = "idle";

    this.metrics = {
      executions: 0,
      successes: 0,
      failures: 0,
      totalExecutionTime: 0,
    };

    this.plugins = [];
  }

  /**
   * ============================================================
   * Public API
   * ============================================================
   */

  async run(context = {}) {
    const startedAt = Date.now();

    this.state = "running";

    this.emit("started", {
      engine: this.name,
      timestamp: new Date().toISOString(),
    });

    try {
      await this.beforeRun(context);

      const initializedContext = await this.initialize(context);

      await this.validate(initializedContext);

      const result = await this.execute(initializedContext);

      await this.afterRun(result);

      await this.onSuccess(result);

      this.state = "completed";

      this.metrics.executions++;
      this.metrics.successes++;
      this.metrics.totalExecutionTime += Date.now() - startedAt;

      this.emit("completed", result);

      return this.format({
        success: true,
        data: result,
        startedAt,
      });

    } catch (error) {

      this.state = "failed";

      this.metrics.executions++;
      this.metrics.failures++;
      this.metrics.totalExecutionTime += Date.now() - startedAt;

      await this.onError(error);

      this.emit("failed", error);

      return this.format({
        success: false,
        error,
        startedAt,
      });

    }
  }

  /**
   * ============================================================
   * Hooks
   * ============================================================
   */

  async beforeRun() {}

  async initialize(context) {
    return {
      ...context,
      engine: this.name,
      timestamp: new Date().toISOString(),
    };
  }

  async validate(context) {
    if (!context || typeof context !== "object") {
      throw new Error("Invalid engine context.");
    }
  }

  async execute() {
    throw new Error("execute() must be implemented.");
  }

  async afterRun() {}

  async onSuccess() {}

  async onError() {}

  /**
   * ============================================================
   * Plugins
   * ============================================================
   */

  registerPlugin(plugin) {
    this.plugins.push(plugin);
  }

  getPlugins() {
    return this.plugins;
  }

  /**
   * ============================================================
   * Metrics
   * ============================================================
   */

  getMetrics() {
    const averageExecutionTime =
      this.metrics.executions === 0
        ? 0
        : this.metrics.totalExecutionTime / this.metrics.executions;

    return {
      ...this.metrics,
      averageExecutionTime,
      state: this.state,
    };
  }

  resetMetrics() {
    this.metrics = {
      executions: 0,
      successes: 0,
      failures: 0,
      totalExecutionTime: 0,
    };
  }

  /**
   * ============================================================
   * Formatter
   * ============================================================
   */

  format({
    success,
    data = null,
    error = null,
    startedAt,
  }) {
    return {
      success,

      engine: this.name,

      version: this.version,

      state: this.state,

      executionTime: Date.now() - startedAt,

      timestamp: new Date().toISOString(),

      data,

      error: error
        ? {
            message: error.message,
            stack:
              process.env.NODE_ENV === "development"
                ? error.stack
                : undefined,
          }
        : null,

      metadata: {
        metrics: this.getMetrics(),
      },
    };
  }
}

module.exports = BaseEngine;