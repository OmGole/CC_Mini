import React,{useEffect,useState} from 'react'
import {API} from 'aws-amplify'

function Home({signOut, user}) {
  const [name,setName] = useState("");
  const [todos,setTodos] = useState([1]);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(name,"add");
  }

  useEffect(() => {
    API.get('todosapi','/todo').then(res => setTodos(res)).catch((err) => console.log(err));
  },[name]);

  useEffect(() => {
    console.log(todos);
  },[todos])
  return (
    <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
          <button onClick={handleAdd}>Add</button>
        </main>
  )
}

export default Home