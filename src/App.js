import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [editValue, setEditValue] = useState("");

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const addTodoList = (event) => {
    console.log("events", event, event.type);
    if (event.type === "click") {
      setTodoList((oldTodoList) => [...oldTodoList, inputValue]);
      setInputValue("");
    }
    console.log(event.keyCode);
    if (event.type === "keydown" && event.keyCode === 13) {
      setTodoList((oldTodoList) => [...oldTodoList, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newTodoList = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1)
    ];
    setTodoList(newTodoList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todoList[index]);
  };

  const handleEditChange = ({ target: { value } }) => {
    setEditValue(value);
  };

  const handleEditSave = (index) => {
    const newTodoList = [
      ...todoList.slice(0, index),
      editValue,
      ...todoList.slice(index + 1)
    ];
    setTodoList(newTodoList);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <>
      <header>
        <h1> Todo App using React Hooks </h1>
      </header>
      <main>
        <section>
          <label htmlFor="todo"></label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={inputValue}
            onChange={onChange}
            onKeyDown={addTodoList}
          />
          <button type="submit" onClick={addTodoList}>
            Add Todo
          </button>
        </section>
        <section>
          <ul>
            {todoList.map((todoItem, index) => {
              return (
                <li key={todoItem}>
                  {editIndex === index ? (
                    <>
                      <label htmlFor="editTodo"></label>
                      <input
                        id="editTodo"
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                      />
                      <button onClick={() => handleEditSave(index)}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <strong>{todoItem}</strong>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
