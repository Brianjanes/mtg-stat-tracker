import { useEffect, useState } from "react";

const useGetTournaments = () => {
  const [savedTournamentData, setSavedTournamentData] = useState(null);

  //can't use uuseUser in this component because it isn't a child if clerk provider and does not have scope of clerk provider but I think it can take the user email as a prop?

  useEffect(() => {
    fetch("/get-tournaments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setSavedTournamentData(data.data);
      });
  }, []);

  return savedTournamentData;
};

export default useGetTournaments;
