import { useQuery } from "@tanstack/react-query";
import { getDiagnosis } from "../../services/apiDiagnosis";

export function useGetDiagnosis(){
    const {isPending: isGetDiagnosis, data: diagnosis} = useQuery({
        queryKey: ['diagnosis'],
        queryFn: getDiagnosis
    })

    return {isGetDiagnosis, diagnosis}
}