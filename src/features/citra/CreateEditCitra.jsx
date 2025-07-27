import { useForm } from "react-hook-form";
import Button from "../../components/ui/ButtonStyledComponents";
import FileInput from "../../components/ui/FileInput";
import FormDataset from "../../components/ui/FormDataset";
import FormRowDataset from "../../components/ui/FormRowDataset";
import InputDataset from "../../components/ui/InputDataset";
import { useCreateCitra } from "../../hooks/citra/useCreateCitra";
import { useEditCitra } from "../../hooks/citra/useEditCitra";
import useAuthStore from "../../store/authStore";
import Form from "../../components/ui/Form";
import FormRow from "../../components/ui/FormRow";
import Input from "../../components/ui/Input";

function CreateEditCitra({citraToEdit = {}, onCloseModal}) {
    const role = useAuthStore((state) => state.role)
    const isAdminOrNull = role === "admin" || role === null;

    const {createCitra, isCreateCitra} = useCreateCitra()
    const {editCitra, isEditCitra} = useEditCitra()

    const {id: editId, ...editValues} = citraToEdit
    const isEditSession = Boolean(editId)
    const { register, handleSubmit, reset, formState } = useForm({
            defaultValues: isEditSession ? editValues : {},
        });

    const { errors } = formState;

    const isWorking = isCreateCitra || isEditCitra

    function onSubmit(data){
        const image = 
            typeof data.image_citra === "string"
            ? data.image_citra
            : data.image_citra[0]

        const payload = {
            ...data,
            image_citra: image
        }
        console.log(editId)
        if(isEditSession){
            editCitra(
                {newCitra: payload, id: editId},
                {
                    onSuccess: (data) =>{
                        reset()
                        onCloseModal?.()
                    }
                }
            )
        }else{
            createCitra(
                payload,
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
        <>
        {
            isAdminOrNull ? (
            <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
            >
            <FormRow label="Kode Citra" error={errors?.kode_citra?.message}>
                <Input
                type="text"
                id="kode_citra"
                disabled={isWorking}
                {...register("kode_citra", {
                    required: "this field is required",
                })}
                />
            </FormRow>

            <FormRow label="Diagnosis" error={errors?.diagnosis?.message}>
                <Input
                type="text"
                id="diagnosis"
                disabled={isWorking}
                {...register("diagnosis", {
                    required: "this field is required",
                })}
                />
            </FormRow>

            <FormRow label="Image Citra">
                <FileInput
                id="image_citra"
                accept="image/*"
                {...register("image_citra", {
                    required: isEditSession ? false : "this field is required",
                })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    $size="medium"
                    $type="reset"
                    onClick={() => onCloseModal?.()}
                >
                Cancel
                </Button>
                <Button $variation="indigo" $size="medium" disabled={isWorking}>
                    {isEditSession ? "Edit Citra" : "Create Citra"}
                </Button>
            </FormRow>
        </Form>
            ): (
                <FormDataset
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
            >
            <FormRowDataset label="Kode Citra" error={errors?.kode_citra?.message}>
                <InputDataset
                type="text"
                id="kode_citra"
                disabled={isWorking}
                {...register("kode_citra", {
                    required: "this field is required",
                })}
                />
            </FormRowDataset>

            <FormRowDataset label="Diagnosis" error={errors?.diagnosis?.message}>
                <InputDataset
                type="text"
                id="diagnosis"
                disabled={isWorking}
                {...register("diagnosis", {
                    required: "this field is required",
                })}
                />
            </FormRowDataset>

            <FormRowDataset label="Image Citra">
                <FileInput
                id="image_citra"
                accept="image/*"
                {...register("image_citra", {
                    required: isEditSession ? false : "this field is required",
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
                    {isEditSession ? "Edit Citra" : "Create Citra"}
                </Button>
            </FormRowDataset>
        </FormDataset>
            )
        }
        </>
    )
}

export default CreateEditCitra
