/**
 * ============================================================
 * SPAP Analysis Engine
 * ------------------------------------------------------------
 * Generic analytics workflow engine.
 *
 * Extends PipelineEngine.
 *
 * Responsibilities:
 * - Manage analysis pipelines
 * - Execute analytics workflows
 * - Provide shared analysis layer
 *
 * Does NOT:
 * - contain sport rules
 * - calculate sport metrics
 * - access database
 *
 * ============================================================
 */


const PipelineEngine = require("./pipeline.engine");

const {
    PipelineStep
} = require("../pipeline");



class AnalysisEngine extends PipelineEngine {



    constructor(options = {}){


        super({

            name:"analysis-engine",

            version:"1.0.0",

            type:"analytics",

            ...options

        });


    }




    /**
     * Build analysis pipelines
     */
    buildPipeline(){



        /**
         * ======================================
         * General Data Analysis Pipeline
         * ======================================
         */

        const dataAnalysisPipeline =
            this.createPipeline({

                id:"data-analysis",

                name:"Data Analysis Pipeline",

                type:"analysis"

            });



        dataAnalysisPipeline.add(

            new PipelineStep({

                name:"validate-data",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );





        dataAnalysisPipeline.add(

            new PipelineStep({

                name:"process-data",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * AnalysisService
                     *
                     */


                    return context;

                }

            })

        );






        /**
         * ======================================
         * Trend Analysis Pipeline
         * ======================================
         */

        const trendPipeline =
            this.createPipeline({

                id:"trend-analysis",

                name:"Trend Analysis Pipeline",

                type:"analytics"

            });



        trendPipeline.add(

            new PipelineStep({

                name:"collect-history",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );




        trendPipeline.add(

            new PipelineStep({

                name:"detect-pattern",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * TrendService
                     *
                     */


                    return context;

                }

            })

        );






        /**
         * ======================================
         * Comparison Analysis Pipeline
         * ======================================
         */

        const comparisonPipeline =
            this.createPipeline({

                id:"comparison-analysis",

                name:"Comparison Analysis Pipeline",

                type:"analytics"

            });





        comparisonPipeline.add(

            new PipelineStep({

                name:"compare-data",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );





        return this;

    }






    /**
     * Execute analysis
     */
    async analyze(

        pipelineId,

        data,

        metadata={}

    ){


        return this.execute(

            {

                data,

                metadata:{

                    engine:"analysis-engine",

                    ...metadata

                }

            },

            pipelineId

        );

    }





    /**
     * Data analysis shortcut
     */
    async analyzeData(

        data,

        metadata={}

    ){


        return this.analyze(

            "data-analysis",

            data,

            metadata

        );

    }





    /**
     * Trend analysis shortcut
     */
    async analyzeTrend(

        data,

        metadata={}

    ){


        return this.analyze(

            "trend-analysis",

            data,

            metadata

        );

    }





    /**
     * Comparison shortcut
     */
    async compare(

        data,

        metadata={}

    ){


        return this.analyze(

            "comparison-analysis",

            data,

            metadata

        );

    }




}



module.exports = AnalysisEngine;