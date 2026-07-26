// =============================================
// Performance Engine
// Coordinates performance analysis
// =============================================


const performanceCalculator =
    require("../helpers/performance.calculator");



class PerformanceEngine {


    analyze(data = {}) {


        const {

            sport = null,

            player = null,

            metrics = {},

            aiAnalysis = null,

            videoAnalysis = null

        } = data;




        const physicalScore =
            performanceCalculator.calculatePhysical(
                metrics
            );



        const technicalScore =
            performanceCalculator.calculateTechnical(
                metrics
            );



        const recoveryScore =
            performanceCalculator.calculateRecovery(
                metrics
            );




        const overallScore =
            performanceCalculator.calculateOverall({

                physicalScore,

                technicalScore,

                recoveryScore

            });





        return {


            sport,


            player,


            score: overallScore,


            level:
                performanceCalculator.getLevel(
                    overallScore
                ),



            breakdown:{


                physical:
                    physicalScore,


                technical:
                    technicalScore,


                recovery:
                    recoveryScore


            },



            insights:
                this.generateInsights({

                    metrics,

                    aiAnalysis,

                    videoAnalysis

                })

        };

    }






    generateInsights(data = {}){


        const insights = [];



        const {

            metrics = {},

            aiAnalysis,

            videoAnalysis

        } = data;




        if(metrics.distanceCovered){

            insights.push(
                "Physical workload analyzed"
            );

        }



        if(metrics.passAccuracy){

            insights.push(
                "Technical performance analyzed"
            );

        }



        if(aiAnalysis?.insights){

            insights.push(
                ...aiAnalysis.insights
            );

        }



        if(videoAnalysis?.detectedActions){

            insights.push(
                "Video analysis data included"
            );

        }



        if(insights.length === 0){

            insights.push(
                "More performance data required"
            );

        }



        return insights;

    }


}



module.exports = new PerformanceEngine();