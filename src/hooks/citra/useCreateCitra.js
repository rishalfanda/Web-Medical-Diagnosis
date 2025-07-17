import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createEditCitra } from "../../services/apiCitra";

export function useCreateCitra(){
  const { datasetId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: createCitra, isPending: isCreateCitra } = useMutation({
    mutationFn: (newCitra) => createEditCitra(datasetId, null, newCitra),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citras"] });
    },
    onError: (err) => {
      throw new Error(err.message);
    }
  });

  return { createCitra, isCreateCitra };
}
