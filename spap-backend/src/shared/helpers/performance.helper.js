// ===============================
// Performance Helper
// Shared Performance Calculations
// ===============================


// ===============================
// Safe Score
// ===============================
const safeScore = (value = 0) => {

  const score = Number(value);

  return Number.isFinite(score) ? score : 0;

};




// ===============================
// Clamp Score
// Keep score between range
// ===============================
const clampScore = (
  score = 0,
  min = 0,
  max = 100
)=>{

  score = safeScore(score);

  if(score < min){
    return min;
  }

  if(score > max){
    return max;
  }

  return score;

};




// ===============================
// Calculate Score Percentage
// ===============================
const calculateScore = (
  score = 0,
  maxScore = 100
)=>{

  score = safeScore(score);
  maxScore = safeScore(maxScore);


  if(maxScore <= 0){
    return 0;
  }


  return Math.round(
    (score / maxScore) * 100
  );

};




// ===============================
// Calculate Average Score
// ===============================
const calculateAverageScore = (
  scores = []
)=>{

  if(!Array.isArray(scores) || scores.length === 0){
    return 0;
  }


  const total = scores
    .map(safeScore)
    .reduce(
      (sum,value)=>sum + value,
      0
    );


  return Math.round(
    total / scores.length
  );

};




// ===============================
// Calculate Median Score
// ===============================
const calculateMedianScore = (
  scores = []
)=>{

  if(!Array.isArray(scores) || scores.length === 0){
    return 0;
  }


  const sorted = scores
    .map(safeScore)
    .sort((a,b)=>a-b);


  const middle = Math.floor(
    sorted.length / 2
  );


  if(sorted.length % 2 === 0){

    return Math.round(
      (sorted[middle - 1] + sorted[middle]) / 2
    );

  }


  return sorted[middle];

};




// ===============================
// Calculate Weighted Score
// ===============================
const calculateWeightedScore = (
  items = []
)=>{

  if(!Array.isArray(items) || items.length === 0){
    return 0;
  }


  let totalScore = 0;
  let totalWeight = 0;


  items.forEach(item=>{

    const score = safeScore(item.score);
    const weight = safeScore(item.weight);


    totalScore += score * weight;

    totalWeight += weight;

  });



  if(totalWeight <= 0){
    return 0;
  }


  return Math.round(
    totalScore / totalWeight
  );

};




// ===============================
// Normalize Score
// ===============================
const normalizeScore = (
  score = 0,
  currentMax = 100,
  targetMax = 100
)=>{

  score = safeScore(score);
  currentMax = safeScore(currentMax);
  targetMax = safeScore(targetMax);


  if(currentMax <= 0){
    return 0;
  }


  return Math.round(
    (score / currentMax) * targetMax
  );

};




// ===============================
// Completion Rate
// ===============================
const calculateCompletionRate = (
  completed = 0,
  total = 0
)=>{

  completed = safeScore(completed);
  total = safeScore(total);


  if(total <= 0){
    return 0;
  }


  return Math.round(
    (completed / total) * 100
  );

};




// ===============================
// Performance Progress
// ===============================
const calculateProgress = (
  previous = 0,
  current = 0
)=>{

  return (
    safeScore(current) -
    safeScore(previous)
  );

};




// ===============================
// Improvement Percentage
// ===============================
const calculateImprovement = (
  previous = 0,
  current = 0
)=>{

  previous = safeScore(previous);
  current = safeScore(current);


  if(previous <= 0){
    return current > 0 ? 100 : 0;
  }


  return Math.round(
    ((current - previous) / previous) * 100
  );

};




// ===============================
// Percentage Change
// ===============================
const calculatePercentageChange = (
  oldValue = 0,
  newValue = 0
)=>{

  return calculateImprovement(
    oldValue,
    newValue
  );

};




// ===============================
// Performance Change
// ===============================
const calculatePerformanceChange = (
  previous = 0,
  current = 0
)=>{

  return {
    difference:
      safeScore(current) -
      safeScore(previous),

    percentage:
      calculatePercentageChange(
        previous,
        current
      )
  };

};




// ===============================
// Performance Consistency
// ===============================
const calculateConsistency = (
  scores = []
)=>{

  if(!Array.isArray(scores) || scores.length === 0){
    return 0;
  }


  const average = calculateAverageScore(scores);


  const variations = scores.map(score=>
    Math.abs(
      safeScore(score) - average
    )
  );


  const deviation =
    calculateAverageScore(variations);


  return clampScore(
    100 - deviation
  );

};




// ===============================
// Highest Score
// ===============================
const calculateHighestScore = (
  scores = []
)=>{

  if(!Array.isArray(scores) || scores.length === 0){
    return 0;
  }


  return Math.max(
    ...scores.map(safeScore)
  );

};




// ===============================
// Lowest Score
// ===============================
const calculateLowestScore = (
  scores = []
)=>{

  if(!Array.isArray(scores) || scores.length === 0){
    return 0;
  }


  return Math.min(
    ...scores.map(safeScore)
  );

};




// ===============================
// Compare Performance
// ===============================
const comparePerformance = (
  firstScore = 0,
  secondScore = 0
)=>{

  firstScore = safeScore(firstScore);
  secondScore = safeScore(secondScore);


  if(firstScore > secondScore){
    return "BETTER";
  }


  if(firstScore < secondScore){
    return "WORSE";
  }


  return "EQUAL";

};




// ===============================
// Rank Performance
// ===============================
const rankPerformance = (
  scores = []
)=>{

  if(!Array.isArray(scores)){
    return [];
  }


  return [...scores]
    .map(safeScore)
    .sort((a,b)=>b-a);

};




// ===============================
// Export
// ===============================
module.exports = {

  safeScore,
  clampScore,

  calculateScore,
  calculateAverageScore,
  calculateMedianScore,
  calculateWeightedScore,

  normalizeScore,

  calculateCompletionRate,

  calculateProgress,
  calculateImprovement,
  calculatePercentageChange,
  calculatePerformanceChange,

  calculateConsistency,

  calculateHighestScore,
  calculateLowestScore,

  comparePerformance,
  rankPerformance,

};