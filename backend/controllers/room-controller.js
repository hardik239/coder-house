import roomService from "../services/room-service.js";

class RoomController {
  async create(req, res) {
    const { roomTitle: topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "Bad Request!" });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    return res.json(room);
  }

  async getRooms(req, res) {
    const rooms = await roomService.getAllRooms(["globe"]);
    return res.json(rooms);
  }

  async getRoom(req, res) {
    const room = await roomService.getRoom(req.params.roomId);
    return res.json(room);
  }
}

export default new RoomController();
