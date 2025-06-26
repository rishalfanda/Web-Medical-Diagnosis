import { getScoreColor, getScoreTextColor } from "../utils/helpers";

export const IndicatorCard = ({ indicator }) => {
  const score = Math.round(indicator.score * 100); // Convert decimal to percentage
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-md font-semibold text-gray-200">{indicator.title}</h4>
        <span className={`text-sm font-bold ${getScoreTextColor(score)}`}>{score}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
        <div 
          className={`${getScoreColor(score)} h-1.5 rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400">{indicator.description}</p>
    </div>
  );
};