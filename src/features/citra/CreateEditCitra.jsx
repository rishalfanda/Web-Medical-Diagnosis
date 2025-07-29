import { Controller, useForm } from "react-hook-form";
import Button from "../../components/ui/ButtonStyledComponents";
import FileInput from "../../components/ui/FileInput";
import Form from "../../components/ui/Form";
import FormDataset from "../../components/ui/FormDataset";
import FormRow from "../../components/ui/FormRow";
import FormRowDataset from "../../components/ui/FormRowDataset";
import Input from "../../components/ui/Input";
import InputDataset from "../../components/ui/InputDataset";
import Select from "../../components/ui/Select";
import { useCreateCitra } from "../../hooks/citra/useCreateCitra";
import { useEditCitra } from "../../hooks/citra/useEditCitra";
import useAuthStore from "../../store/authStore";
import SelectUser from "../../components/SelectUser";

function CreateEditCitra({citraToEdit = {}, onCloseModal}) {
    const role = useAuthStore((state) => state.role)
    const isAdminOrSuperadmin = role === "admin" || role === "superadmin";

    const {createCitra, isCreateCitra} = useCreateCitra()
    const {editCitra, isEditCitra} = useEditCitra()

    const {id: editId, ...editValues} = citraToEdit
    const isEditSession = Boolean(editId)
    const { register, handleSubmit, reset, formState, control } = useForm({
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
            isAdminOrSuperadmin ? (
            <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
            >
            <FormRow label="Image Code" error={errors?.kode_citra?.message}>
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
                <Controller
                    name="diagnosis"
                    control={control}
                    render={({ field }) => (
                    <Select
                        id="diagnosis"
                        options={[
                        {value: '', label: 'Select Diagnosis'},
                        { value: 'TB', label: 'TB' },
                        { value: 'Non-TB', label: 'Non-TB' },
                        ]}
                        disabled={isWorking}
                        value={field.value}
                        onChange={field.onChange}
                    />
                    )}
                />
            </FormRow>

            <FormRow label="Image File">
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
            <FormRowDataset label="Image Code" error={errors?.kode_citra?.message}>
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
                <Controller
                    name="diagnosis"
                    control={control}
                    render={({ field }) => (
                    <SelectUser
                        id="diagnosis"
                        options={[
                        {value: '', label: 'Select Diagnosis'},
                        { value: 'TB', label: 'TB' },
                        { value: 'Non-TB', label: 'Non-TB' },
                        ]}
                        disabled={isWorking}
                        value={field.value}
                        onChange={field.onChange}
                    />
                    )}
                />
            </FormRowDataset>

            <FormRowDataset label="Image File">
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
                    {
                    isWorking ? "Memproses..." :
                    isEditSession ? "Edit Image" : "Upload"
                    }
                </Button>
            </FormRowDataset>
        </FormDataset>
            )
        }
        </>
    )
}

export default CreateEditCitra
