import { useQuery } from "@tanstack/react-query";
import { getUsers as getAllUser } from "../../services/apiUsers";

export function useGetUsers(){
    const { isPending, data: users } = useQuery({
      queryKey: ["users"],
      queryFn: getAllUser,
    });

    return { isPending, users };
}