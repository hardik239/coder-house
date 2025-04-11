import Room from "../modals/Room.js";

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    const room = await Room.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }

  async getAllRooms(types) {
    const rooms = await Room.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }

  async getRoom(roomId) {
    const room = await Room.findOne({ _id: roomId });
    return room;
  }

  async addSpeaker(roomId, user) {
    let room = await Room.findOne({ _id: roomId })
      .$where("speakers")
      .includes(user._id);
    if (!room) {
      room = await Room.findOne({ _id: roomId });
      room?.speakers?.push(user._id);
      await room.save();
    }

    // let t = [...room?.speakers];
    // if (!t.includes(user._id)) {
    //   t.push(user._id);
    // }
    // room.speakers = t;
    // await room.save();
    // return room;
  }

  async removeSpeaker(roomId, user) {
    const room = await Room.findOne({ _id: roomId });
    room?.speakers?.pull(user._id);
    // let t = [...room?.speakers];
    // room.speakers = t.filter((speakerId) => speakerId !== user._id);
    await room.save();
    // return room;
  }
}
export default new RoomService();
