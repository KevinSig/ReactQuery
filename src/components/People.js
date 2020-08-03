import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/ "); //returns promise
  return res.json(); //also returns a promise
};

function People() {
  const { data, status } = useQuery("people", fetchPeople); //useQuery will manage will cache and refetch data // do not to mannually call it later
  //pass in arguments planets is the key, second argument is async function to grab the data
  //useQuery will try to fetch data 3 times before giving an error message

  console.log(data);
  return (
    <div>
      <h2>People</h2>

      {status === "loading" && <div> Loading Data</div>}
      {status === "error" && <div> Error Fetching</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}

export default People;
