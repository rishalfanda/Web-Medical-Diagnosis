import Form from "../../components/ui/Form"
import FormRow from "../../components/ui/FormRow"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/ButtonStyledComponents";
import { useCreateInstansi } from "../../hooks/instansi/useCreateInstansi"
import { useEditInstansi } from "../../hooks/instansi/useEditInstansi"
import { useForm } from "react-hook-form";

function CreateEditInstansi({instansiToEdit = {}, onCloseModal}) {
    const {createInstansi, isCreateInstansi} = useCreateInstansi()
    const {editInstansi, isEditInstansi} = useEditInstansi()

    const {id: editId, ...editValues} = instansiToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { errors } = formState;

    const isWorking = isEditInstansi || isCreateInstansi

    function onSubmit(data){
        if(isEditSession){
            editInstansi(
                {newInstansi: {...data}, id: editId},
                {
                    onSuccess: ()=>{
                        reset()
                        onCloseModal?.()
                    }
                }
            )
        }else{
            createInstansi(
                {...data},
                {
                    onSuccess:() =>{
                        reset()
                        onCloseModal?.()
                    }
                }
            )
        }
    }
    return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nama Instansi" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "this field is required",
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
          {
            isWorking ? "Memproses..." :
            isEditSession ? "Edit Instansi" : "Create new Instansi"
          }
        </Button>
      </FormRow>
    </Form>
    )
}

export default CreateEditInstansi
