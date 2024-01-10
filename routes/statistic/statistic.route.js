async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("http://172.31.208.1:8080/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const operationsDoc = `
  query MyQuery {
    people_count {
      employee
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    console.error(errors);
  }

  console.log(data);

  return data;
}
