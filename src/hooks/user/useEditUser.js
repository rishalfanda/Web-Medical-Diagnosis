import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../services/apiUsers";

export function useEditUser(){
    const queryClient = useQueryClient()
    const {mutate: editUser, isPending: isEditing} = useMutation({
        mutationFn: ({newUserData, id}) => createEditUser(newUserData, id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {editUser, isEditing}
}