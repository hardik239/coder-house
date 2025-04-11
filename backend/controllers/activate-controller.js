import path from "path";
import Jimp from "jimp";
import userService from "../services/user-service.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

class ActiveController {
  async activate(req, res) {
    // Activation logic
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required!" });
    }

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    const cwd = dirname(fileURLToPath(import.meta.url));

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(cwd, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({ message: "Could not process the image" + err });
    }

    const userId = req.user._id;
    // Update user
    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user, auth: true });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" + err });
    }
  }
}

export default new ActiveController();
