import { useQuery } from "@tanstack/react-query";
import { getInstansiById } from "../../services/apiInstansi";

export function useGetInstansiById(instance_id) {
    const {data: instansiById, isPending: isGettingInstansiById} = useQuery({
        queryKey: ["instanceid"],
        queryFn: ()=> getInstansiById(instance_id),
        retry: false
    })

    return {isGettingInstansiById, instansiById}
}