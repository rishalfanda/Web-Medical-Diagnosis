import { useForm } from "react-hook-form";
import Button from "../../components/ui/ButtonStyledComponents";
import FormDataset from "../../components/ui/FormDataset";
import FormRowDataset from "../../components/ui/FormRowDataset";
import InputDataset from "../../components/ui/InputDataset";
import { useCreateDataset } from "../../hooks/dataset/useCreateDataset";
import { useEditDataset } from "../../hooks/dataset/useEditDataset";

function CreateEditDataset({datasetToEdit = {}, onCloseModal}) {
    const {createDataset, isCreateDataset} = useCreateDataset()
    const {editDataset, isEditDataset} = useEditDataset()

    const {id: editId, ...editValues} = datasetToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { errors } = formState;

    const isWorking = isCreateDataset || isEditDataset

    function onSubmit(data){
        if(isEditSession){
            editDataset(
                {newDataset: {...data}, id: editId},
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.()
                    }
                }
            )
        }else{
            createDataset(
                {...data},
                {
                    onSuccess: (data) =>{
                        reset();
                        onCloseModal?.()
                    }
                }
            )
        }
    }
    return (
        <FormDataset
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
            >
            <FormRowDataset label="Nama Dataset" error={errors?.nama_dataset?.message}>
                <InputDataset
                type="text"
                id="nama_dataset"
                disabled={isWorking}
                {...register("nama_dataset", {
                    required: "this field is required",
                })}
                />
            </FormRowDataset>

            <FormRowDataset label="Lokasi" error={errors?.lokasi?.message}>
                <InputDataset
                type="text"
                id="lokasi"
                disabled={isWorking}
                {...register("lokasi", {
                    required: "this field is required",
                })}
                />
            </FormRowDataset>

            <FormRowDataset>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    $size="medium"
                    $type="reset"
                    $design="modal"
                    onClick={() => onCloseModal?.()}
                >
                Cancel
                </Button>
                <Button $variation="indigo" $size="medium" disabled={isWorking}>
                {isEditSession ? "Edit Dataset" : "Create Dataset"}
                </Button>
            </FormRowDataset>
        </FormDataset>
    )
}

export default CreateEditDataset
