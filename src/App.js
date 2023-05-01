import { Amplify, API } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./aws-exports";
import "./App.css";
import { useEffect, useState } from "react";
import Single from "./Single";

Amplify.configure(config);

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(name, "add");
    API.post("todosapi", "/todo", {
      body: {
        name: name,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    API.get("todosapi", "/todo/name")
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="container mx-auto">
          <div className="flex justify-center mt-10">
          <h2 className='text-3xl mb-5 text-center font-poppins'>Hello {user.username}</h2>
          <button
              id="add"
              className="block ml-10 bg-secondary text-white py-1 px-5 rounded-full hover:bg-white hover:text-secondary border-2 border-secondary transition duration-200 box-border text-l mb-5 font-poppins"
              onClick={signOut}
            >
              SignOut
            </button>
          </div>

          <form action="" className="font-montserrat  text-sm">
            <div className="mb-3">
              <input
                type="text"
                className="border-2 rounded-xl py-1 px-3 w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              id="add"
              className="block w-full bg-secondary text-white py-1 px-5 rounded-full hover:bg-white hover:text-secondary border-2 border-secondary transition duration-200 box-border text-l mb-5 font-poppins"
              onClick={handleAdd}
            >
              Add
            </button>
          </form>
          
          {todos.map((todo) => (
            <Single todo={todo} />
          ))}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
