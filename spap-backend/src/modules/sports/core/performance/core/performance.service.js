// =============================================
// Performance Service
// Handles performance operations
// =============================================


const Performance = require("../models/performance.model");
const performanceEngine = require("./performance.engine");


class PerformanceService {


    /**
     * Create performance record
     */
    async createPerformance(data){

       const analysis =
    performanceEngine.analyze({

        sport:data.sport,

        player:data.player,

        metrics:data.metrics,

        aiAnalysis:data.aiAnalysis,

        videoAnalysis:data.videoAnalysis

    });


        const performance =
            await Performance.create({
                ...data,
                analysis
            });


        return performance;
    }



    /**
     * Analyze performance without saving
     */
    analyzePerformance(metrics){

        return performanceEngine.analyze({
            metrics
        });

    }



    /**
     * Get player performances
     */
    async getPlayerPerformance(playerId){

        return Performance.find({
            player: playerId
        })
        .sort({
            createdAt:-1
        });

    }



    /**
     * Get team performances
     */
    async getTeamPerformance(clubId){

        return Performance.find({
            club: clubId
        })
        .sort({
            createdAt:-1
        });

    }



    /**
     * Get one performance
     */
    async getPerformanceById(id){

        return Performance.findById(id);

    }



    /**
     * Generate performance summary
     */
    async getSummary(playerId){

        const records =
            await this.getPlayerPerformance(playerId);


        if(!records.length){

            return {
                totalRecords:0,
                averageScore:0
            };

        }


        const scores =
            records.map(
                item => item.analysis.score
            );


        const average =
            scores.reduce(
                (a,b)=>a+b,
                0
            ) / scores.length;



        return {

            totalRecords: records.length,

            averageScore:
                Math.round(average)

        };

    }

}


module.exports = new PerformanceService();