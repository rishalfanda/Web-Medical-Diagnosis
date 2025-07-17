import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "../../services/apiDataset";

export function useGetDataset(){
    const {isPending: isGetDataset, data: dataset} = useQuery({
        queryKey: ['datasets'],
        queryFn: getDatasets
    })

    return {isGetDataset, dataset}
}