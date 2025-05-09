import { useQuery } from "@tanstack/react-query";

export function useGetUser(){
    const {isPending, data: user} = useQuery()
}