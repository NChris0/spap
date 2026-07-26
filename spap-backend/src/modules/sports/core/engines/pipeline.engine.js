/**
 * ============================================================
 * SPAP Pipeline Engine
 * ------------------------------------------------------------
 * Base class for all pipeline-based engines.
 *
 * Responsibilities:
 * - Manage pipelines
 * - Register steps
 * - Execute pipelines
 * - Manage lifecycle
 * - Provide shared execution layer
 *
 * Business logic belongs to child engines.
 * ============================================================
 */


const BaseEngine = require("./base.engine");

const {
  Pipeline,
  PipelineStep,
  PipelineContext,
} = require("../pipeline");


class PipelineEngine extends BaseEngine {


  constructor({

    name,

    version = "1.0.0",

    type = "pipeline",

  }) {


    super(name);



    this.name = name;

    this.version = version;

    this.type = type;



    /**
     * Multiple pipelines support
     */

    this.pipelines = new Map();



    /**
     * Default pipeline
     */

    this.defaultPipeline = null;



    /**
     * Build status
     */

    this.pipelineBuilt = false;


    /**
     * Engine status
     */

    this.status = "created";

  }




  /**
   * ==========================================================
   * Create pipeline
   * ==========================================================
   */

  createPipeline({

    id,

    name,

    version = "1.0.0",

    type = "general",

  }){


    const pipeline =
      new Pipeline({

        engine:this,

        id,

        name,

        version,

        type,

      });



    this.pipelines.set(
      pipeline.id,
      pipeline
    );



    if(!this.defaultPipeline){

      this.defaultPipeline = pipeline;

    }



    return pipeline;

  }





  /**
   * ==========================================================
   * Get pipeline
   * ==========================================================
   */

  getPipeline(id = null){


    if(id){

      return this.pipelines.get(id);

    }


    return this.defaultPipeline;

  }





  /**
   * ==========================================================
   * Remove pipeline
   * ==========================================================
   */

  removePipeline(id){


    this.pipelines.delete(id);


    if(
      this.defaultPipeline &&
      this.defaultPipeline.id === id
    ){

      this.defaultPipeline = null;

    }


    return this;

  }





  /**
   * ==========================================================
   * Build default pipeline
   * Child engines override this.
   *
   * Example:
   *
   * this.step(
   *   "normalize",
   *   this.normalize
   * )
   *
   * ==========================================================
   */

  buildPipeline(){


    return this.defaultPipeline;

  }





  /**
   * ==========================================================
   * Initialize pipeline once
   * ==========================================================
   */

  initialize(){


    if(this.pipelineBuilt){

      return this;

    }



    this.buildPipeline();



    this.pipelineBuilt = true;



    return this;

  }





  /**
   * ==========================================================
   * Register pipeline step
   *
   * Used by child engines.
   * ==========================================================
   */

  step(

    name,

    handler,

    options = {}

  ){


    if(!this.defaultPipeline){


      this.createPipeline({

        id:`${this.name}-default`,

        name:`${this.name}-default`,

        type:this.type,

      });


    }




    this.defaultPipeline.add(

      new PipelineStep({

        name,

        handler,

        ...options,

      })

    );



    return this;

  }





  /**
   * ==========================================================
   * Execute pipeline
   * ==========================================================
   */

  async execute(

    context = {},

    pipelineId = null

  ){



    this.initialize();



    const pipeline =
      this.getPipeline(
        pipelineId
      );



    if(!pipeline){


      throw new Error(
        "Pipeline not found."
      );

    }




    const pipelineContext =
      context instanceof PipelineContext

        ? context

        : new PipelineContext(
            context
          );




    this.status="running";



    this.emit(
      "engine:pipeline:started",
      {

        engine:this.name,

        pipeline:pipeline.name,

      }
    );



    try{


      await pipeline.execute(
        pipelineContext
      );



      this.status="completed";



      this.emit(
        "engine:pipeline:completed",
        {

          engine:this.name,

          pipeline:pipeline.name,

        }
      );



      return pipelineContext.toObject();



    }catch(error){



      this.status="failed";



      this.emit(
        "engine:pipeline:failed",
        {

          engine:this.name,

          pipeline:pipeline.name,

          error:error.message,

        }
      );



      throw error;

    }

  }





  /**
   * ==========================================================
   * Get all pipelines
   * ==========================================================
   */

  getPipelines(){


    return [
      ...this.pipelines.values()
    ];

  }





  /**
   * ==========================================================
   * Get registered steps
   * ==========================================================
   */

  getSteps(
    pipelineId=null
  ){


    const pipeline =
      this.getPipeline(
        pipelineId
      );


    if(!pipeline){

      return [];

    }


    return pipeline.getSteps();

  }





  /**
   * ==========================================================
   * Clear pipelines
   * ==========================================================
   */

  clearPipelines(){


    this.pipelines.clear();


    this.defaultPipeline=null;


    this.pipelineBuilt=false;



    return this;

  }





  /**
   * ==========================================================
   * Engine information
   * ==========================================================
   */

  toJSON(){


    return {

      name:this.name,

      version:this.version,

      type:this.type,

      status:this.status,


      pipelines:
        this.getPipelines()
          .map(
            pipeline=>pipeline.toJSON()
          ),

    };

  }

}


module.exports = PipelineEngine;