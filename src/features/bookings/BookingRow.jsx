import { format, isToday } from "date-fns";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEffect, useRef, useState } from "react";
import {
  HiEllipsisVertical,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
const statusStyles = {
  unconfirmed: css`
    color: var(--color-blue-700);
    background-color: var(--color-blue-100);
  `,
  "checked-in": css`
    color: var(--color-green-700);
    background-color: var(--color-green-100);
  `,
  "checked-out": css`
    color: var(--color-silver-700);
    background-color: var(--color-silver-100);
  `,
};

const Cabin = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
  font-family: "Sono";
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.1rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
`;

const Status = styled.span`
  display: inline-block;
  justify-self: start;
  width: fit-content;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;

  ${(props) => statusStyles[props.$status]}
`;

/////Menu
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
export default function BookingRow({ booking }) {
  const {
    cabinName,
    guestName,
    guestEmail,
    startDate,
    status,
    totalPrice,
    numNights,
  } = booking;

  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { checkoutMutation, isLoading: isCheckingOut } = useCheckout();
  const { deleteBookingMutation, isLoading: isDeleting } = useDeleteBooking();
  function handleCheckout() {
    setShowMenu(false);
    checkoutMutation(booking.id);
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setShowMenu(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function handleSeeDetails() {
    setShowMenu(false);
    navigate(`/bookings/${booking.id}`);
  }

  function handleCheckIn() {
    setShowMenu(false);
    navigate(`/checkin/${booking.id}`);
  }

  function handleDelete() {
    setShowMenu(false);
    setShowDeleteModal(true);
  }

  function handleConfirmDeletion() {
    deleteBookingMutation(booking.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setShowMenu(false);
      },
    });
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : format(new Date(startDate), "MMM dd yyyy")}
          &rarr; {numNights} night stay
        </span>
      </Stacked>
      <Status $status={status}>{status.replaceAll("-", " ")}</Status>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Actions ref={menuRef}>
        <MenuButton
          type="button"
          onClick={() => setShowMenu((show) => !show)}
          disabled={isCheckingOut || isDeleting}
        >
          <HiEllipsisVertical />
        </MenuButton>

        {showMenu && (
          <Menu>
            <li>
              <MenuItem type="button" onClick={handleSeeDetails}>
                <HiEye />
                <span>See details</span>
              </MenuItem>
            </li>

            {status === "unconfirmed" && (
              <li>
                <MenuItem type="button" onClick={handleCheckIn}>
                  <HiArrowUpOnSquare />
                  <span>Check in</span>
                </MenuItem>
              </li>
            )}

            {status === "checked-in" && (
              <li>
                <MenuItem type="button" onClick={handleCheckout}>
                  <HiArrowDownOnSquare />
                  <span>Check out</span>
                </MenuItem>
              </li>
            )}

            <li>
              <MenuItem type="button" onClick={handleDelete}>
                <HiTrash />
                <span>Delete</span>
              </MenuItem>
            </li>
          </Menu>
        )}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <ConfirmDelete
              onConfirm={handleConfirmDeletion}
              onClose={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            />
          </Modal>
        )}
      </Actions>
    </Table.Row>
  );
}
