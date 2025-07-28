import { Controller, useForm } from "react-hook-form";
import Button from "../../components/ui/ButtonStyledComponents";
import FormDataset from "../../components/ui/FormDataset";
import FormRowDataset from "../../components/ui/FormRowDataset";
import InputDataset from "../../components/ui/InputDataset";
import { useCreateDataset } from "../../hooks/dataset/useCreateDataset";
import { useEditDataset } from "../../hooks/dataset/useEditDataset";
import useAuthStore from "../../store/authStore";
import Form from "../../components/ui/Form";
import FormRow from "../../components/ui/FormRow";
import Input from "../../components/ui/Input";
import { useGetInstansi } from "../../hooks/instansi/useGetInstansi";
import Select from "../../components/ui/Select";

function CreateEditDataset({datasetToEdit = {}, onCloseModal}) {
    const role = useAuthStore((state) => state.role)
    const instance_id = useAuthStore((state) => state.instance_id)
    const isAdminOrSuperadmin = role === "admin" || role === "superadmin";

    const {instansi, isGetInstansi} = useGetInstansi()
    const instansiOptions = Array.isArray(instansi)
        ? instansi.map((item) => ({ value: item.id, label: item.name }))
        : [];

    const {createDataset, isCreateDataset} = useCreateDataset()
    const {editDataset, isEditDataset} = useEditDataset()

    const {id: editId, ...editValues} = datasetToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, formState, control } = useForm({
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
        <> 
        {
            isAdminOrSuperadmin ?(
            <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
            >
            <FormRow label="Nama Dataset" error={errors?.nama_dataset?.message}>
                <Input
                type="text"
                id="nama_dataset"
                disabled={isWorking}
                {...register("nama_dataset", {
                    required: "this field is required",
                })}
                />
            </FormRow>

            <FormRow label="Lokasi" error={errors?.lokasi?.message}>
                <Input
                type="text"
                id="lokasi"
                disabled={isWorking}
                {...register("lokasi", {
                    required: "this field is required",
                })}
                />
            </FormRow>
            
            {role == "superadmin" ? (
                <FormRow label="Instansi"> 
                {isGetInstansi ? (
                    <p>Loading instansi...</p>
                ) : (
                    <Controller
                    name="instance_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                        id="instance_id"
                        options={instansiOptions}
                        disabled={isWorking}
                        value={field.value}
                        onChange={field.onChange}
                        />
                    )}
                    />
                )}
                </FormRow>
            ) : (
                <Controller
                name="instance_id"
                control={control}
                defaultValue={instance_id}
                render={({ field }) => (
                    <input type="hidden" {...field} value={instance_id} />
                )}
                />
            )}

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
                {isEditSession ? "Edit Dataset" : "Create Dataset"}
                </Button>
            </FormRow>
        </Form>
            ):(
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
                    {isWorking
                        ? "Memproses..."
                        : isEditSession
                        ? "Edit Dataset"
                        : "Create Dataset"}
                </Button>

            </FormRowDataset>
        </FormDataset>
            )
            
        }
    </>
    )
}

export default CreateEditDataset
