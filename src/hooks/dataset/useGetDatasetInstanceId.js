import { useQuery } from "@tanstack/react-query";
import { getDatasetsInstanceId } from "../../services/apiDataset";

export function useGetDatasetsInstanceId(InstanceId){
    const {isPending: isGetting, data: datasetsInstanceId, error} = useQuery({
        queryKey: ["datasetsinstanceid"],
        queryFn: () => getDatasetsInstanceId(InstanceId),
        retry: false
    })

    return {isGetting, datasetsInstanceId, error}
}