export default function (context) {
  const get = api.bind(context, "get");
  const post = api.bind(context, "post");
  const patch = api.bind(context, "patch");
  return Object.assign({}, context, {
    issues: {
      list: (query, repository = context.repository) =>
        get(`/repos/${repository}/issues${objectToQueryString(query)}`),
      update: (issue, data, repository = context.repository) =>
        patch(`/repos/${repository}/issues/${issue}`, data),
      close: (issue, repository = context.repository) =>
        patch(`/repos/${repository}/issues/${issue}`, {
          state: "closed",
        }),
    },
    milestones: {
      create: (title, repository = context.repository) =>
        post(`/repos/${repository}/milestones`, { title }),
      close: (milestone, repository = context.repository) =>
        patch(`/repos/${repository}/milestones/${milestone}`, {
          state: "closed",
        }),
    },
    releases: {
      create: (data, repository = context.repository) =>
        post(`/repos/${repository}/releases`, data),
    },
  });
}

async function api(method, url, data) {
  const response = await fetch(`${this.api_url}${url}`, {
    method: method.toUpperCase(),
    headers: {
      Authorization: `token ${this.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`API error: ${JSON.stringify(response)}`);
  return await response.json();
}

function objectToQueryString(obj) {
  if (!obj || Object.keys(obj).length === 0) return "";
  return (
    "?" +
    Object.entries(obj)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}
