import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditinstansi } from "../../services/apiInstansi";

export function useCreateInstansi(){
    const queryClient = useQueryClient()

    const {mutate: createInstansi, isPending: isCreateInstansi} = useMutation({
        mutationFn: createEditinstansi,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['instansis']
            })
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {createInstansi, isCreateInstansi}
}