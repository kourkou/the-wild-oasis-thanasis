import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useSignup from "./useSignup";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  border-radius: 12px;
`;

const FormRow = styled.div`
  display: grid;
  width: min(100rem, 100%);
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  width: min(100rem, 100%);
`;

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--color-red-700);
  margin-top: 0.4rem;
`;

function SignupForm() {
  const { signup, isLoading, error } = useSignup();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signup(
      {
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      },
      {
        onSuccess: () => reset(),
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Label htmlFor="email">Email address</Label>
        <div>
          <Input
            id="email"
            type="email"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
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
        <Label htmlFor="passwordConfirm">Repeat password</Label>
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
          type="button"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating user..." : "Create new user"}
        </Button>
      </ButtonRow>

      {error && <Error>{error.message}</Error>}
    </Form>
  );
}

export default SignupForm;
