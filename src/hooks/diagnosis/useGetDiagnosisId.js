import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDiagnosisId } from "../../services/apiDiagnosis";

export function useGetDiagnosisId(){
    const {resultId} = useParams()
    const {isPending: isGetting, data: diagnosisId, error} = useQuery({
        queryKey: ["diagnosisid"],
        queryFn: () => getDiagnosisId(resultId),
        retry: false
    })

    return {isGetting, diagnosisId, error}
}