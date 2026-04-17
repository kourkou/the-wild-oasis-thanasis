import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
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

function UpdatePasswordForm() {
  const { updateUser, isLoading } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => reset(),
      },
    );
  }
  function handleCancelPassword() {
    reset({
      password: "",
      passwordConfirm: "",
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="password">New password</Label>
        <div>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Confirm password</Label>
        <div>
          <Input
            id="passwordConfirm"
            type="password"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
          {errors.passwordConfirm && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
        </div>
      </FormRow>

      <ButtonRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={handleCancelPassword}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update password"}
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default UpdatePasswordForm;
