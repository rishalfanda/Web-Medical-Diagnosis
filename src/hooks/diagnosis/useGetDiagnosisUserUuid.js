import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDiagnosisUserUuid } from "../../services/apiDiagnosis";

export function useGetDiagnosisUserUuid(UserUuid){
    const {isPending: isGetting, data: diagnosisUserUuid, error} = useQuery({
        queryKey: ["diagnosisuseruuid"],
        queryFn: () => getDiagnosisUserUuid(UserUuid),
        retry: false
    })

    return {isGetting, diagnosisUserUuid, error}
}