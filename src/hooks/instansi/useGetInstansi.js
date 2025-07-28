import { useQuery } from "@tanstack/react-query";
import { getInstansi } from "../../services/apiInstansi";

export function useGetInstansi(){
    const {data: instansi, isPending: isGetInstansi} = useQuery({
        queryKey: ['instansis'],
        queryFn: getInstansi
    })

    return {instansi, isGetInstansi}
}