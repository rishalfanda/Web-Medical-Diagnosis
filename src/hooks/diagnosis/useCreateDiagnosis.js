import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiagnosis as createDiagnosisApi } from "../../services/apiDiagnosis";

export function useCreateDiagnosis(){
    const queryClient = useQueryClient()

    const{mutate: createDiagnosis, isPending: isCreating} = useMutation({
        mutationFn: createDiagnosisApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:["diagnosis"]
            })
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return{createDiagnosis, isCreating}
}