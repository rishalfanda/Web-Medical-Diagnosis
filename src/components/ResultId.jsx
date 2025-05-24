import { useGetDiagnosisId } from "../hooks/diagnosis/useGetDiagnosisId"

function ResultId() {
    const {isGetting, diagnosisId, error} = useGetDiagnosisId()
    if (isGetting) return <p>Loading...</p>;
    if (error) return <p>Terjadi kesalahan: {error.message}</p>;
    if (!diagnosisId) return <p>Tidak ada data diagnosis.</p>;
    const {id, ai_diagnosis, patients, users, gejala, image, model_type, model_version} = diagnosisId
    return (
        <div>
            <p>Result {id}</p>
            <p>nama: {patients.fullName}</p>
        </div>
    )
}

export default ResultId
