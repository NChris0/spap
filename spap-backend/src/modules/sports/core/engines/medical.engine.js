/**
 * ============================================================
 * SPAP Medical Engine
 * ------------------------------------------------------------
 * Generic sports medical workflow engine.
 *
 * Extends PipelineEngine.
 *
 * Responsibilities:
 * - Manage medical workflows
 * - Process medical pipelines
 * - Connect medical services
 *
 * Does NOT:
 * - diagnose players
 * - replace medical professionals
 * - store database records
 *
 * ============================================================
 */


const PipelineEngine = require("./pipeline.engine");

const {
    PipelineStep
} = require("../pipeline");



class MedicalEngine extends PipelineEngine {


    constructor(options={}){


        super({

            name:"medical-engine",

            version:"1.0.0",

            type:"medical",

            ...options

        });


    }




    /**
     * Build medical pipelines
     */
    buildPipeline(){



        /**
         * =====================================
         * Injury Tracking Pipeline
         * =====================================
         */

        const injuryPipeline =
            this.createPipeline({

                id:"injury-tracking",

                name:"Injury Tracking Pipeline",

                type:"medical"

            });





        injuryPipeline.add(

            new PipelineStep({

                name:"validate-injury-data",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * InjuryValidationService
                     *
                     */


                    return context;

                }

            })

        );





        injuryPipeline.add(

            new PipelineStep({

                name:"process-injury",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * InjuryManagementService
                     *
                     */


                    return context;

                }

            })

        );





        /**
         * =====================================
         * Recovery Monitoring Pipeline
         * =====================================
         */

        const recoveryPipeline =
            this.createPipeline({

                id:"recovery-monitoring",

                name:"Recovery Monitoring Pipeline",

                type:"medical"

            });





        recoveryPipeline.add(

            new PipelineStep({

                name:"collect-recovery-data",

                handler:
                async(context)=>{


                    /**
                     * Data:
                     *
                     * wearable
                     * medical check
                     * player feedback
                     *
                     */


                    return context;

                }

            })

        );






        recoveryPipeline.add(

            new PipelineStep({

                name:"evaluate-recovery",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * RecoveryService
                     *
                     */


                    return context;

                }

            })

        );






        /**
         * =====================================
         * Medical Assessment Pipeline
         * =====================================
         */

        const assessmentPipeline =
            this.createPipeline({

                id:"medical-assessment",

                name:"Medical Assessment Pipeline",

                type:"assessment"

            });





        assessmentPipeline.add(

            new PipelineStep({

                name:"process-assessment",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * MedicalAssessmentService
                     *
                     */


                    return context;

                }

            })

        );





        return this;

    }







    /**
     * Execute medical workflow
     */
    async process(

        pipelineId,

        data,

        metadata={}

    ){


        return this.execute(

            {

                data,

                metadata:{

                    engine:"medical-engine",

                    ...metadata

                }

            },

            pipelineId

        );

    }







    /**
     * Injury shortcut
     */
    async trackInjury(

        data,

        metadata={}

    ){


        return this.process(

            "injury-tracking",

            data,

            metadata

        );

    }







    /**
     * Recovery shortcut
     */
    async monitorRecovery(

        data,

        metadata={}

    ){


        return this.process(

            "recovery-monitoring",

            data,

            metadata

        );

    }







    /**
     * Assessment shortcut
     */
    async assess(

        data,

        metadata={}

    ){


        return this.process(

            "medical-assessment",

            data,

            metadata

        );

    }



}



module.exports = MedicalEngine;