import React , { useContext } from 'react';
import CharacterCard from './Charactercard';
import APIContext from './context/ApiContext';

export default function Characters() {

  const context = useContext(APIContext);
  const characters = context[3]

  const results = characters.sort((a, b) => a.name.localeCompare(b.name));

  const showCharacters = () => {
    if(characters.length === 0){
      return (
        <div className='flex flex-row justify-center items-center text-3xl'>
          <p className='font-Urbanist uppercase'>
            Nothing found
          </p>
        </div>
      )
    }else{
      return(
        <div className='flex flex-row justify-center flex-wrap items-center gap-3 pt-5 px-10 bg-ECF0F1'>
          {
            results.map((index) => {
                return <CharacterCard key={index.name} {...index} />
            })
          }
        </div>
      )
    }
  }
  
  return (
    <div>
      {
        showCharacters()
      }
    </div>
  );
}
