import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../services/apiUsers";

export function useCreateUser(){
    const queryClient = useQueryClient()
    const {mutate: createUser, isPending: isCreating} = useMutation({
        mutationFn: createEditUser,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {createUser, isCreating}
}