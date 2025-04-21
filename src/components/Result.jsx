import {
	AlertCircle,
	CheckCircle,
	ChevronLeft,
	Clipboard,
	Download,
	Printer,
	Save,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Komponen untuk preview gambar X-ray dengan heatmap
const ImagePreview = ({
	imageUrl,
	heatmapUrl,
	modelInfo,
	patientType,
	analysisTime,
}) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const img = new Image();
		img.onload = () => setLoading(false);
		img.src = imageUrl;
	}, [imageUrl]);

	return (
		<div className="bg-white rounded-lg shadow-md p-4 h-full">
			<div className="flex justify-between items-start mb-3">
				<h2 className="font-bold text-lg text-blue-800">X-Ray Image</h2>
				<div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
					{patientType}
				</div>
			</div>

			<div className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
				{loading ? (
					<div className="animate-pulse bg-gray-200 w-full h-full"></div>
				) : (
					<>
						<img
							src={imageUrl}
							alt="X-Ray Scan"
							className="max-h-full max-w-full object-contain"
						/>
						{heatmapUrl && (
							<div className="absolute inset-0 opacity-50">
								<img
									src={heatmapUrl}
									alt="AI Heatmap"
									className="max-h-full max-w-full object-contain"
								/>
							</div>
						)}
					</>
				)}
			</div>

			<div className="mt-3 text-sm text-gray-500 space-y-1">
				<div className="flex justify-between">
					<span>Model:</span>
					<span className="font-medium">{modelInfo}</span>
				</div>
				<div className="flex justify-between">
					<span>Patient Type:</span>
					<span className="font-medium">{patientType}</span>
				</div>
				<div className="flex justify-between">
					<span>Analysis Time:</span>
					<span className="font-medium">{analysisTime}</span>
				</div>
			</div>
		</div>
	);
};

// Komponen untuk menampilkan skor indikasi medis
const VisualInterpretationCard = ({ title, score, description }) => {
	// Warna berdasarkan nilai skor
	const getColorClass = (score) => {
		if (score >= 0.75) return "bg-red-100 text-red-800";
		if (score >= 0.5) return "bg-orange-100 text-orange-800";
		if (score >= 0.25) return "bg-yellow-100 text-yellow-800";
		return "bg-green-100 text-green-800";
	};

	const animationDelay = Math.random() * 0.5;

	return (
		<div
			className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md"
			style={{ animationDelay: `${animationDelay}s` }}
		>
			<div className="flex justify-between items-center">
				<h3 className="font-medium text-gray-800">{title}</h3>
				<div
					className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClass(
						score
					)}`}
				>
					{(score * 100).toFixed(1)}%
				</div>
			</div>

			<div className="mt-2 relative pt-1">
				<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
					<div
						style={{ width: `${score * 100}%` }}
						className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
							score >= 0.75
								? "bg-red-500"
								: score >= 0.5
								? "bg-orange-500"
								: score >= 0.25
								? "bg-yellow-500"
								: "bg-green-500"
						} transition-all duration-1000 ease-out`}
					></div>
				</div>
			</div>

			{description && (
				<p className="mt-2 text-xs text-gray-500">{description}</p>
			)}
		</div>
	);
};

// Komponen untuk hasil diagnosis dalam bar
const DiagnosisProgressBar = ({ diagnosis, confidence }) => {
	const [animateBar, setAnimateBar] = useState(false);

	useEffect(() => {
		// Trigger animation after component mounts
		const timer = setTimeout(() => setAnimateBar(true), 300);
		return () => clearTimeout(timer);
	}, []);

	// Generate diagnosis description based on confidence
	const getDiagnosisDescription = (diagnosis, confidence) => {
		if (diagnosis === "TBC Abnormal") {
			if (confidence > 80)
				return "High probability of TBC. Immediate clinical correlation advised.";
			if (confidence > 60)
				return "Moderate indication of TBC abnormalities. Further evaluation recommended.";
			return "Low evidence of TBC abnormalities. Consider additional tests.";
		}
		return "No significant TBC abnormalities detected. Routine follow-up recommended.";
	};

	// Get color based on diagnosis and confidence
	const getConfidenceColor = (diagnosis, confidence) => {
		if (diagnosis === "TBC Abnormal") {
			return confidence > 70 ? "bg-red-600" : "bg-orange-500";
		}
		return "bg-green-500";
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex justify-between items-center mb-3">
				<h2 className="font-bold text-lg text-blue-800">
					AI Diagnosis
				</h2>
				<div className="text-gray-500 text-sm">Confidence Score</div>
			</div>

			<div className="mb-6">
				<div className="flex justify-between items-center mb-2">
					<div className="flex items-center">
						<AlertCircle
							className={`mr-2 ${
								diagnosis === "TBC Abnormal"
									? "text-red-500"
									: "text-green-500"
							}`}
							size={20}
						/>
						<h3 className="font-bold text-xl">{diagnosis}</h3>
					</div>
					<div className="text-2xl font-bold">{confidence}%</div>
				</div>

				<div className="relative h-5 w-full bg-gray-200 rounded-full overflow-hidden">
					<div
						className={`h-full ${getConfidenceColor(
							diagnosis,
							confidence
						)} transition-all duration-1000 ease-out`}
						style={{ width: animateBar ? `${confidence}%` : "0%" }}
					></div>
				</div>

				<p className="mt-3 text-gray-600">
					{getDiagnosisDescription(diagnosis, confidence)}
				</p>
			</div>

			<div className="border-t border-gray-200 pt-4">
				<div className="text-sm text-gray-500">
					<p>
						<strong>Note:</strong> This AI analysis is intended as a
						screening tool and should not replace professional
						medical evaluation. Please consult a healthcare provider
						for definitive diagnosis.
					</p>
				</div>
			</div>
		</div>
	);
};

