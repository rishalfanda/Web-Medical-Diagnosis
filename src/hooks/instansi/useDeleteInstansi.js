import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteInstansi as deleteInstansiApi} from "../../services/apiInstansi"

export function useDeleteInstansi(){
    const queryClient = useQueryClient()

    const {mutate: deleteInstansi, isPending: isDeleteInstansi} = useMutation({
        mutationFn: deleteInstansiApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({active : true})
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {deleteInstansi, isDeleteInstansi}
}