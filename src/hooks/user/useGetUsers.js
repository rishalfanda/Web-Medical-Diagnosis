import { useQuery } from "@tanstack/react-query";
import { getUsers as getAllUser } from "../../services/apiUsers";

export function useGetUsers(){
    const {isPending, data: user} = useQuery({
        queryKey: ['users'],
        queryFn: getAllUser
    })

    return {isPending, user}
}