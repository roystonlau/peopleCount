import { gql } from "@urql/core";

const insertIncident = gql`
  mutation insertIncident(
    $incidentType: Int
    $reportedTime: timestamptz
    $status: Int = 1
    $currentProcedure: Int
  ) {
    insert_aohs_incident_list(
      objects: {
        incidentType: $incidentType
        reportedTime: $reportedTime
        status: $status
        currentProcedure: $currentProcedure
      }
    ) {
      affected_rows
    }
  }
`;

const getIncidentType = gql`
  query getIncidentType {
    aohs_procedure_list {
      description
      incidentType
      sop_lists {
        description
        procedureID
      }
    }
  }
`;

export { insertIncident, getIncidentType };
