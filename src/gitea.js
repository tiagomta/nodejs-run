export default function (context) {
  return Object.assign({}, context, {});
}

async function request(context) {
  const response = await fetch(
    `${context.api_url}/repos/${repository}/issues/${issue.slice(1)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
}
