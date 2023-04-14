import React , { useState , useContext , useTransition } from 'react';
import APIContext from './context/ApiContext';

export default function SearchBar() {
  
  const context = useContext(APIContext);
  const lastChangesData = context[1]
  const setLastChangesData = context[2]
  const setCharacters = context[4]

  const [inputValue , setInputValue] = useState('');

  const [isPending , startTransition] = useTransition();
  
  return (
    <div>
      <input
        className='w-full h-10 text-lg font-Urbanist pl-2 rounded border-2 border-inherit outline-none uppercase placeholder-black'
        placeholder='Search'
        type={'text'}
        value={inputValue}
        onChange={(e) => {
            const query = e.target.value.replace(/[^a-z]/gi, '').toLocaleUpperCase()
            
            setInputValue(query)
            const filter = lastChangesData.filter((index) => {
                return index.name.toUpperCase().indexOf(query) !== -1
            })
            
            startTransition(() => {
              setCharacters(filter)
            })

            query.length === 0 && setLastChangesData(lastChangesData);
        }}
      />
    </div>
  );
}

