import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import Table from "../../ui/Table";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import { formatCurrency } from "../../helpers/formatCurrency";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Capacity = styled.div`
  color: var(--color-grey-500);
`;

const Price = styled.div`
  font-weight: 600;
  font-family: "Sono";
`;

const Discount = styled.div`
  font-weight: 400;
  color: var(--color-green-700);
  font-family: "Sono";
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-700);
  }
`;

const Menu = styled.ul`
  position: absolute;
  right: 3.2rem;
  top: 0;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  box-shadow: var(--shadow-md);
  min-width: 16rem;
  overflow: hidden;
  z-index: 1000;
`;

const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 1.6rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-500);
  }
`;

function CabinRow({ cabin, onEditCabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const {
    deleteCabinMutation,
    isLoading: isDeleting,
    error,
  } = useDeleteCabin();

  const { createCabinMutation, isLoading: isDuplicating } = useCreateCabin();
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setShowMenu(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function handleActionClick() {
    setShowMenu(false);
  }

  function handleDelete() {
    deleteCabinMutation(cabin.id, {
      onSuccess: () => setShowMenu(false),
      onError: (err) => alert(err.message),
    });
  }

  function handleDuplicate() {
    const duplicatedCabin = {
      name: `${cabin.name} copy-${String(Date.now()).slice(-4)}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image,
    };

    createCabinMutation(duplicatedCabin, {
      onSuccess: () => setShowMenu(false),
      onError: (err) => alert(err.message),
    });
  }
  return (
    <Table.Row>
      <Img src={image} alt={`Cabin ${name}`} />
      <Cabin>{name}</Cabin>
      <Capacity>Fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? `${formatCurrency(discount)}` : "-"}</Discount>

      <Actions ref={menuRef}>
        <MenuButton type="button" onClick={() => setShowMenu((show) => !show)}>
          <HiEllipsisVertical />
        </MenuButton>

        {showMenu && (
          <Menu>
            <li>
              <MenuItem
                type="button"
                onClick={handleDuplicate}
                disabled={isDuplicating}
              >
                <HiSquare2Stack />
                <span>{isDuplicating ? "Duplicating..." : "Duplicate"}</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem
                type="button"
                onClick={() => {
                  onEditCabin(cabin);
                  setShowMenu(false);
                }}
              >
                <HiPencil />
                <span>Edit</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <HiTrash />
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </MenuItem>
            </li>
          </Menu>
        )}
      </Actions>
    </Table.Row>
  );
}

export default CabinRow;
