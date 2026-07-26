/**
 * ============================================================
 * SPAP Prediction Engine
 * ------------------------------------------------------------
 * Generic prediction workflow engine.
 *
 * Extends PipelineEngine.
 *
 * Responsibilities:
 * - Manage prediction workflows
 * - Execute prediction pipelines
 * - Connect prediction services/models
 *
 * Does NOT:
 * - train models
 * - contain ML algorithms
 * - contain sport rules
 *
 * ============================================================
 */


const PipelineEngine = require("./pipeline.engine");

const {
    PipelineStep
} = require("../pipeline");



class PredictionEngine extends PipelineEngine {


    constructor(options={}){


        super({

            name:"prediction-engine",

            version:"1.0.0",

            type:"prediction",

            ...options

        });


    }





    /**
     * Build prediction pipelines
     */
    buildPipeline(){



        /**
         * =====================================
         * Player Risk Prediction
         * =====================================
         */

        const playerRiskPipeline =
            this.createPipeline({

                id:"player-risk-prediction",

                name:"Player Risk Prediction",

                type:"prediction"

            });





        playerRiskPipeline.add(

            new PipelineStep({

                name:"prepare-player-data",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * PredictionInputService
                     *
                     */


                    return context;

                }

            })

        );





        playerRiskPipeline.add(

            new PipelineStep({

                name:"run-risk-model",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * InjuryRiskModel
                     *
                     */


                    return context;

                }

            })

        );





        /**
         * =====================================
         * Performance Forecast Pipeline
         * =====================================
         */

        const forecastPipeline =
            this.createPipeline({

                id:"performance-forecast",

                name:"Performance Forecast",

                type:"forecast"

            });





        forecastPipeline.add(

            new PipelineStep({

                name:"collect-history",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );





        forecastPipeline.add(

            new PipelineStep({

                name:"predict-performance",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * PerformanceForecastModel
                     *
                     */


                    return context;

                }

            })

        );







        /**
         * =====================================
         * Match Prediction Pipeline
         * =====================================
         */

        const matchPredictionPipeline =
            this.createPipeline({

                id:"match-prediction",

                name:"Match Prediction",

                type:"sports-prediction"

            });





        matchPredictionPipeline.add(

            new PipelineStep({

                name:"analyze-match-data",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );





        matchPredictionPipeline.add(

            new PipelineStep({

                name:"generate-probability",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * MatchPredictionModel
                     *
                     */


                    return context;

                }

            })

        );





        return this;

    }







    /**
     * Execute prediction workflow
     */
    async predict(

        pipelineId,

        data,

        metadata={}

    ){


        return this.execute(

            {

                data,

                metadata:{

                    engine:"prediction-engine",

                    ...metadata

                }

            },

            pipelineId

        );

    }






    /**
     * Player risk shortcut
     */
    async predictPlayerRisk(

        data,

        metadata={}

    ){


        return this.predict(

            "player-risk-prediction",

            data,

            metadata

        );

    }






    /**
     * Performance forecast shortcut
     */
    async forecastPerformance(

        data,

        metadata={}

    ){


        return this.predict(

            "performance-forecast",

            data,

            metadata

        );

    }






    /**
     * Match prediction shortcut
     */
    async predictMatch(

        data,

        metadata={}

    ){


        return this.predict(

            "match-prediction",

            data,

            metadata

        );

    }



}



module.exports = PredictionEngine;