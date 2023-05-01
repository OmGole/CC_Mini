import React, { useEffect } from 'react'
import {Card, Button} from '@aws-amplify/ui-react';
import {API} from 'aws-amplify'
import {MdDelete} from 'react-icons/md';

function Single({todo}) {
  const handleDelete = (e) => {
    e.preventDefault();
    API.del('todosapi',`/todo/${todo.name}`);
  }


  return (
    <><div className='md:flex'>
        <div className='flex basis-1/4'>
          <div className='py-4'>
            <h2 className='text-l font-semibold hidden md:block'>{todo.name.toUpperCase()}</h2>
          </div>
        </div>
    </div>
    <hr className='border border-secondary' /><div>
      </div></>
  )
}

export default Single