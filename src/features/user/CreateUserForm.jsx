import { useForm } from "react-hook-form";

import Button from "../../components/ui/ButtonStyledComponents";
import FileInput from "../../components/ui/FileInput";
import Form from "../../components/ui/Form";
import FormRow from "../../components/ui/FormRow";
import Input from "../../components/ui/Input";
import { useCreateUser } from "../../hooks/user/useCreateUser";
import { useEditUser } from "../../hooks/user/useEditUser";


function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const { createUser, isCreating } = useCreateUser();
  const { editUser, isEditing } = useEditUser();

  const { id: editId, ...editValues } = userToEdit;

  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.avatar === "string" ? data.avatar : data.avatar[0];

    console.log(editId);
    if (isEditSession)
      editUser(
        { newUserData: { ...data, avatar: image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createUser(
        { ...data, avatar: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isWorking}
          {...register("email", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="phone" error={errors?.phone?.message}>
        <Input
          type="number"
          id="phone"
          disabled={isWorking}
          {...register("phone", {
            required: "this field is required",
            min: {
              value: 1,
              message: "phone should be atleast one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Avatar">
        <FileInput
          id="avatar"
          accept="image/*"
          {...register("avatar", {
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
          {isEditSession ? "Edit user" : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
