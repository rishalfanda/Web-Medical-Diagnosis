import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiagnosis as deleteDiagnosisApi } from "../../services/apiDiagnosis";

export function useDeleteDiagnosis(){
    const queryClient = useQueryClient()

    const{isPending: isDeleting, mutate: deleteDiagnosis} = useMutation({
        mutationFn: deleteDiagnosisApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({active : true})
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {isDeleting, deleteDiagnosis}
}