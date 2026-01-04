// Serverless proxy for NewsAPI — keeps API key server-side
export default async function handler(req, res) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  if (!NEWS_API_KEY) {
    // NEWS_API_KEY not configured — return a harmless 200 with empty articles
    // Frontend will render fallback news when articles array is empty.
    res.status(200).json({ status: 'ok', totalResults: 0, articles: [] });
    return;
  }

  const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=8&apiKey=${NEWS_API_KEY}`;
  try {
    const r = await fetch(url);
    const text = await r.text();
    // forward status and body
    if (!r.ok) {
      // try to parse JSON body, else forward as text
      try {
        const obj = JSON.parse(text);
        res.status(r.status).json(obj);
      } catch (_) {
        res.status(r.status).type('text').send(text);
      }
      return;
    }
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
