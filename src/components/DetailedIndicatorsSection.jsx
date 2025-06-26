import { IndicatorCard } from "./IndicatorCard";

export const DetailedIndicatorsSection = ({ indicators }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Detailed Indicators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {indicators.map((indicator, index) => (
          <IndicatorCard key={index} indicator={indicator} />
        ))}
      </div>
    </div>
  );
};