

ayantDroitValueChange(distributionKey, quality, annualIncome, sex, annualSMIG, sharingRate, age, totalAscendant, totalMinorDescendant, totalMinorConcubin, totalMajorDescendant, totalMajorConcubin, totalCollateral, totalConjoint, totalOrphelinDouble)
{
    let qualityValue = "";
    let pensionFrancValue = [];
    let cléDePartage = []
    let capitalize = 0
    let rentValue = 0
    let pensionFranc = 0
    let economicDamage = 0
    let moralDamage = 0
    let compensationDue = 0
    let share = 0
    let fille21 = [
        {
            age: 0,
            franc: 11.022,
        },
        {
            age: 1,
            franc: 10.959,
        },
        {
            age: 2,
            franc: 10.696,
        },
        {
            age: 3,
            franc: 10.401,
        },
        {
            age: 4,
            franc: 10.084,
        },
        {
            age: 5,
            franc: 9.745,
        },
        {
            age: 6,
            franc: 9.383,
        },
        {
            age: 7,
            franc: 8.996,
        },
        {
            age: 8,
            franc: 8.584,
        },
        {
            age: 9,
            franc: 8.144,
        },
        {
            age: 10,
            franc: 7.676,
        },
        {
            age: 11,
            franc: 7.177,
        },
        {
            age: 12,
            franc: 6.645,
        },
        {
            age: 13,
            franc: 6.079,
        },
        {
            age: 14,
            franc: 5.476,
        },
        {
            age: 15,
            franc: 4.834,
        },
        {
            age: 16,
            franc: 4.15,
        },
        {
            age: 17,
            franc: 3.421,
        },
        {
            age: 18,
            franc: 2.646,
        },
        {
            age: 19,
            franc: 1.819,
        },
        {
            age: 20,
            franc: 0.938,
        },
        {
            age: 21,
            franc: 0,
        },
    ];
    let fille25 = [
        {
            age: 0,
            franc: 11.908,
        },
        {
            age: 1,
            franc: 11.92,
        },
        {
            age: 2,
            franc: 11.721,
        },
        {
            age: 3,
            franc: 11.495,
        },
        {
            age: 4,
            franc: 11.249,
        },
        {
            age: 5,
            franc: 10.986,
        },
        {
            age: 6,
            franc: 10.705,
        },
        {
            age: 7,
            franc: 10.405,
        },
        {
            age: 8,
            franc: 10.085,
        },
        {
            age: 9,
            franc: 9.743,
        },
        {
            age: 10,
            franc: 9.379,
        },
        {
            age: 11,
            franc: 8.991,
        },
        {
            age: 12,
            franc: 8.578,
        },
        {
            age: 13,
            franc: 8.138,
        },
        {
            age: 14,
            franc: 7.67,
        },
        {
            age: 15,
            franc: 7.171,
        },
        {
            age: 16,
            franc: 6.64,
        },
        {
            age: 17,
            franc: 6.074,
        },
        {
            age: 18,
            franc: 5.472,
        },
        {
            age: 19,
            franc: 4.831,
        },
        {
            age: 20,
            franc: 4.148,
        },
        {
            age: 21,
            franc: 3.42,
        },
        {
            age: 22,
            franc: 2.645,
        },
        {
            age: 23,
            franc: 1.819,
        },
        {
            age: 24,
            franc: 0.938,
        },
        {
            age: 25,
            franc: 0,
        },
    ];
    let man21 = [
        {
            age: 0,
            franc: 10.941,
        },
        {
            age: 1,
            franc: 10.942,
        },
        {
            age: 2,
            franc: 10.68,
        },
        {
            age: 3,
            franc: 10.387,
        },
        {
            age: 4,
            franc: 10.071,
        },
        {
            age: 5,
            franc: 9.732,
        },
        {
            age: 6,
            franc: 9.37,
        },
        {
            age: 7,
            franc: 8.984,
        },
        {
            age: 8,
            franc: 8.573,
        },
        {
            age: 9,
            franc: 8.134,
        },
        {
            age: 10,
            franc: 7.666,
        },
        {
            age: 11,
            franc: 7.167,
        },
        {
            age: 12,
            franc: 6.636,
        },
        {
            age: 13,
            franc: 6.07,
        },
        {
            age: 14,
            franc: 5.468,
        },
        {
            age: 15,
            franc: 4.826,
        },
        {
            age: 16,
            franc: 4.143,
        },
        {
            age: 17,
            franc: 3.416,
        },
        {
            age: 18,
            franc: 2.642,
        },
        {
            age: 19,
            franc: 1.817,
        },
        {
            age: 20,
            franc: 0.938,
        },
        {
            age: 21,
            franc: 0,
        },
    ];
    let man25 = [
        {
            age: 0,
            franc: 11.815,
        },
        {
            age: 1,
            franc: 11.896,
        },
        {
            age: 2,
            franc: 11.698,
        },
        {
            age: 3,
            franc: 11.473,
        },
        {
            age: 4,
            franc: 11.228,
        },
        {
            age: 5,
            franc: 10.965,
        },
        {
            age: 6,
            franc: 10.684,
        },
        {
            age: 7,
            franc: 10.384,
        },
        {
            age: 8,
            franc: 10.064,
        },
        {
            age: 9,
            franc: 9.723,
        },
        {
            age: 10,
            franc: 9.359,
        },
        {
            age: 11,
            franc: 8.971,
        },
        {
            age: 12,
            franc: 8.558,
        },
        {
            age: 13,
            franc: 8.118,
        },
        {
            age: 14,
            franc: 7.65,
        },
        {
            age: 15,
            franc: 7.151,
        },
        {
            age: 16,
            franc: 6.621,
        },
        {
            age: 17,
            franc: 6.057,
        },
        {
            age: 18,
            franc: 5.457,
        },
        {
            age: 19,
            franc: 4.819,
        },
        {
            age: 20,
            franc: 4.139,
        },
        {
            age: 21,
            franc: 3.414,
        },
        {
            age: 22,
            franc: 2.641,
        },
        {
            age: 23,
            franc: 1.816,
        },
        {
            age: 24,
            franc: 0.938,
        },
        {
            age: 25,
            franc: 0,
        },
    ];
    let mere60 = [
        {
            age: 0,
            franc: 14.606,
        },
        {
            age: 1,
            franc: 14.848,
        },
        {
            age: 2,
            franc: 14.845,
        },
        {
            age: 3,
            franc: 14.825,
        },
        {
            age: 4,
            franc: 14.798,
        },
        {
            age: 5,
            franc: 14.768,
        },
        {
            age: 6,
            franc: 14.734,
        },
        {
            age: 7,
            franc: 14.697,
        },
        {
            age: 8,
            franc: 14.658,
        },
        {
            age: 9,
            franc: 14.615,
        },
        {
            age: 10,
            franc: 14.569,
        },
        {
            age: 11,
            franc: 14.519,
        },
        {
            age: 12,
            franc: 14.467,
        },
        {
            age: 13,
            franc: 14.411,
        },
        {
            age: 14,
            franc: 14.352,
        },
        {
            age: 15,
            franc: 14.29,
        },
        {
            age: 16,
            franc: 14.224,
        },
        {
            age: 17,
            franc: 14.155,
        },
        {
            age: 18,
            franc: 14.083,
        },
        {
            age: 19,
            franc: 14.006,
        },
        {
            age: 20,
            franc: 13.925,
        },
        {
            age: 21,
            franc: 13.84,
        },
        {
            age: 22,
            franc: 13.749,
        },
        {
            age: 23,
            franc: 13.652,
        },
        {
            age: 24,
            franc: 13.55,
        },
        {
            age: 25,
            franc: 13.441,
        },
        {
            age: 26,
            franc: 13.326,
        },
        {
            age: 27,
            franc: 13.204,
        },
        {
            age: 28,
            franc: 13.074,
        },
        {
            age: 29,
            franc: 12.937,
        },
        {
            age: 30,
            franc: 12.791,
        },
        {
            age: 31,
            franc: 12.037,
        },
        {
            age: 32,
            franc: 12.473,
        },
        {
            age: 33,
            franc: 12.299,
        },
        {
            age: 34,
            franc: 12.113,
        },
        {
            age: 35,
            franc: 11.917,
        },
        {
            age: 36,
            franc: 11.709,
        },
        {
            age: 37,
            franc: 11.487,
        },
        {
            age: 38,
            franc: 11.25,
        },
        {
            age: 39,
            franc: 11.003,
        },
        {
            age: 40,
            franc: 10.738,
        },
        {
            age: 41,
            franc: 10.457,
        },
        {
            age: 42,
            franc: 10.158,
        },
        {
            age: 43,
            franc: 9.841,
        },
        {
            age: 44,
            franc: 9.505,
        },
        {
            age: 45,
            franc: 9.148,
        },
        {
            age: 46,
            franc: 8.768,
        },
        {
            age: 47,
            franc: 8.365,
        },
        {
            age: 48,
            franc: 7.937,
        },
        {
            age: 49,
            franc: 7.482,
        },
        {
            age: 50,
            franc: 6.998,
        },
        {
            age: 51,
            franc: 6.483,
        },
        {
            age: 52,
            franc: 5.936,
        },
        {
            age: 53,
            franc: 5.353,
        },
        {
            age: 54,
            franc: 4.731,
        },
        {
            age: 55,
            franc: 4.069,
        },
        {
            age: 56,
            franc: 3.361,
        },
        {
            age: 57,
            franc: 2.605,
        },
        {
            age: 58,
            franc: 1.797,
        },
        {
            age: 59,
            franc: 0.93,
        },
        {
            age: 60,
            franc: 0,
        },
    ];
    let mere65 = [
        {
            age: 0,
            franc: 14.685,
        },
        {
            age: 1,
            franc: 14.935,
        },
        {
            age: 2,
            franc: 14.938,
        },
        {
            age: 3,
            franc: 14.923,
        },
        {
            age: 4,
            franc: 14.903,
        },
        {
            age: 5,
            franc: 14.88,
        },
        {
            age: 6,
            franc: 14.853,
        },
        {
            age: 7,
            franc: 14.824,
        },
        {
            age: 8,
            franc: 14.793,
        },
        {
            age: 9,
            franc: 14.759,
        },
        {
            age: 10,
            franc: 14.722,
        },
        {
            age: 11,
            franc: 14.683,
        },
        {
            age: 12,
            franc: 14.641,
        },
        {
            age: 13,
            franc: 14.597,
        },
        {
            age: 14,
            franc: 14.55,
        },
        {
            age: 15,
            franc: 14.5,
        },
        {
            age: 16,
            franc: 14.449,
        },
        {
            age: 17,
            franc: 14.394,
        },
        {
            age: 18,
            franc: 14.337,
        },
        {
            age: 19,
            franc: 14.277,
        },
        {
            age: 20,
            franc: 14.214,
        },
        {
            age: 21,
            franc: 14.148,
        },
        {
            age: 22,
            franc: 14.077,
        },
        {
            age: 23,
            franc: 14.002,
        },
        {
            age: 24,
            franc: 13.923,
        },
        {
            age: 25,
            franc: 13.839,
        },
        {
            age: 26,
            franc: 13.75,
        },
        {
            age: 27,
            franc: 13.655,
        },
        {
            age: 28,
            franc: 13.556,
        },
        {
            age: 29,
            franc: 13.45,
        },
        {
            age: 30,
            franc: 13.338,
        },
        {
            age: 31,
            franc: 13.22,
        },
        {
            age: 32,
            franc: 13.094,
        },
        {
            age: 33,
            franc: 12.961,
        },
        {
            age: 34,
            franc: 12.82,
        },
        {
            age: 35,
            franc: 12.671,
        },
        {
            age: 36,
            franc: 12.512,
        },
        {
            age: 37,
            franc: 12.344,
        },
        {
            age: 38,
            franc: 12.166,
        },
        {
            age: 39,
            franc: 11.978,
        },
        {
            age: 40,
            franc: 11.778,
        },
        {
            age: 41,
            franc: 11.567,
        },
        {
            age: 42,
            franc: 11.343,
        },
        {
            age: 43,
            franc: 11.105,
        },
        {
            age: 44,
            franc: 10.854,
        },
        {
            age: 45,
            franc: 10.588,
        },
        {
            age: 46,
            franc: 10.306,
        },
        {
            age: 47,
            franc: 10.008,
        },
        {
            age: 48,
            franc: 9.692,
        },
        {
            age: 49,
            franc: 9.358,
        },
        {
            age: 50,
            franc: 9.003,
        },
        {
            age: 51,
            franc: 8.628,
        },
        {
            age: 52,
            franc: 8.23,
        },
        {
            age: 53,
            franc: 7.808,
        },
        {
            age: 54,
            franc: 7.36,
        },
        {
            age: 55,
            franc: 6.885,
        },
        {
            age: 56,
            franc: 6.38,
        },
        {
            age: 57,
            franc: 5.844,
        },
        {
            age: 58,
            franc: 5.272,
        },
        {
            age: 59,
            franc: 4.664,
        },
        {
            age: 60,
            franc: 4.015,
        },
        {
            age: 61,
            franc: 3.321,
        },
        {
            age: 62,
            franc: 2.578,
        },
        {
            age: 63,
            franc: 1.781,
        },
        {
            age: 64,
            franc: 0.924,
        },
        {
            age: 65,
            franc: 0,
        },
    ];
    let mere100 = [
        {
            age: 0,
            franc: 14.806,
        },
        {
            age: 1,
            franc: 15.065,
        },
        {
            age: 2,
            franc: 15.077,
        },
        {
            age: 3,
            franc: 15.072,
        },
        {
            age: 4,
            franc: 15.061,
        },
        {
            age: 5,
            franc: 15.048,
        },
        {
            age: 6,
            franc: 15.033,
        },
        {
            age: 7,
            franc: 15.016,
        },
        {
            age: 8,
            franc: 14.997,
        },
        {
            age: 9,
            franc: 14.976,
        },
        {
            age: 10,
            franc: 14.953,
        },
        {
            age: 11,
            franc: 14.929,
        },
        {
            age: 12,
            franc: 14.904,
        },
        {
            age: 13,
            franc: 14.876,
        },
        {
            age: 14,
            franc: 14.848,
        },
        {
            age: 15,
            franc: 14.818,
        },
        {
            age: 16,
            franc: 14.787,
        },
        {
            age: 17,
            franc: 14.755,
        },
        {
            age: 18,
            franc: 14.721,
        },
        {
            age: 19,
            franc: 14.686,
        },
        {
            age: 20,
            franc: 14.65,
        },
        {
            age: 21,
            franc: 14.612,
        },
        {
            age: 22,
            franc: 14.572,
        },
        {
            age: 23,
            franc: 14.529,
        },
        {
            age: 24,
            franc: 14.485,
        },
        {
            age: 25,
            franc: 14.438,
        },
        {
            age: 26,
            franc: 14.388,
        },
        {
            age: 27,
            franc: 14.336,
        },
        {
            age: 28,
            franc: 14.281,
        },
        {
            age: 29,
            franc: 14.223,
        },
        {
            age: 30,
            franc: 14.163,
        },
        {
            age: 31,
            franc: 14.099,
        },
        {
            age: 32,
            franc: 14.032,
        },
        {
            age: 33,
            franc: 13.961,
        },
        {
            age: 34,
            franc: 13.886,
        },
        {
            age: 35,
            franc: 13.807,
        },
        {
            age: 36,
            franc: 13.724,
        },
        {
            age: 37,
            franc: 13.636,
        },
        {
            age: 38,
            franc: 13.544,
        },
        {
            age: 39,
            franc: 13.448,
        },
        {
            age: 40,
            franc: 13.346,
        },
        {
            age: 41,
            franc: 13.24,
        },
        {
            age: 42,
            franc: 13.128,
        },
        {
            age: 43,
            franc: 13.011,
        },
        {
            age: 44,
            franc: 12.888,
        },
        {
            age: 45,
            franc: 12.76,
        },
        {
            age: 46,
            franc: 12.625,
        },
        {
            age: 47,
            franc: 12.485,
        },
        {
            age: 48,
            franc: 12.339,
        },
        {
            age: 49,
            franc: 12.186,
        },
        {
            age: 50,
            franc: 12.026,
        },
        {
            age: 51,
            franc: 11.861,
        },
        {
            age: 52,
            franc: 11.688,
        },
        {
            age: 53,
            franc: 11.509,
        },
        {
            age: 54,
            franc: 11.323,
        },
        {
            age: 55,
            franc: 11.13,
        },
        {
            age: 56,
            franc: 10.931,
        },
        {
            age: 57,
            franc: 10.725,
        },
        {
            age: 58,
            franc: 10.512,
        },
        {
            age: 59,
            franc: 10.293,
        },
        {
            age: 60,
            franc: 10.067,
        },
        {
            age: 61,
            franc: 9.835,
        },
        {
            age: 62,
            franc: 9.597,
        },
        {
            age: 63,
            franc: 9.352,
        },
        {
            age: 64,
            franc: 9.103,
        },
        {
            age: 65,
            franc: 8.848,
        },
        {
            age: 66,
            franc: 8.588,
        },
        {
            age: 67,
            franc: 8.324,
        },
        {
            age: 68,
            franc: 8.056,
        },
        {
            age: 69,
            franc: 7.784,
        },
        {
            age: 70,
            franc: 7.509,
        },
        {
            age: 71,
            franc: 7.232,
        },
        {
            age: 72,
            franc: 6.953,
        },
        {
            age: 73,
            franc: 6.672,
        },
        {
            age: 74,
            franc: 6.391,
        },
        {
            age: 75,
            franc: 6.11,
        },
        {
            age: 76,
            franc: 5.83,
        },
        {
            age: 77,
            franc: 5.551,
        },
        {
            age: 78,
            franc: 5.275,
        },
        {
            age: 79,
            franc: 5.001,
        },
        {
            age: 80,
            franc: 4.731,
        },
        {
            age: 81,
            franc: 4.466,
        },
        {
            age: 82,
            franc: 4.205,
        },
        {
            age: 83,
            franc: 3.95,
        },
        {
            age: 84,
            franc: 3.701,
        },
        {
            age: 85,
            franc: 3.459,
        },
        {
            age: 86,
            franc: 3.224,
        },
        {
            age: 87,
            franc: 2.997,
        },
        {
            age: 88,
            franc: 2.778,
        },
        {
            age: 89,
            franc: 2.567,
        },
        {
            age: 90,
            franc: 2.365,
        },
        {
            age: 91,
            franc: 2.173,
        },
        {
            age: 92,
            franc: 1.989,
        },
        {
            age: 93,
            franc: 1.815,
        },
        {
            age: 94,
            franc: 1.65,
        },
        {
            age: 95,
            franc: 1.494,
        },
        {
            age: 96,
            franc: 1.348,
        },
        {
            age: 97,
            franc: 1.21,
        },
        {
            age: 98,
            franc: 1.082,
        },
        {
            age: 99,
            franc: 0.963,
        },
        {
            age: 100,
            franc: 0.851,
        },
    ];
    let pere60 = [
        {
            age: 0,
            franc: 14.425,
        },
        {
            age: 1,
            franc: 14.745,
        },
        {
            age: 2,
            franc: 14.739,
        },
        {
            age: 3,
            franc: 14.715,
        },
        {
            age: 4,
            franc: 14.684,
        },
        {
            age: 5,
            franc: 14.648,
        },
        {
            age: 6,
            franc: 14.609,
        },
        {
            age: 7,
            franc: 14.566,
        },
        {
            age: 8,
            franc: 14.519,
        },
        {
            age: 9,
            franc: 14.47,
        },
        {
            age: 10,
            franc: 14.417,
        },
        {
            age: 11,
            franc: 14.36,
        },
        {
            age: 12,
            franc: 14.299,
        },
        {
            age: 13,
            franc: 14.235,
        },
        {
            age: 14,
            franc: 14.167,
        },
        {
            age: 15,
            franc: 14.095,
        },
        {
            age: 16,
            franc: 14.022,
        },
        {
            age: 17,
            franc: 13.945,
        },
        {
            age: 18,
            franc: 13.867,
        },
        {
            age: 19,
            franc: 13.785,
        },
        {
            age: 20,
            franc: 13.7,
        },
        {
            age: 21,
            franc: 13.61,
        },
        {
            age: 22,
            franc: 13.515,
        },
        {
            age: 23,
            franc: 13.415,
        },
        {
            age: 24,
            franc: 13.309,
        },
        {
            age: 25,
            franc: 13.196,
        },
        {
            age: 26,
            franc: 13.077,
        },
        {
            age: 27,
            franc: 12.95,
        },
        {
            age: 28,
            franc: 12.814,
        },
        {
            age: 29,
            franc: 12.67,
        },
        {
            age: 30,
            franc: 12.517,
        },
        {
            age: 31,
            franc: 12.355,
        },
        {
            age: 32,
            franc: 12.184,
        },
        {
            age: 33,
            franc: 12.004,
        },
        {
            age: 34,
            franc: 11.813,
        },
        {
            age: 35,
            franc: 11.612,
        },
        {
            age: 36,
            franc: 11.399,
        },
        {
            age: 37,
            franc: 11.175,
        },
        {
            age: 38,
            franc: 10.938,
        },
        {
            age: 39,
            franc: 10.688,
        },
        {
            age: 40,
            franc: 10.423,
        },
        {
            age: 41,
            franc: 10.144,
        },
        {
            age: 42,
            franc: 9.85,
        },
        {
            age: 43,
            franc: 9.538,
        },
        {
            age: 44,
            franc: 9.209,
        },
        {
            age: 45,
            franc: 8.861,
        },
        {
            age: 46,
            franc: 8.493,
        },
        {
            age: 47,
            franc: 8.103,
        },
        {
            age: 48,
            franc: 7.6899999999999995,
        },
        {
            age: 49,
            franc: 7.252,
        },
        {
            age: 50,
            franc: 6.787,
        },
        {
            age: 51,
            franc: 6.294,
        },
        {
            age: 52,
            franc: 5.769,
        },
        {
            age: 53,
            franc: 5.21,
        },
        {
            age: 54,
            franc: 4.613,
        },
        {
            age: 55,
            franc: 3.975,
        },
        {
            age: 56,
            franc: 3.293,
        },
        {
            age: 57,
            franc: 2.56,
        },
        {
            age: 58,
            franc: 1.772,
        },
        {
            age: 59,
            franc: 0.921,
        },
        {
            age: 60,
            franc: 0,
        },
    ];
    let pere65 = [
        {
            age: 0,
            franc: 14.492,
        },
        {
            age: 1,
            franc: 14.819,
        },
        {
            age: 2,
            franc: 14.818,
        },
        {
            age: 3,
            franc: 14.799,
        },
        {
            age: 4,
            franc: 14.773,
        },
        {
            age: 5,
            franc: 14.743,
        },
        {
            age: 6,
            franc: 14.71,
        },
        {
            age: 7,
            franc: 14.674,
        },
        {
            age: 8,
            franc: 14.634,
        },
        {
            age: 9,
            franc: 14.592,
        },
        {
            age: 10,
            franc: 14.547,
        },
        {
            age: 11,
            franc: 14.499,
        },
        {
            age: 12,
            franc: 14.447,
        },
        {
            age: 13,
            franc: 14.392,
        },
        {
            age: 14,
            franc: 14.335,
        },
        {
            age: 15,
            franc: 14.276,
        },
        {
            age: 16,
            franc: 14.213,
        },
        {
            age: 17,
            franc: 14.149,
        },
        {
            age: 18,
            franc: 14.084,
        },
        {
            age: 19,
            franc: 14.017,
        },
        {
            age: 20,
            franc: 13.947,
        },
        {
            age: 21,
            franc: 13.873,
        },
        {
            age: 22,
            franc: 13.796,
        },
        {
            age: 23,
            franc: 13.715,
        },
        {
            age: 24,
            franc: 13.628,
        },
        {
            age: 25,
            franc: 13.537,
        },
        {
            age: 26,
            franc: 13.44,
        },
        {
            age: 27,
            franc: 13.337,
        },
        {
            age: 28,
            franc: 13.228,
        },
        {
            age: 29,
            franc: 13.111,
        },
        {
            age: 30,
            franc: 12.988,
        },
        {
            age: 31,
            franc: 12.857,
        },
        {
            age: 32,
            franc: 12.72,
        },
        {
            age: 33,
            franc: 12.575,
        },
        {
            age: 34,
            franc: 12.423,
        },
        {
            age: 35,
            franc: 12.263,
        },
        {
            age: 36,
            franc: 12.095,
        },
        {
            age: 37,
            franc: 11.918,
        },
        {
            age: 38,
            franc: 11.731,
        },
        {
            age: 39,
            franc: 11.536,
        },
        {
            age: 40,
            franc: 11.33,
        },
        {
            age: 41,
            franc: 11.114,
        },
        {
            age: 42,
            franc: 10.886,
        },
        {
            age: 43,
            franc: 10.647,
        },
        {
            age: 44,
            franc: 10.396,
        },
        {
            age: 45,
            franc: 10.132,
        },
        {
            age: 46,
            franc: 9.855,
        },
        {
            age: 47,
            franc: 9.563,
        },
        {
            age: 48,
            franc: 9.255,
        },
        {
            age: 49,
            franc: 8.932,
        },
        {
            age: 50,
            franc: 8.591,
        },
        {
            age: 51,
            franc: 8.232,
        },
        {
            age: 52,
            franc: 7.854,
        },
        {
            age: 53,
            franc: 7.454,
        },
        {
            age: 54,
            franc: 7.031,
        },
        {
            age: 55,
            franc: 6.583,
        },
        {
            age: 56,
            franc: 6.109,
        },
        {
            age: 57,
            franc: 5.604,
        },
        {
            age: 58,
            franc: 5.068,
        },
        {
            age: 59,
            franc: 4.495,
        },
        {
            age: 60,
            franc: 3.881,
        },
        {
            age: 61,
            franc: 3.223,
        },
        {
            age: 62,
            franc: 2.513,
        },
        {
            age: 63,
            franc: 1.745,
        },
        {
            age: 64,
            franc: 0.911,
        },
        {
            age: 65,
            franc: 0,
        },
    ];
    let pere100 = [
        {
            age: 0,
            franc: 14.576,
        },
        {
            age: 1,
            franc: 14.91,
        },
        {
            age: 2,
            franc: 14.915,
        },
        {
            age: 3,
            franc: 14.903,
        },
        {
            age: 4,
            franc: 14.884,
        },
        {
            age: 5,
            franc: 14.861,
        },
        {
            age: 6,
            franc: 14.835,
        },
        {
            age: 7,
            franc: 14.807,
        },
        {
            age: 8,
            franc: 14.777,
        },
        {
            age: 9,
            franc: 14.744,
        },
        {
            age: 10,
            franc: 14.709,
        },
        {
            age: 11,
            franc: 14.671,
        },
        {
            age: 12,
            franc: 14.631,
        },
        {
            age: 13,
            franc: 14.588,
        },
        {
            age: 14,
            franc: 14.543,
        },
        {
            age: 15,
            franc: 14.497,
        },
        {
            age: 16,
            franc: 14.45,
        },
        {
            age: 17,
            franc: 14.401,
        },
        {
            age: 18,
            franc: 14.353,
        },
        {
            age: 19,
            franc: 14.304,
        },
        {
            age: 20,
            franc: 14.253,
        },
        {
            age: 21,
            franc: 14.2,
        },
        {
            age: 22,
            franc: 14.144,
        },
        {
            age: 23,
            franc: 14.086,
        },
        {
            age: 24,
            franc: 14.025,
        },
        {
            age: 25,
            franc: 13.959,
        },
        {
            age: 26,
            franc: 13.891,
        },
        {
            age: 27,
            franc: 13.818,
        },
        {
            age: 28,
            franc: 13.74,
        },
        {
            age: 29,
            franc: 13.658,
        },
        {
            age: 30,
            franc: 13.571,
        },
        {
            age: 31,
            franc: 13.48,
        },
        {
            age: 32,
            franc: 13.384,
        },
        {
            age: 33,
            franc: 13.284,
        },
        {
            age: 34,
            franc: 13.18,
        },
        {
            age: 35,
            franc: 13.071,
        },
        {
            age: 36,
            franc: 12.958,
        },
        {
            age: 37,
            franc: 12.839,
        },
        {
            age: 38,
            franc: 12.716,
        },
        {
            age: 39,
            franc: 12.588,
        },
        {
            age: 40,
            franc: 12.455,
        },
        {
            age: 41,
            franc: 12.316,
        },
        {
            age: 42,
            franc: 12.172,
        },
        {
            age: 43,
            franc: 12.023,
        },
        {
            age: 44,
            franc: 11.869,
        },
        {
            age: 45,
            franc: 11.709,
        },
        {
            age: 46,
            franc: 11.544,
        },
        {
            age: 47,
            franc: 11.373,
        },
        {
            age: 48,
            franc: 11.197,
        },
        {
            age: 49,
            franc: 11.016,
        },
        {
            age: 50,
            franc: 10.829,
        },
        {
            age: 51,
            franc: 10.637,
        },
        {
            age: 52,
            franc: 10.44,
        },
        {
            age: 53,
            franc: 10.237,
        },
        {
            age: 54,
            franc: 10.03,
        },
        {
            age: 55,
            franc: 9.818,
        },
        {
            age: 56,
            franc: 9.602,
        },
        {
            age: 57,
            franc: 9.381,
        },
        {
            age: 58,
            franc: 9.156,
        },
        {
            age: 59,
            franc: 8.928,
        },
        {
            age: 60,
            franc: 8.696,
        },
        {
            age: 61,
            franc: 8.461,
        },
        {
            age: 62,
            franc: 8.223,
        },
        {
            age: 63,
            franc: 7.983,
        },
        {
            age: 64,
            franc: 7.741,
        },
        {
            age: 65,
            franc: 7.498,
        },
        {
            age: 66,
            franc: 7.254,
        },
        {
            age: 67,
            franc: 7.01,
        },
        {
            age: 68,
            franc: 6.766,
        },
        {
            age: 69,
            franc: 6.523,
        },
        {
            age: 70,
            franc: 6.282,
        },
        {
            age: 71,
            franc: 6.043,
        },
        {
            age: 72,
            franc: 5.808,
        },
        {
            age: 73,
            franc: 5.577,
        },
        {
            age: 74,
            franc: 5.351,
        },
        {
            age: 75,
            franc: 5.132,
        },
        {
            age: 76,
            franc: 4.921,
        },
        {
            age: 77,
            franc: 4.72,
        },
        {
            age: 78,
            franc: 4.531,
        },
        {
            age: 79,
            franc: 4.356,
        },
        {
            age: 80,
            franc: 2.707,
        },
        {
            age: 81,
            franc: 3.582,
        },
        {
            age: 82,
            franc: 3.371,
        },
        {
            age: 83,
            franc: 3.167,
        },
        {
            age: 84,
            franc: 2.969,
        },
        {
            age: 85,
            franc: 2.778,
        },
        {
            age: 86,
            franc: 2.593,
        },
        {
            age: 87,
            franc: 2.415,
        },
        {
            age: 88,
            franc: 2.244,
        },
        {
            age: 89,
            franc: 2.081,
        },
        {
            age: 90,
            franc: 1.924,
        },
        {
            age: 91,
            franc: 1.775,
        },
        {
            age: 92,
            franc: 1.633,
        },
        {
            age: 93,
            franc: 1.498,
        },
        {
            age: 94,
            franc: 1.371,
        },
        {
            age: 95,
            franc: 1.25,
        },
        {
            age: 96,
            franc: 1.136,
        },
        {
            age: 97,
            franc: 1.03,
        },
        {
            age: 98,
            franc: 0.93,
        },
        {
            age: 99,
            franc: 0.836,
        },
        {
            age: 100,
            franc: 0.748,
        },
    ];
    let quatreEnfant = [
        {
            type: "ascendants",
            pourcent: 5
        },
        {
            type: "conjoints",
            pourcent: 40
        },
        {
            type: "enfants",
            pourcent: 30
        },
        {
            type: "orphelins",
            pourcent: 50
        }
    ];
    let plusQuatreEnfant = [
        {
            type: "ascendants",
            pourcent: 5
        },
        {
            type: "conjoints",
            pourcent: 35
        },
        {
            type: "enfants",
            pourcent: 40
        },
        {
            type: "orphelins",
            pourcent: 50
        }
    ];
    let sansRien = [
        {
            type: "ascendants",
            pourcent: 25
        },
        {
            type: "conjoints",
            pourcent: 0
        },
        {
            type: "enfants",
            pourcent: 0
        },
        {
            type: "orphelins",
            pourcent: 0
        }
    ];
    let avecConjoitSansEnfant = [
        {
            type: "ascendants",
            pourcent: 15
        },
        {
            type: "conjoints",
            pourcent: 40
        },
        {
            type: "enfants",
            pourcent: 0
        },
        {
            type: "orphelins",
            pourcent: 0
        }
    ];
    let sansConjoitAvecEnfant = [
        {
            type: "ascendants",
            pourcent: 15
        },
        {
            type: "conjoints",
            pourcent: 0
        },
        {
            type: "enfants",
            pourcent: 50
        },
        {
            type: "orphelins",
            pourcent: 60
        }
    ];
    if (distributionKey == "Quatre enfant à charge") {

        if (quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            cléDePartage = quatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent

            capitalize = ((annualIncome * rentValue) / 100) / totalAscendant
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 75 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Descendant (e)") {
            qualityValue = "enfants"
            cléDePartage = quatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent

            capitalize = ((annualIncome * rentValue) / 100) / (totalMinorDescendant + totalMinorConcubin + totalMajorDescendant + totalMajorConcubin)


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            cléDePartage = quatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent

            capitalize = ((annualIncome * rentValue) / 100) / totalConjoint
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 150 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
        if (quality == "Collatéral (le)") {
            moralDamage = Number(annualSMIG) * 50 / 100
        }
        if (quality == "Concubin (e)") {
            qualityValue = "enfants"
            cléDePartage = quatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent

            capitalize = ((annualIncome * rentValue) / 100) / (totalMinorDescendant + totalMinorConcubin + totalMajorDescendant + totalMajorConcubin)


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0
        }
        if (quality == "Orphelin double") {
            qualityValue = "orphelins"
            cléDePartage = quatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent

            capitalize = ((annualIncome * rentValue) / 100) / totalOrphelinDouble


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
    }
    if (distributionKey == "Au-delà de quatre enfant") {
        let qualityValue = "";
        let pensionFrancValue = []
        if (quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            cléDePartage = plusQuatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 75 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Descendant (e)") {
            qualityValue = "enfants"
            cléDePartage = plusQuatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            cléDePartage = plusQuatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 150 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
        if (quality == "Collatéral (le)") {
            moralDamage = Number(annualSMIG) * 50 / 100
        }
        if (quality == "Concubin (e)") {
            qualityValue = "enfants"
            cléDePartage = plusQuatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0
        }
        if (quality == "Orphelin double") {
            qualityValue = "orphelins"
            cléDePartage = plusQuatreEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
    }
    if (distributionKey == "Sans conjoint, sans enfant") {
        let qualityValue = "";
        let pensionFrancValue = []
        if (quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            cléDePartage = sansRien.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 75 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Descendant (e)") {
            qualityValue = "enfants"
            cléDePartage = sansRien.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            cléDePartage = sansRien.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 150 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
        if (quality == "Collatéral (le)") {
            moralDamage = Number(annualSMIG) * 50 / 100
        }
        if (quality == "Concubin (e)") {
            qualityValue = "enfants"
            cléDePartage = sansRien.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0
        }
        if (quality == "Orphelin double") {
            qualityValue = "orphelins"
            cléDePartage = sansRien.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
    }
    if (distributionKey == "Avec conjoint(s), sans enfant") {
        let qualityValue = "";
        let pensionFrancValue = []
        if (quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            cléDePartage = avecConjoitSansEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 75 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Descendant (e)") {
            qualityValue = "enfants"
            cléDePartage = avecConjoitSansEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            cléDePartage = avecConjoitSansEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 150 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
        if (quality == "Collatéral (le)") {
            moralDamage = Number(annualSMIG) * 50 / 100
        }
        if (quality == "Concubin (e)") {
            qualityValue = "enfants"
            cléDePartage = avecConjoitSansEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0
        }
        if (quality == "Orphelin double") {
            qualityValue = "orphelins"
            cléDePartage = avecConjoitSansEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
    }
    if (distributionKey == "Avec enfant(s), sans conjoint") {
        let qualityValue = "";
        let pensionFrancValue = []
        if (quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            cléDePartage = sansConjoitAvecEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 75 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Descendant (e)") {
            qualityValue = "enfants"
            cléDePartage = sansConjoitAvecEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0


        }
        if (quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            cléDePartage = sansConjoitAvecEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber
            if (sex == "Masculin") {

                pensionFrancValue = pere100.filter(
                    (element) => element.age == age
                );

            }
            if (sex == "Féminin") {

                pensionFrancValue = mere100.filter(
                    (element) => element.age == age
                );
            }
            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            economicDamage = Number(capitalize) * pensionFranc
            moralDamage = Number(annualSMIG) * 150 / 100
            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
        if (quality == "Collatéral (le)") {
            moralDamage = Number(annualSMIG) * 50 / 100
        }
        if (quality == "Concubin (e)") {
            qualityValue = "enfants"
            cléDePartage = sansConjoitAvecEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
            // let capitalize = 0
        }
        if (quality == "Orphelin double") {
            qualityValue = "orphelins"
            cléDePartage = sansConjoitAvecEnfant.filter(
                (element) => element.type == qualityValue
            );
            rentValue = cléDePartage[0].pourcent
            let AscendantNumber = 1
            capitalize = ((annualIncome * rentValue) / 100) / AscendantNumber


            if (sex == "Masculin") {
                if (age <= 25) {
                    pensionFrancValue = man25.filter(
                        (element) => element.age == age
                    );
                }
            }
            if (sex == "Féminin") {
                if (age <= 25) {
                    pensionFrancValue = fille25.filter(
                        (element) => element.age == age
                    );
                }
            }

            // alert(pensionFrancValue)
            pensionFranc = pensionFrancValue[0].franc
            if (age < 25) {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 100 / 100
            } else {
                economicDamage = Number(capitalize) * pensionFranc
                moralDamage = Number(annualSMIG) * 75 / 100
            }

            compensationDue = Number(economicDamage) + Number(moralDamage)
            share = (Number(compensationDue) * Number(sharingRate)) / 100
        }
    }
    return pensionFranc, economicDamage, moralDamage, compensationDue, share, capitalize;
};