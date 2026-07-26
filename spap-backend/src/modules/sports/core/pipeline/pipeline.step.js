/**
 * ============================================================
 * SPAP Pipeline Step
 * ------------------------------------------------------------
 * Enterprise immutable definition of a pipeline step.
 *
 * Contains:
 * - Step identity
 * - Execution configuration
 * - Dependencies
 * - Security requirements
 * - Cache strategy
 *
 * Runtime state belongs to PipelineContext.
 * ============================================================
 */

class PipelineStep {

  constructor({

    // Identity
    id,
    name,
    version = "1.0.0",
    type = "general",

    // Execution
    handler,

    enabled = true,
    required = true,

    retry = 0,
    retryDelay = 0,

    timeout = null,

    executionMode = "sync",

    priority = 0,

    // Dependencies
    requires = [],
    produces = [],
    dependsOn = [],

    // Optimization
    cache = {
      enabled: false,
      ttl: 0,
    },


    // Security
    permissions = [],


    // Control
    condition = null,
    onSkip = null,

    stopPipeline = false,


    // Monitoring
    tags = [],
    logLevel = "info",


    metadata = {},

  }) {


    /**
     * Validation
     */

    if(!name || typeof name !== "string"){

      throw new Error(
        "PipelineStep requires a valid name."
      );

    }


    if(typeof handler !== "function"){

      throw new Error(
        `PipelineStep "${name}" requires a valid handler.`
      );

    }


    if(condition && typeof condition !== "function"){

      throw new Error(
        `PipelineStep "${name}" condition must be a function.`
      );

    }


    if(onSkip && typeof onSkip !== "function"){

      throw new Error(
        `PipelineStep "${name}" onSkip must be a function.`
      );

    }


    if(!Number.isInteger(retry) || retry < 0){

      throw new Error(
        `PipelineStep "${name}" retry must be >= 0`
      );

    }


    if(!Number.isInteger(priority)){

      throw new Error(
        `PipelineStep "${name}" priority must be integer`
      );

    }


    if(
      timeout !== null &&
      (!Number.isInteger(timeout) || timeout <=0)
    ){

      throw new Error(
        `PipelineStep "${name}" timeout invalid`
      );

    }


    const allowedModes = [
      "sync",
      "async",
      "background"
    ];


    if(!allowedModes.includes(executionMode)){

      throw new Error(
        `PipelineStep "${name}" invalid execution mode`
      );

    }



    /**
     * Immutable definition
     */


    this.id = id || name;

    this.name = name;

    this.version = version;

    this.type = type;



    this.handler = handler;



    this.enabled = enabled;

    this.required = required;



    this.retry = retry;

    this.retryDelay = retryDelay;

    this.timeout = timeout;



    this.executionMode = executionMode;



    this.priority = priority;



    /**
     * Dependency graph
     */

    this.requires = Object.freeze([
      ...requires
    ]);


    this.produces = Object.freeze([
      ...produces
    ]);


    this.dependsOn = Object.freeze([
      ...dependsOn
    ]);



    /**
     * Cache strategy
     */

    this.cache = Object.freeze({

      enabled: cache.enabled || false,

      ttl: cache.ttl || 0,

    });



    /**
     * Security
     */

    this.permissions = Object.freeze([
      ...permissions
    ]);



    /**
     * Control
     */

    this.condition = condition;


    this.onSkip = onSkip;


    this.stopPipeline = stopPipeline;



    /**
     * Monitoring
     */

    this.tags = Object.freeze([
      ...tags
    ]);


    this.logLevel = logLevel;



    this.metadata = Object.freeze({

      ...metadata

    });



    /**
     * Freeze definition
     */

    Object.freeze(this);

  }




  /**
   * ==========================================================
   * Check execution condition
   * ==========================================================
   */

  async shouldExecute(context){

    if(!this.enabled){

      return false;

    }


    if(!this.condition){

      return true;

    }


    return await this.condition(context);

  }




  /**
   * ==========================================================
   * Execute step
   * ==========================================================
   */

  async execute(engine, context){


    const allowed =
      await this.shouldExecute(context);



    if(!allowed){


      engine.emit(
        "pipeline:step:skipped",
        {
          engine:engine.name,
          step:this.name
        }
      );


      if(this.onSkip){

        await this.onSkip(context);

      }


      return context;

    }



    let attempts = 0;



    while(attempts <= this.retry){


      try{


        engine.emit(
          "pipeline:step:started",
          {
            engine:engine.name,
            step:this.name,
            attempt:attempts + 1
          }
        );



        const result =
          await this.runHandler(
            engine,
            context
          );



        engine.emit(
          "pipeline:step:completed",
          {
            engine:engine.name,
            step:this.name
          }
        );



        return result ?? context;



      }catch(error){


        attempts++;



        if(attempts <= this.retry){


          engine.emit(
            "pipeline:step:retried",
            {
              engine:engine.name,
              step:this.name,
              attempt:attempts
            }
          );



          if(this.retryDelay){

            await this.delay(
              this.retryDelay
            );

          }


          continue;

        }




        engine.emit(
          "pipeline:step:failed",
          {
            engine:engine.name,
            step:this.name,
            error:error.message
          }
        );



        if(this.required){

          throw error;

        }



        return context;

      }

    }



    return context;

  }




  /**
   * ==========================================================
   * Handler execution with timeout
   * ==========================================================
   */

  async runHandler(engine,context){


    if(!this.timeout){

      return await this.handler.call(
        engine,
        context
      );

    }



    const controller =
      new AbortController();



    context.set(
      "runtime.abortController",
      controller
    );



    return Promise.race([


      this.handler.call(
        engine,
        context,
        controller.signal
      ),



      new Promise(
        (_,reject)=>{


          setTimeout(()=>{


            controller.abort();



            engine.emit(
              "pipeline:step:timeout",
              {
                engine:engine.name,
                step:this.name,
                timeout:this.timeout
              }
            );



            reject(
              new Error(
                `Pipeline step "${this.name}" timeout`
              )
            );


          },this.timeout);



        }
      )


    ]);

  }




  /**
   * Delay retry
   */

  delay(ms){

    return new Promise(
      resolve=>setTimeout(resolve,ms)
    );

  }




  /**
   * Serialize
   */

  toJSON(){

    return {

      id:this.id,

      name:this.name,

      version:this.version,

      type:this.type,

      enabled:this.enabled,

      required:this.required,

      retry:this.retry,

      timeout:this.timeout,

      executionMode:this.executionMode,

      priority:this.priority,

      requires:this.requires,

      produces:this.produces,

      dependsOn:this.dependsOn,

      cache:this.cache,

      permissions:this.permissions,

      tags:this.tags,

      logLevel:this.logLevel,

      metadata:this.metadata,

    };

  }

}


module.exports = PipelineStep;