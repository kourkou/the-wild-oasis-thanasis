import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useCreateCabin from "./useCreateCabin";
import { useEffect, useRef, useState } from "react";
import useUpdateCabin from "./useUpdateCabin";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FormRow = styled.div`
  display: grid;
  width: 70%;
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
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-grey-200);
  border-radius: 6px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  min-height: 10rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-grey-500);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--color-red-700);
  margin-top: 0.4rem;
`;

const ImageRow = styled.div`
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

function CreateCabinForm({ onClose, cabinToEdit }) {
  const isEditSession = Boolean(cabinToEdit);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? cabinToEdit : {} });

  useEffect(
    function () {
      reset(isEditSession ? cabinToEdit : {});
      setImageFile(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [cabinToEdit, isEditSession, reset],
  );

  const {
    createCabinMutation,
    isLoading: isCreatingCabin,
    error,
  } = useCreateCabin();
  const { updateCabinMutation, isLoading: isUpdatingCabin } = useUpdateCabin();

  const isWorking = isEditSession ? isUpdatingCabin : isCreatingCabin;

  function onSubmit(data) {
    if (!isEditSession && !imageFile) return;

    const newCabin = {
      name: data.name.trim(),
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount),
      description: data.description.trim(),
      image: imageFile ?? cabinToEdit?.image ?? "/cabins/cabin-001.jpg",
    };

    if (isEditSession) {
      updateCabinMutation(
        { ...newCabin, id: cabinToEdit.id },
        {
          onSuccess: () => {
            reset();
            setImageFile(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
            onClose();
          },
        },
      );
      return;
    }

    createCabinMutation(newCabin, {
      onSuccess: () => {
        reset();
        setImageFile(null);

        if (fileInputRef.current) fileInputRef.current.value = "";
        onClose();
      },
    });
  }

  function handleCancel() {
    reset(isEditSession ? cabinToEdit : {});
    setImageFile(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <div>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <div>
          <Input
            id="maxCapacity"
            type="number"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
          {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <div>
          <Input
            id="regularPrice"
            type="number"
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Price should be at least 1",
              },
            })}
          />
          {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <div>
          <Input
            id="discount"
            type="number"
            defaultValue={0}
            {...register("discount", {
              required: "This field is required",
              min: {
                value: 0,
                message: "Discount should be at least 0",
              },
              validate: (value) =>
                Number(value) < Number(getValues().regularPrice) ||
                "Discount should be less than regular price",
            })}
          />
          {errors.discount && <Error>{errors.discount.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <div>
          <Textarea
            id="description"
            {...register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && <Error>{errors.description.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>

        <div>
          <ImageRow>
            <FileName>
              {imageFile?.name ||
                (typeof cabinToEdit?.image === "string"
                  ? "Current image selected"
                  : "No file selected")}
            </FileName>

            <HiddenFileInput
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              disabled={isWorking}
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />

            <Button
              variation="secondary"
              size="small"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isWorking}
            >
              Upload photo
            </Button>
          </ImageRow>

          {!isEditSession && !imageFile && (
            <Error>This field is required</Error>
          )}
        </div>
      </FormRow>

      <ButtonRow>
        <Button
          variation="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isWorking}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isWorking} variation="primary">
          {isWorking
            ? isEditSession
              ? "Updating..."
              : "Creating..."
            : isEditSession
              ? "Update Cabin"
              : "Create Cabin"}
        </Button>
      </ButtonRow>

      {error && <Error>{error.message}</Error>}
    </Form>
  );
}

export default CreateCabinForm;
