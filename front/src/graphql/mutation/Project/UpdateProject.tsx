import { gql } from "@apollo/client";

const UpdateProject = gql`
  mutation Mutation($projectId: String!, $data: UpdatedProjectInput) {
    UpdateProject(projectId: $projectId, data: $data) {
      id
      title
      description
      start_at
      end_at
      product_owner_id
      participants {
        user {
          id
        }
      }
    }
  }
`;
export default UpdateProject;
