import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDiagnosis } from "../../services/apiDiagnosis";

export function usePostDiagnosis(){
    const queryClient = useQueryClient()
    const {mutate: isPostData, isPending: isPost, isError} = useMutation({
        mutationFn: postDiagnosis,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ['diagnosis']
            })
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {isPostData, isPost, isError}
}