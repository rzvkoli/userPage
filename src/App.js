import React , { useEffect , useState } from "react";
import { request } from 'graphql-request';
import NavBar from "./components/NavBar";
import Characters from "./components/Characters";
import APIContext from "./components/context/ApiContext";
import Loading from "./components/loading/Loading";

function App() {

  const [err , setErr] = useState('');
  const [loading , setLoading] = useState(true);

  const [bigData , setBigData] = useState([]);
  const [lastChangesData , setLastChangesData] = useState('');
  const [characters , setCharacters] = useState('');

  const baseUrl = 'https://rickandmortyapi.com/graphql';

  const rickQuery = `
    query {
      characters(filter: { name: "Rick" })
      {
        results {
          name
          status
        }
      }
    }
    `;

    const mortyQuery  = `
    query {
      characters(filter: { name: "Morty" })
      {
        results {
          name
          status
        }
      }
    }
    `;

  useEffect(() => {

    const fetchApi = async () => {
      const rickResponse = await request(baseUrl, rickQuery);
      const mortyResponse = await request(baseUrl, mortyQuery);
      try{
        setBigData([...rickResponse.characters.results , ...mortyResponse.characters.results]);
        setLastChangesData([...rickResponse.characters.results , ...mortyResponse.characters.results]);
        setCharacters([...rickResponse.characters.results , ...mortyResponse.characters.results]);
        setLoading(false);

      }catch(err){
        setErr(err);
        setLoading(false);
      }
    }

    fetchApi();
    
  }, []);

  return (
    <div className="p-0 m-0 ">
      <div className="max-lg:hidden">
        {
          loading ? (
            <Loading />
          ): err ? (
            <p>{err.message}</p>
          ):(
            <APIContext.Provider value={[bigData , lastChangesData ,  setLastChangesData , characters , setCharacters]}>
                <div>
                  <NavBar />
                  <Characters  />
                </div>
            </APIContext.Provider>
          )
        }
      </div>
      <div className="hidden h-screen w-full max-lg:inline-block">
        <div className="flex flex-col justify-center items-center h-full w-full border-2 border-black">
          <div className="w-6/12 flex flex-col justify-center items-center flex-wrap font-Urbanist uppercase">
            <p className="text-base font-extrabold">
              This page is not optimized for tablets and mobile phones . Please view on desktop or laptop .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;