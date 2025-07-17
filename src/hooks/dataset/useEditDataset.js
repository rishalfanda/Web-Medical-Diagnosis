import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDataset } from "../../services/apiDataset";

export function useEditDataset(){
    const queryClient = useQueryClient()

    const{mutate: editDataset, isPending: isEditDataset} = useMutation({
        mutationFn: ({newDataset, id}) => createEditDataset(newDataset, id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['datasets']
            })
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {editDataset, isEditDataset}
}