/**
 * ============================================================
 * SPAP Pipeline Context
 * ------------------------------------------------------------
 * Shared runtime context for all pipeline steps and engines.
 *
 * Responsible for:
 * - Pipeline data
 * - Runtime state
 * - Services
 * - Execution flags
 * - Nested data access
 *
 * Business logic DOES NOT belong here.
 * ============================================================
 */

class PipelineContext {

  constructor(initialData = {}) {

    this.data = {
      ...initialData,
    };


    /**
     * Pipeline execution runtime
     */
    this.runtime = {

      status: "pending",

      currentStep: null,

      startedAt: null,

      completedAt: null,

      duration: null,

      steps: {},

      errors: [],

      metrics: {},
    };


    /**
     * Shared services
     */
    this.services = {};


    /**
     * Pipeline control flags
     */
    this.flags = {

      stopped: false,

      cancelled: false,

      frozen: false,
    };
  }


  /**
   * Resolve nested path
   */
  static resolvePath(path) {

    if (!path || typeof path !== "string") {

      throw new Error(
        "PipelineContext path must be a non-empty string."
      );
    }

    return path.split(".");
  }



  /**
   * Set value
   */
  set(path, value) {

    const keys = PipelineContext.resolvePath(path);

    let current = this.data;


    while(keys.length > 1){

      const key = keys.shift();


      if(
        !current[key] ||
        typeof current[key] !== "object"
      ){

        current[key] = {};
      }


      current = current[key];
    }


    current[keys[0]] = value;


    return this;
  }




  /**
   * Set multiple values
   */
  setMany(object = {}){

    for(const [key,value] of Object.entries(object)){

      this.set(key,value);

    }


    return this;
  }




  /**
   * Get value
   */
  get(path, defaultValue = null){

    const keys = PipelineContext.resolvePath(path);

    let current = this.data;


    for(const key of keys){

      if(
        current == null ||
        !Object.prototype.hasOwnProperty.call(current,key)
      ){

        return defaultValue;
      }


      current=current[key];
    }


    return current;
  }




  /**
   * Check exists
   */
  has(path){

    return this.get(path,undefined)!==undefined;

  }




  /**
   * Remove value
   */
  remove(path){

    const keys = PipelineContext.resolvePath(path);

    let current=this.data;


    while(keys.length>1){

      const key=keys.shift();


      if(!current[key]){

        return this;
      }


      current=current[key];
    }


    delete current[keys[0]];


    return this;
  }




  /**
   * Push array value
   */
  push(path,value){

    let array=this.get(path,[]);


    if(!Array.isArray(array)){

      array=[];
    }


    array.push(value);


    this.set(path,array);


    return this;
  }




  /**
   * Increment number
   */
  increment(path,amount=1){

    const current=this.get(path,0);


    this.set(
      path,
      current + amount
    );


    return this;
  }




  /**
   * Append string
   */
  append(path,text){

    const current=this.get(path,"");


    this.set(
      path,
      current + text
    );


    return this;
  }




  /**
   * Merge object
   */
  merge(object={}){

    const mergeRecursive=(target,source)=>{

      for(const key of Object.keys(source)){

        if(
          source[key] &&
          typeof source[key]==="object" &&
          !Array.isArray(source[key])
        ){

          if(!target[key]){

            target[key]={};
          }


          mergeRecursive(
            target[key],
            source[key]
          );

        }else{

          target[key]=source[key];
        }
      }


      return target;
    };


    mergeRecursive(this.data,object);


    return this;
  }





  /**
   * Namespace helper
   */
  namespace(prefix){

    return {

      set:(key,value)=>
        this.set(
          `${prefix}.${key}`,
          value
        ),


      get:(key,defaultValue=null)=>
        this.get(
          `${prefix}.${key}`,
          defaultValue
        ),


      has:(key)=>
        this.has(
          `${prefix}.${key}`
        ),

    };
  }





  /**
   * Register service
   */
  registerService(name,service){

    this.services[name]=service;

    return this;
  }





  /**
   * Get service
   */
  getService(name){

    return this.services[name];

  }





  /**
   * Runtime start
   */
  start(){

    this.runtime.status="running";

    this.runtime.startedAt=Date.now();

    return this;
  }





  /**
   * Runtime complete
   */
  complete(){

    this.runtime.status="completed";

    this.runtime.completedAt=Date.now();


    if(this.runtime.startedAt){

      this.runtime.duration =
        this.runtime.completedAt -
        this.runtime.startedAt;
    }


    return this;
  }





  /**
   * Runtime failure
   */
  fail(error){

    this.runtime.status="failed";


    this.runtime.errors.push({

      message:error.message,

      time:Date.now(),

    });


    return this;
  }





  /**
   * Stop pipeline
   */
  stop(){

    this.flags.stopped=true;

    return this;
  }




  /**
   * Cancel pipeline
   */
  cancel(){

    this.flags.cancelled=true;

    return this;
  }




  /**
   * Freeze context
   */
  freeze(){

    this.flags.frozen=true;

    Object.freeze(this.data);

    return this;
  }





  /**
   * Clone context
   */
  clone(){

    const cloned =
      new PipelineContext(
        JSON.parse(
          JSON.stringify(this.data)
        )
      );


    cloned.runtime =
      JSON.parse(
        JSON.stringify(this.runtime)
      );


    return cloned;
  }





  /**
   * Clear data
   */
  clear(){

    this.data={};


    return this;
  }




  /**
   * Convert object
   */
  toObject(){

    return {

      data:this.data,

      runtime:this.runtime,

      flags:this.flags,

    };
  }




  toJSON(){

    return this.toObject();

  }





  keys(){

    return Object.keys(this.data);

  }



  values(){

    return Object.values(this.data);

  }



  entries(){

    return Object.entries(this.data);

  }



  isEmpty(){

    return this.keys().length===0;

  }

}



module.exports = PipelineContext;