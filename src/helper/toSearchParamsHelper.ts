export const toSearchParams = (
  query: Record<string, string | string[] | undefined>
) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    }
  }

  return params;
};