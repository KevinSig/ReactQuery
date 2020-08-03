import React, { useState } from "react";
import { useQuery, usePaginatedQuery } from "react-query";
import Planet from "./Planet";
const fetchPlanets = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`); //returns promise
  return res.json(); //also returns a promise
};

function Planets() {
  const [page, setPage] = useState(1);
  const {
    resolvedData, //user will continue seeing the resolved data until the next page is fetched
    latestData,
    status,
  } = usePaginatedQuery(["planets", page], fetchPlanets);

  // const { data, status } = useQuery(["planets", page], fetchPlanets, {
  //   onSuccess: () => console.log("data fetched with no worries ;)"),
  //   staleTime: 2000, //query will remain fresh for 2 seconds before getting stale,
  // });

  //useQuery will manage will cache and refetch data // do not to mannually call it later
  //pass in arguments planets is the key, second argument is async function to grab the data
  //useQuery will try to fetch data 3 times before giving an error message

  console.log(resolvedData);
  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div> Loading Data</div>}
      {status === "error" && <div> Error Fetching</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >{`< Previous`}</button>

          <span>{page}</span>

          <button
            disabled={!latestData || !latestData.next}
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              ) 
            }
          >{`Next >`}</button>

          <div>
            {resolvedData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
