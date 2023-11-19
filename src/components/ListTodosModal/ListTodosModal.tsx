import React from "react";
import "./ListTodosModal.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../store/modalSlice";
import { LIST_TODOS_MODAL } from "../../store/types";
import { TodoItem } from "../TodoItem";

export const ListTodosModal = () => {
  const dispatch = useAppDispatch();
  const dayData = useAppSelector((state) => state.selectedDay);
  return (
    <div
      className="list-modal"
      onClick={() => dispatch(closeModal(LIST_TODOS_MODAL))}
    >
      <div className="list-modal__body" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={() => dispatch(closeModal(LIST_TODOS_MODAL))}
          className="modal__close-modal-button"
        >
          <div className="list-modal__close-modal-button-item-1"></div>
          <div className="list-modal__close-modal-button-item-2"></div>
        </div>
        <h3 className="list-modal__body-title">
          TODOs of {dayData.selectedDay}
        </h3>
        {dayData.selectedDayTodos.length > 0 ? (
          <div className="list-modal__todo-wrapper">
            <ul className="list-modal__todo-list">
              {dayData.selectedDayTodos.map((todo) => {
                return (
                  <li key={todo.id} className="list-modal__todo-item">
                    <TodoItem title={todo.title} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          "No TODOs for this day"
        )}
      </div>
    </div>
  );
};
