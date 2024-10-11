import React, { useState, useEffect, ReactNode } from "react";

// Interface for Todo
interface Todo {
  id?: number;
  name: string;
}

interface TodoListProps {
  showForm: (todo: Todo) => void;
}

interface TodoFormProps {
  todo: Todo;
  showList: () => void;
}

// Main Todos component
export function Todos() {
  const [content, setContent] = useState<ReactNode>(<TodoList showForm={showForm} />);

  // Function to show todo list
  function showList() {
    setContent(<TodoList showForm={showForm} />);
  }

  // Function to show todo form for creating or editing
  function showForm(todo: Todo) {
    setContent(<TodoForm todo={todo} showList={showList} />);
  }

  return (
    <div className="container my-5">
      {content}
    </div>
  );
}

// TodoList component
function TodoList(props: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from API
  function fetchTodos() {
    fetch("http://localhost:3000/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("unexpected server response");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.log("error: ", error));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // Delete todo
  function deleteTodo(id: number) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTodos())
      .catch((error) => console.log("error: ", error));
  }

  return (
    <>
      <h2 className="text-center mb-3">List of Todos</h2>
      <button
        type="button"
        onClick={() => props.showForm({} as Todo)}
        className="btn btn-primary me-2"
      >
        Create
      </button>
      <button
        type="button"
        onClick={fetchTodos}
        className="btn btn-outline-primary me-2"
      >
        Refresh
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <button
                  onClick={() => props.showForm(todo)}
                  type="button"
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id!)}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// TodoForm component
function TodoForm(props: TodoFormProps) {
  const [errorMessage, setErrorMessage] = useState<ReactNode>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const todo = Object.fromEntries((formData as any).entries()) as unknown as Todo;

    if (!todo.name) {
      setErrorMessage(
        <div className="alert alert-warning" role="alert">
          Please provide the name!
        </div>
      );
      return;
    }

    if (props.todo.id) {
      fetch(`http://localhost:3000/todos/${props.todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => props.showList())
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => props.showList())
        .catch((error) => console.error("Error:", error));
    }
  }

  return (
    <>
      <h2 className="text-center mb-3">
        {props.todo.id ? "Edit Todo" : "Create New Todo"}
      </h2>

      <div className="row">
        <div className="col-lg-6 mx-auto">
          {errorMessage}
          <form onSubmit={handleSubmit}>
            {props.todo.id && (
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">ID</label>
                <div className="col-sm-8">
                  <input
                    readOnly
                    className="form-control-plaintext"
                    name="id"
                    defaultValue={props.todo.id}
                  />
                </div>
              </div>
            )}

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={props.todo.name}
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary btn-sm me-3">
                  Save
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <button
                  type="button"
                  onClick={props.showList}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
