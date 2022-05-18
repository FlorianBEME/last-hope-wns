import { gql } from "@apollo/client";

const LAUNCHES_PAST = gql`
  query launchesPast {
    launchesPast(limit: 10) {
      launch_date_local
      mission_name
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
    }
  }
`;

export default LAUNCHES_PAST;