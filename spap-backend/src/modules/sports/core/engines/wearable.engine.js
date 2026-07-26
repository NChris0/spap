/**
 * ============================================================
 * SPAP Wearable Engine
 * ------------------------------------------------------------
 * Generic wearable data management engine.
 *
 * Extends PipelineEngine.
 *
 * Responsibilities:
 * - Manage wearable pipelines
 * - Process device data workflows
 * - Provide sensor data layer
 *
 * Does NOT:
 * - communicate directly with devices
 * - contain device SDK logic
 * - calculate performance scores
 *
 * ============================================================
 */


const PipelineEngine = require("./pipeline.engine");

const {
    PipelineStep
} = require("../pipeline");



class WearableEngine extends PipelineEngine {


    constructor(options={}){


        super({

            name:"wearable-engine",

            version:"1.0.0",

            type:"device-data",

            ...options

        });


    }




    /**
     * Build wearable pipelines
     */
    buildPipeline(){



        /**
         * =====================================
         * Device Registration Pipeline
         * =====================================
         */

        const registrationPipeline =
            this.createPipeline({

                id:"device-registration",

                name:"Wearable Device Registration",

                type:"device"

            });





        registrationPipeline.add(

            new PipelineStep({

                name:"validate-device",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * DeviceValidationService
                     *
                     */


                    return context;

                }

            })

        );





        registrationPipeline.add(

            new PipelineStep({

                name:"link-player",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * PlayerDeviceService
                     *
                     */


                    return context;

                }

            })

        );








        /**
         * =====================================
         * Sensor Data Pipeline
         * =====================================
         */

        const sensorPipeline =
            this.createPipeline({

                id:"sensor-data",

                name:"Wearable Sensor Processing",

                type:"stream"

            });






        sensorPipeline.add(

            new PipelineStep({

                name:"validate-sensor-data",

                handler:
                async(context)=>{


                    /**
                     * Data:
                     *
                     * GPS
                     * Heart Rate
                     * Speed
                     * Distance
                     *
                     */


                    return context;

                }

            })

        );





        sensorPipeline.add(

            new PipelineStep({

                name:"normalize-sensor-data",

                handler:
                async(context)=>{


                    return context;

                }

            })

        );






        /**
         * =====================================
         * Recovery Data Pipeline
         * =====================================
         */

        const recoveryPipeline =
            this.createPipeline({

                id:"recovery-data",

                name:"Recovery Monitoring",

                type:"health"

            });






        recoveryPipeline.add(

            new PipelineStep({

                name:"process-recovery-data",

                handler:
                async(context)=>{


                    /**
                     * Future:
                     *
                     * sleep
                     * recovery
                     * HRV
                     *
                     */


                    return context;

                }

            })

        );





        return this;

    }








    /**
     * Execute wearable workflow
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

                    engine:"wearable-engine",

                    ...metadata

                }

            },

            pipelineId

        );

    }





    /**
     * Register device shortcut
     */
    async registerDevice(

        data,

        metadata={}

    ){


        return this.process(

            "device-registration",

            data,

            metadata

        );

    }





    /**
     * Process live sensor data
     */
    async processSensorData(

        data,

        metadata={}

    ){


        return this.process(

            "sensor-data",

            data,

            metadata

        );

    }





    /**
     * Process recovery data
     */
    async processRecovery(

        data,

        metadata={}

    ){


        return this.process(

            "recovery-data",

            data,

            metadata

        );

    }



}



module.exports = WearableEngine;