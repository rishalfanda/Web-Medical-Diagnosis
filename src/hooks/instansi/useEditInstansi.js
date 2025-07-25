import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditinstansi } from "../../services/apiInstansi";

export function useEditInstansi(){
    const queryClient = useQueryClient()

    const {mutate: editInstansi, isPending: isEditInstansi} = useMutation({
        mutationFn: ({newInstansi, id}) => createEditinstansi(newInstansi, id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['instansis']
            })
        },
        onError: (err) =>{
            throw new Error(err.message)
        }
    })

    return {editInstansi, isEditInstansi}
}