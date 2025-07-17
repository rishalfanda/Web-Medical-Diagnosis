import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCitra } from "../../services/apiCitra";

export function useGetCitra(){
    const {datasetId} = useParams()
    const {isPending: isGetCitra, data: citra} = useQuery({
        queryKey: ["citras"],
        queryFn: () => getCitra(datasetId),
        retry: false
    })

    return {isGetCitra, citra}
}