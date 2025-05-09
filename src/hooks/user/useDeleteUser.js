import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi} from "../../services/apiUsers";

export function useDeleteUser(){
    const queryClient = useQueryClient()

    const {isPending: isDeleting, mutate: deleteUser} = useMutation({
        mutationFn: deleteUserApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({active : true})
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {isDeleting, deleteUser}
}