/**
 * ============================================================
 * SPAP Pipeline
 * ------------------------------------------------------------
 * Enterprise pipeline orchestrator.
 *
 * Responsible for:
 * - Managing pipeline steps
 * - Validating dependencies
 * - Executing steps
 * - Tracking runtime state
 * - Handling lifecycle events
 *
 * Business logic belongs to PipelineStep handlers.
 * Runtime state belongs to PipelineContext.
 * ============================================================
 */

const PipelineStep = require("./pipeline.step");
const PipelineContext = require("./pipeline.context");


class Pipeline {


  constructor({

    engine,

    id,

    name,

    version = "1.0.0",

    type = "general",

  }) {


    if(!engine){

      throw new Error(
        "Pipeline requires an engine."
      );

    }


    if(!name){

      throw new Error(
        "Pipeline requires a name."
      );

    }



    this.engine = engine;


    this.id = id || name;

    this.name = name;

    this.version = version;

    this.type = type;



    this.steps = [];



    this.status = "created";

  }




  /**
   * ------------------------------------------------------------
   * Add step
   * ------------------------------------------------------------
   */

  add(step){


    if(!(step instanceof PipelineStep)){

      throw new Error(
        "Pipeline only accepts PipelineStep instances."
      );

    }


    this.steps.push(step);


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Remove step
   * ------------------------------------------------------------
   */

  remove(name){


    this.steps =
      this.steps.filter(
        step => step.name !== name
      );


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Clear pipeline
   * ------------------------------------------------------------
   */

  clear(){


    this.steps = [];


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Get steps safely
   * ------------------------------------------------------------
   */

  getSteps(){


    return [
      ...this.steps
    ];

  }





  /**
   * ------------------------------------------------------------
   * Sort steps by priority
   * ------------------------------------------------------------
   */

  sortSteps(){


    this.steps.sort(
      (a,b)=>
        a.priority - b.priority
    );


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Validate dependencies
   * ------------------------------------------------------------
   */

  validateDependencies(){


    const names =
      this.steps.map(
        step=>step.name
      );



    for(const step of this.steps){


      for(const dependency of step.dependsOn){


        if(!names.includes(dependency)){


          throw new Error(
            `Pipeline step "${step.name}" requires missing dependency "${dependency}".`
          );

        }

      }

    }


    return true;

  }





  /**
   * ------------------------------------------------------------
   * Execute pipeline
   * ------------------------------------------------------------
   */

  async execute(context = new PipelineContext()){


    if(!(context instanceof PipelineContext)){


      context =
        new PipelineContext(context);

    }



    this.sortSteps();


    this.validateDependencies();



    this.status="running";



    context.start();



    this.engine.emit(
      "pipeline:started",
      {
        pipeline:this.name,
        version:this.version,
      }
    );




    try{


      for(const step of this.steps){



        /**
         * Check pipeline stop
         */

        if(
          context.flags.stopped ||
          context.flags.cancelled
        ){

          this.status =
            context.flags.cancelled
              ? "cancelled"
              : "stopped";


          break;

        }




        /**
         * Runtime step tracking
         */

        context.set(
          `runtime.steps.${step.name}`,
          {

            status:"running",

            startedAt:Date.now(),

          }
        );




        try{


          context.set(
            "runtime.currentStep",
            step.name
          );



          const result =
            await step.execute(
              this.engine,
              context
            );



          context =
            result instanceof PipelineContext
              ? result
              : context;




          context.set(
            `runtime.steps.${step.name}`,
            {

              status:"completed",

              completedAt:Date.now(),

            }
          );



        }catch(error){



          context.set(
            `runtime.steps.${step.name}`,
            {

              status:"failed",

              error:error.message,

              failedAt:Date.now(),

            }
          );



          if(step.required){

            throw error;

          }

        }

      }





      this.status="completed";


      context.complete();



      this.engine.emit(
        "pipeline:completed",
        {
          pipeline:this.name,
        }
      );



      return context;



    }catch(error){



      this.status="failed";


      context.fail(error);



      this.engine.emit(
        "pipeline:failed",
        {
          pipeline:this.name,
          error:error.message,
        }
      );



      throw error;

    }

  }





  /**
   * ------------------------------------------------------------
   * Stop pipeline
   * ------------------------------------------------------------
   */

  stop(context){


    context.stop();


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Cancel pipeline
   * ------------------------------------------------------------
   */

  cancel(context){


    context.cancel();


    return this;

  }





  /**
   * ------------------------------------------------------------
   * Pipeline information
   * ------------------------------------------------------------
   */

  toJSON(){


    return {

      id:this.id,

      name:this.name,

      version:this.version,

      type:this.type,

      status:this.status,

      steps:this.steps.map(
        step=>step.toJSON()
      ),

    };

  }


}


module.exports = Pipeline;