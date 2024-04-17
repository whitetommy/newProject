import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function checkAnalysis(req, res) {
  const { analysisId } = req.query;

  if (req.method == "GET") {
    try {
      // analysisId is primary key in DB
      const analysisResult = await prisma.analysis.findUnique({
        where: { analysisId: parseInt(analysisId) },
      });

      if (analysisResult) {
        const formattedResult = {
          analysisId: analysisId,
          status: analysisResult.status,
          vulnerabilities: analysisResult.vulnerabilities, //It's array in DB
        };
        res.status(200).json(formattedResult);
      } else {
        res.status(404).json({ message: "Analysis result not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
