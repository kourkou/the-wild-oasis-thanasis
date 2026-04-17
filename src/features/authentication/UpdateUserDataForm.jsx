import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 18rem 1fr;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.4rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--color-grey-500);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--color-red-700);
  margin-top: 0.4rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isLoading } = useUpdateUser();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.user_metadata?.fullName ?? "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.user_metadata?.fullName ?? "",
    });
    setAvatar(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [user, reset]);

  function onSubmit({ fullName }) {
    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          reset({ fullName });
          setAvatar(null);

          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      },
    );
  }

  function handleCancel() {
    reset({
      fullName: user?.user_metadata?.fullName ?? "",
    });
    setAvatar(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" value={user?.email ?? ""} disabled />
      </FormRow>

      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <div>
          <Input
            id="fullName"
            type="text"
            disabled={isLoading}
            {...register("fullName", {
              required: "This field is required",
            })}
          />
          {errors.fullName && <Error>{errors.fullName.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="avatar">Avatar image</Label>

        <AvatarRow>
          <FileName>{avatar?.name || "No file selected"}</FileName>

          <HiddenFileInput
            ref={fileInputRef}
            id="avatar"
            type="file"
            accept="image/*"
            disabled={isLoading}
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
          />

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            Upload photo
          </Button>
        </AvatarRow>
      </FormRow>

      <ButtonRow>
        <Button
          variation="secondary"
          type="button"
          disabled={isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update account"}
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default UpdateUserDataForm;
