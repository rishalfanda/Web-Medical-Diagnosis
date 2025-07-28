import { useQuery } from "@tanstack/react-query";
import { getUsersInstanceId } from "../../services/apiUsers";

export function useGetUsersInstanceId(InstanceId){
    const {isPending: isGetting, data: usersInstanceId, error} = useQuery({
        queryKey: ["usersinstanceid"],
        queryFn: () => getUsersInstanceId(InstanceId),
        retry: false
    })

    return {isGetting, usersInstanceId, error}
}