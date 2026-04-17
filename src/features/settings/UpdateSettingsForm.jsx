import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

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

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--color-red-700);
  margin-top: 0.4rem;
`;

function UpdateSettingsForm() {
  const { settings, isLoading: isLoadingSettings, error } = useSettings();
  const {
    updateSettingsMutation,
    isLoading: isUpdatingSettings,
    error: updateError,
  } = useUpdateSettings();

  if (isLoadingSettings) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  const currentSettings = settings?.data?.[0];

  if (!currentSettings) return <Error>No settings found.</Error>;

  function handleUpdate(field, value) {
    if (value === "") return;

    updateSettingsMutation({
      [field]: Number(value),
    });
  }

  return (
    <Form>
      <FormRow>
        <Label htmlFor="minBookingLength">Min nights/booking</Label>
        <Input
          id="minBookingLength"
          type="number"
          defaultValue={currentSettings.minBookingLength}
          onBlur={(e) => handleUpdate("minBookingLength", e.target.value)}
          disabled={isUpdatingSettings}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxBookingLength">Max nights/booking</Label>
        <Input
          id="maxBookingLength"
          type="number"
          defaultValue={currentSettings.maxBookingLength}
          onBlur={(e) => handleUpdate("maxBookingLength", e.target.value)}
          disabled={isUpdatingSettings}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxGuestsPerBooking">Max guests/booking</Label>
        <Input
          id="maxGuestsPerBooking"
          type="number"
          defaultValue={currentSettings.maxGuestsPerBooking}
          onBlur={(e) => handleUpdate("maxGuestsPerBooking", e.target.value)}
          disabled={isUpdatingSettings}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="breakfastPrice">Breakfast price</Label>
        <Input
          id="breakfastPrice"
          type="number"
          defaultValue={currentSettings.breakfastPrice}
          onBlur={(e) => handleUpdate("breakfastPrice", e.target.value)}
          disabled={isUpdatingSettings}
        />
      </FormRow>

      {updateError && <Error>{updateError.message}</Error>}
    </Form>
  );
}

export default UpdateSettingsForm;
