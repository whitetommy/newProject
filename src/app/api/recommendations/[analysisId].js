import { getSession } from "@auth0/nextjs-auth0";

export default async function solution(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { analysisId } = req.query;

  // "TODO": solution recommendation and look up revising the code

  // Sample response
  return res.status(200).json({
    analysisId: analysisId,
    recommendations: [
      {
        type: "XSS",
        solution: "Check the user's input properly, escape the input.",
      },
    ],
  });
}
