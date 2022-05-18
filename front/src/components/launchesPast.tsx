/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import LAUNCHES_PAST from "../queries/QueryLaunchesPast";

const testSpaceX = ():any => {
    const { loading, error, data } = useQuery(LAUNCHES_PAST);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return data.launchesPast.map(({launch_date_local, mission_name, rocket}:any) => (
      <div key={mission_name}>
        <p>
          {launch_date_local}
        </p>
        <p>
            {mission_name}
        </p>
        <p>
            {rocket.rocket_name}
        </p>
      </div>
    ));
}

export default testSpaceX;