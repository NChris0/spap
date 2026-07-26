/**
 * ============================================================
 * SPAP Pipeline Framework
 * ------------------------------------------------------------
 * Central exports for the pipeline framework.
 * ============================================================
 */

const Pipeline = require("./pipeline");
const PipelineStep = require("./pipeline.step");
const PipelineContext = require("./pipeline.context");

module.exports = {
  Pipeline,
  PipelineStep,
  PipelineContext,
};