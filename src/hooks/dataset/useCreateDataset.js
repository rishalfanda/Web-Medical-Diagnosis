import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDataset } from "../../services/apiDataset";

export function useCreateDataset(){
    const queryClient = useQueryClient()

    const {mutate: createDataset, isPending: isCreateDataset} = useMutation({
        mutationFn: createEditDataset,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['datasets']
            })
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {createDataset, isCreateDataset}
}