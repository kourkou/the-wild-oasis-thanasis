import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";

const StyledForm = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;

  &:focus {
    outline: none;
    border-color: var(--color-grey-500);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("thanasiskourkoutidis@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </StyledForm>
  );
}

export default LoginForm;
