// =============================================
// Performance Model
// Stores sport performance data from all teams
// Basic -> Advanced teams supported
// =============================================


const mongoose = require("mongoose");


const performanceSchema = new mongoose.Schema(

{

    // =========================================
    // Ownership
    // =========================================


    player: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Player",

        required: true

    },


    club: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Club",

        required: true

    },


    sport: {

        type: String,

        required: true

    },



    // =========================================
    // Performance Context
    // =========================================


    type: {

        type: String,

        enum: [

            "match",

            "training",

            "fitness_test",

            "recovery",

            "assessment"

        ],

        required: true

    },


    event: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Event",

        default: null

    },



    // =========================================
    // Data Collection Method
    // Supports all club levels
    // =========================================


    collectionMethod: {

        type: String,

        enum: [

            "manual",

            "gps",

            "wearable",

            "camera",

            "sensor",

            "hybrid"

        ],

        default: "manual"

    },


    dataQuality: {

        level: {

            type: String,

            enum: [

                "basic",

                "standard",

                "advanced"

            ],

            default: "basic"

        },


        confidence: {

            type: Number,

            default: 0

        }

    },



    // =========================================
    // Performance Metrics
    // Flexible for all sports
    // =========================================


    metrics: {

        type: Map,

        of: Number,

        default: {}

    },



    // =========================================
    // External Data Sources
    // =========================================


    sources: {


        manual: {

            enabled: {

                type: Boolean,

                default: true

            }

        },



        gps: {

            enabled: {

                type: Boolean,

                default: false

            },


            distance: Number,

            speed: Number,

            acceleration: Number

        },



        wearable: {


            enabled: {

                type: Boolean,

                default: false

            },


            device: {


                brand: String,

                model: String,

                deviceId: String

            },


            heartRate: {


                average: Number,

                max: Number

            },


            calories: Number,


            recoveryScore: Number,


            sleepQuality: Number


        },



        camera: {


            enabled: {

                type: Boolean,

                default: false

            },


            videos: [

                {

                    videoId: String,

                    url: String,

                    duration: Number

                }

            ]

        },



        sensors: {


            enabled: {

                type: Boolean,

                default: false

            },


            data: {

                type: Map,

                of: Number

            }

        }


    },



    // =========================================
    // AI Analysis
    // Available for every club
    // =========================================


    aiAnalysis: {


        enabled: {

            type: Boolean,

            default: true

        },


        model: {

            type: String,

            default: "spap-performance-ai"

        },


        confidence: {

            type: Number,

            default: 0

        },


        insights: [

            String

        ],


        recommendations: [

            String

        ],


        riskAlerts: [

            String

        ]

    },



    // =========================================
    // Video AI Results
    // Only filled when camera exists
    // =========================================


    videoAnalysis: {


        detectedActions: [

            {

                action: String,

                count: Number,

                confidence: Number

            }

        ],


        playerTracking: [

            {

                position: String,

                distance: Number,

                confidence: Number

            }

        ]

    },



    // =========================================
    // Final Performance Result
    // Generated by Engine
    // =========================================


    analysis: {


    score: {

        type: Number,

        default: 0

    },


    level: {

        type: String,

        default: "unknown"

    },


    category: {

        type: String,

        default: "unknown"

    },


    breakdown: {


        physical: {

            type: Number,

            default: 0

        },


        technical: {

            type: Number,

            default: 0

        },


        recovery: {

            type: Number,

            default: 0

        }


    },


    insights: [

        String

    ]

},



    // =========================================
    // Audit
    // =========================================


    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },


    recordedAt: {

        type: Date,

        default: Date.now

    }


},


{

    timestamps: true

}

);



// =========================================
// Indexes
// =========================================


performanceSchema.index({

    player: 1,

    createdAt: -1

});


performanceSchema.index({

    club: 1,

    createdAt: -1

});


performanceSchema.index({

    sport: 1

});



module.exports = mongoose.model(

    "Performance",

    performanceSchema

);