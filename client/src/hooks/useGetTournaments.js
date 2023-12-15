import { useEffect, useState } from "react";

const useGetTournaments = () => {
  const [savedTournamentData, setSavedTournamentData] = useState(null);

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
