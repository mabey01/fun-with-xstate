export async function fetchAlphaVantageData<Data>(url: string): Promise<Data> {
  const request = await fetch(url);

  const data = await request.json();

  if ("Note" in data) {
    throw new Error("Hit rate limit. Please try again later.");
  }

  return data;
}