// Komponen utama halaman hasil analisis
function Result() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [notification, setNotification] = useState({
		show: false,
		type: "",
		message: "",
	});

	// Dummy data untuk simulasi hasil analisis
	const analysisResult = {
		imageUrl: "/xray-sample.jpg", // Tambahkan gambar sample di folder public
		heatmapUrl: "/heatmap-overlay.png", // Tambahkan overlay heatmap di folder public
		modelInfo: "TBC Detection Model v2.0",
		patientType: "Non-Disabilitas",
		analysisTime: "13 Apr 2025, 14:32",
		diagnosis: "TBC Abnormal",
		confidence: 78,
		indicators: [
			{
				title: "Infiltrate",
				score: 0.82,
				description: "Diffuse infiltrates present in upper lobe",
			},
			{
				title: "Consolidation",
				score: 0.65,
				description: "Moderate consolidation in right upper zone",
			},
			{
				title: "Cavity",
				score: 0.37,
				description: "Small cavitation suspected",
			},
			{
				title: "Effusion",
				score: 0.12,
				description: "No significant pleural effusion",
			},
			{
				title: "Fibrotic",
				score: 0.58,
				description: "Moderate fibrotic changes observed",
			},
			{
				title: "Calcification",
				score: 0.21,
				description: "Minimal calcification noted",
			},
		],
	};

	// Simulasi loading data
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	// Handle save analysis
	const handleSave = async () => {
		setIsSaving(true);

		// Simulate API call to save data
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			showNotification("success", "Analysis saved successfully!");
		} catch (error) {
			showNotification(
				"error",
				"Failed to save analysis. Please try again."
			);
		} finally {
			setIsSaving(false);
		}
	};

	// Show notification
	const showNotification = (type, message) => {
		setNotification({ show: true, type, message });

		// Auto-hide after 3 seconds
		setTimeout(() => {
			setNotification({ show: false, type: "", message: "" });
		}, 3000);
	};

	// Handle back to upload
	const handleBack = () => {
		// In a real app, you would use navigation here
		console.log("Navigate back to upload page");
		navigate("/model");
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">
						Processing analysis results...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
			{/* Notification Toast */}
			{notification.show && (
				<div
					className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center space-x-2 transition-opacity ${
						notification.type === "success"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}
				>
					{notification.type === "success" ? (
						<CheckCircle className="w-5 h-5" />
					) : (
						<XCircle className="w-5 h-5" />
					)}
					<span>{notification.message}</span>
				</div>
			)}

			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<button
						onClick={handleBack}
						className="flex items-center text-blue-600 hover:text-blue-800 transition"
					>
						<ChevronLeft className="w-5 h-5 mr-1" />
						Back to Upload
					</button>

					<div className="flex space-x-3">
						<button
							onClick={handleSave}
							disabled={isSaving}
							className={`flex items-center px-4 py-2 rounded-md text-white transition ${
								isSaving
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							{isSaving ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Saving...
								</>
							) : (
								<>
									<Save className="w-4 h-4 mr-2" />
									Save Analysis
								</>
							)}
						</button>

						<button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
							<Printer className="w-4 h-4 mr-2" />
							Print
						</button>

						<button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
							<Download className="w-4 h-4 mr-2" />
							Export
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* X-Ray Image Preview - 1/3 width */}
					<div className="md:col-span-1">
						<ImagePreview
							imageUrl={analysisResult.imageUrl}
							heatmapUrl={analysisResult.heatmapUrl}
							modelInfo={analysisResult.modelInfo}
							patientType={analysisResult.patientType}
							analysisTime={analysisResult.analysisTime}
						/>
					</div>

					{/* Analysis Results - 2/3 width */}
					<div className="md:col-span-2 space-y-6">
						{/* Diagnosis Result */}
						<DiagnosisProgressBar
							diagnosis={analysisResult.diagnosis}
							confidence={analysisResult.confidence}
						/>

						{/* Visual Interpretation Cards */}
						<div>
							<h2 className="font-bold text-lg text-blue-800 mb-3">
								Detailed Indicators
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{analysisResult.indicators.map(
									(indicator, index) => (
										<VisualInterpretationCard
											key={index}
											title={indicator.title}
											score={indicator.score}
											description={indicator.description}
										/>
									)
								)}
							</div>
						</div>

						{/* Notes and Actions */}
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="font-bold text-lg text-blue-800 mb-3">
								Notes
							</h2>
							<textarea
								className="w-full border border-gray-300 rounded-md p-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
								placeholder="Add clinical notes here..."
							></textarea>

							<div className="mt-4 flex items-center text-sm text-gray-500">
								<Clipboard className="w-4 h-4 mr-2" />
								Notes will be saved with the analysis report
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Result;
