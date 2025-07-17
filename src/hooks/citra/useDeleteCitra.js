import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCitra as deleteCitraApi} from "../../services/apiCitra";

export function useDeleteCitra(){
    const queryClient = useQueryClient()

    const {mutate: deleteCitra, isPending: isDeleteCitra} = useMutation({
        mutationFn: deleteCitraApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({active : true})
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {deleteCitra, isDeleteCitra}
}