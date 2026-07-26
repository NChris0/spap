// =============================================
// Performance Calculator
// Calculates performance scores
// =============================================


class PerformanceCalculator {


    /**
     * Calculate overall score
     */

    calculateOverall(metrics = {}) {


        const scores = [];


        Object.values(metrics)
            .forEach(value => {


                if(typeof value === "number"){

                    scores.push(
                        this.normalize(value)
                    );

                }


            });



        if(scores.length === 0){

            return 0;

        }



        const total =
            scores.reduce(
                (sum,value)=>sum + value,
                0
            );



        return Math.round(
            total / scores.length
        );

    }



    /**
     * Normalize different metrics
     * into 0 - 100 scale
     */

    normalize(value){


        if(value < 0){

            return 0;

        }


        if(value > 100){

            return 100;

        }


        return value;

    }




    /**
     * Calculate physical score
     */

    calculatePhysical(metrics = {}){


        const physicalMetrics = [

            "distanceCovered",

            "sprintSpeed",

            "acceleration",

            "workload",

            "fitness"

        ];



        return this.calculateCategoryScore(
            metrics,
            physicalMetrics
        );

    }




    /**
     * Calculate technical score
     */

    calculateTechnical(metrics = {}){


        const technicalMetrics = [

            "passAccuracy",

            "shotsAccuracy",

            "successfulActions",

            "skills"

        ];



        return this.calculateCategoryScore(
            metrics,
            technicalMetrics
        );

    }




    /**
     * Calculate recovery score
     */

    calculateRecovery(metrics = {}){


        const recoveryMetrics = [

            "recoveryScore",

            "sleepQuality",

            "fatigueLevel"

        ];



        return this.calculateCategoryScore(
            metrics,
            recoveryMetrics
        );

    }





    /**
     * Generic category calculator
     */

    calculateCategoryScore(
        metrics,
        allowedMetrics
    ){


        const values =
            allowedMetrics
            .filter(
                key =>
                typeof metrics[key] === "number"
            )
            .map(
                key =>
                this.normalize(metrics[key])
            );



        if(values.length === 0){

            return 0;

        }



        return Math.round(

            values.reduce(
                (a,b)=>a+b,
                0
            )
            /
            values.length

        );

    }



    /**
     * Performance level
     */

    getLevel(score){


        if(score >= 90){

            return "excellent";

        }


        if(score >= 75){

            return "good";

        }


        if(score >= 50){

            return "average";

        }


        return "needs_improvement";

    }


}


module.exports = new PerformanceCalculator();