import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, toggleTodo, removeTodo, updateTodo } from "../redux/actions";
import { Button } from "./ui/button";

export default function Todo() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleUpdateTodo = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const handleSaveUpdate = () => {
    if (editInput.trim()) {
      dispatch(updateTodo(editId, editInput));
      setEditId(null);
      setEditInput("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          className="border p-2 mr-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="ghost"
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="mr-2"
            />
            {editId === todo.id ? (
              <input
                type="text"
                className="border p-2 mr-2"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            )}
            {editId === todo.id ? (
              <button
                className="ml-2 text-green-500"
                onClick={handleSaveUpdate}
              >
                Save
              </button>
            ) : (
              <button
                className="ml-2 text-yellow-500"
                onClick={() => handleUpdateTodo(todo.id, todo.text)}
              >
                Edit
              </button>
            )}
            <button
              className="ml-2 text-red-500"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
