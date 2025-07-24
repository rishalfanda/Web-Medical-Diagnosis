import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateUser as postCreateUserApi} from "../../services/apiUsers";

export function usePostCreateUser(){
    const queryClient = useQueryClient()
    const {mutate: postCreateUser, isPending: isPostCreatingUser} = useMutation({
        mutationFn: postCreateUserApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['postuser']
            })
        },
        onError: (err)=>{
            throw new Error(err.message)
        }
    })

    return {postCreateUser, isPostCreatingUser}
}