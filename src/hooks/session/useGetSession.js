import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiDiagnosis";

export function useGetSession(){
    const {isPending: isGetSession, data: session} = useQuery({
        queryKey: ['session'],
        queryFn: getSession
    })

    return{session, isGetSession}
}