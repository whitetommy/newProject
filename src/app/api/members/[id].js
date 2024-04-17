import {
  retrieveMember,
  registerMember,
  updateMember,
  deleteMember,
} from "./controller";

export default async function membersController(req, res) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET": {
        const member = await retrieveMember(id);
        res.status(200).json(member);
        break;
      }
      case "POST": {
        const newMember = await registerMember(req.body);
        res.status(201).json(newMember);
        break;
      }
      case "PATCH": {
        const updatedMember = await updateMember(id, req.body);
        res.status(200).json(updatedMember);
        break;
      }
      case "DELETE": {
        await deleteMember(id);
        res.status(204).end();
        break;
      }
      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
