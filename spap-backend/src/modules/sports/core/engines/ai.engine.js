/**
 * ============================================================
 * SPAP AI Engine
 * ------------------------------------------------------------
 * Generic Artificial Intelligence workflow engine.
 *
 * Extends PipelineEngine.
 *
 * Responsibilities:
 * - Manage AI pipelines
 * - Execute AI workflows
 * - Connect AI services/models
 *
 * Does NOT:
 * - train models
 * - contain ML algorithms
 * - contain sport logic
 *
 * ============================================================
 */


const PipelineEngine = require("./pipeline.engine");

const {
    PipelineStep
} = require("../pipeline");



class AIEngine extends PipelineEngine {


    constructor(options={}){


        super({

            name:"ai-engine",

            version:"1.0.0",

            type:"artificial-intelligence",

            ...options

        });


    }





    /**
     * Build AI pipelines
     */
    buildPipeline(){



        /**
         * =====================================
         * Prediction Pipeline
         * =====================================
         */

        const predictionPipeline =
            this.createPipeline({

                id:"prediction",

                name:"AI Prediction Pipeline",

                type:"ai"

            });




        predictionPipeline.add(

            new PipelineStep({

                name:"prepare-input",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * AIInputProcessor
                     *
                     */


                    return context;

                }

            })

        );





        predictionPipeline.add(

            new PipelineStep({

                name:"run-model",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * ML Model Service
                     *
                     */


                    return context;

                }

            })

        );





        /**
         * =====================================
         * Recommendation Pipeline
         * =====================================
         */

        const recommendationPipeline =
            this.createPipeline({

                id:"recommendation",

                name:"AI Recommendation Pipeline",

                type:"ai"

            });





        recommendationPipeline.add(

            new PipelineStep({

                name:"analyze-context",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );





        recommendationPipeline.add(

            new PipelineStep({

                name:"generate-recommendation",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * RecommendationService
                     *
                     */


                    return context;

                }

            })

        );







        /**
         * =====================================
         * Computer Vision Pipeline
         * =====================================
         */

        const visionPipeline =
            this.createPipeline({

                id:"vision-analysis",

                name:"AI Vision Pipeline",

                type:"computer-vision"

            });






        visionPipeline.add(

            new PipelineStep({

                name:"process-media",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * Vision Model
                     *
                     */


                    return context;

                }

            })

        );




        return this;

    }







    /**
     * Execute AI workflow
     */
    async run(

        pipelineId,

        data,

        metadata={}

    ){


        return this.execute(

            {

                data,

                metadata:{

                    engine:"ai-engine",

                    ...metadata

                }

            },

            pipelineId

        );

    }





    /**
     * Prediction shortcut
     */
    async predict(

        data,

        metadata={}

    ){


        return this.run(

            "prediction",

            data,

            metadata

        );

    }





    /**
     * Recommendation shortcut
     */
    async recommend(

        data,

        metadata={}

    ){


        return this.run(

            "recommendation",

            data,

            metadata

        );

    }





    /**
     * Vision shortcut
     */
    async analyzeVision(

        data,

        metadata={}

    ){


        return this.run(

            "vision-analysis",

            data,

            metadata

        );

    }



}



module.exports = AIEngine;