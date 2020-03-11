import React, {useState} from 'react';
import './App.css';
import { stringify } from 'querystring';

type FormElement = React.FormEvent<HTMLFormElement>;

type CssStyle = React.CSSProperties

interface ITodo {  
  text : string,
  complete: boolean
}

interface ICompleteTodo extends ITodo{
  complete : true
}

const App : React.FC = () : JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElement) : void => {
    e.preventDefault();
    addTodo(value);
    setValue('')
  }

  const addTodo = (text: string) : void => {
    const newTodos : ITodo[] = [...todos, {text, complete : false}];
    setTodos(newTodos)
  }

  const completeTodo  = (index : number) : void => {
    const newTodos : ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index : number) : void => {
    const newTodos : ITodo[] = todos.filter((x, ib) => index !== ib)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} required></input>
        <button type="submit">Add Todo</button>
      </form>
      <section>
          {todos.map((todo : ITodo, index : number) => (
            <React.Fragment key={index}>
              <div style={{textDecoration: todo.complete && "line-through"} as CssStyle}>{todo.text}</div>
              <button type="button" onClick={() => completeTodo(index)}>
                Mark as {todo.complete ? "Incomplete" : "Complete"}
              </button> 
              <button type="button" onClick={()=>removeTodo(index)}>Remove</button>
            </React.Fragment>
          ))}
      </section>
    </div>
  );
}

export default App;
