import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createEditCitra } from "../../services/apiCitra";

export function useEditCitra(){
  const { datasetId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: editCitra, isPending: isEditCitra } = useMutation({
    mutationFn: ({ id, newCitra }) =>
      createEditCitra(datasetId, id, newCitra),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citras"] });
    },
    onError: (err) => {
      throw new Error(err.message);
    }
  });

  return { editCitra, isEditCitra };
}
