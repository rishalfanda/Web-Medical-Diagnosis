import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDiagnosisId } from "../../services/apiDiagnosis";

export function useGetDiagnosisId(){
    const {id} = useParams()
    const {isPending: isGetting, data: diagnosisId} = useQuery({
        queryKey: ["diagnosisId"],
        queryFn: () => getDiagnosisId(id),
        retry: false
    })

    return {isGetting, diagnosisId}
}