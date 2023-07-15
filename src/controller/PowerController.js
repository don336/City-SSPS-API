import Power from "../Models/Power";

class PowerController {
  static async getAllPowers(req, res) {
    try {
      const powers = await Power.find();
      return res.status(200).json(powers);
    } catch (error) {
      res.status(500).json({
        message: "server Error",
        err: error.message,
      });
    }
  }

  static async getPowerById(req, res) {
    const { id } = req.params;
    try {
      const power = await Power.findById(id);
      if (!power) {
        return res.status(400).json({ error: "Power Issue not Found" });
      }
      return res.status(200).json({
        message: "Power Issues Found",
        power,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server Error", Error: error.message });
    }
  }

  static async createPower(req, res) {
    const { city, neighborhood, fullName, email, level, comments } =
      req.body;

    // Validate required fields
    if (
      !city ||
      !neighborhood ||
      !fullName ||
      !email ||
      !level ||
      !comments
    ) {
      return res
      .status(400)
      .json({ message: "Please Add all Required Fields" });
    }

    try {
      const power = await Power.create({
        city,
        neighborhood,
        fullName,
        email,
        level,
        comments,
      });
      return res.status(201).json(power);
    } catch (error) {
      return res.status(500).json({
        error: "Server Error",
        Error: error.message,
      });
    }
  }

  static async updatePower(req, res) {
    const { id } = req.params;
    const { city, neighborhood, fullName, email, level, comments } =
      req.body;

    // Validate required fields
    if (
      !city ||
      !neighborhood ||
      !fullName ||
      !email ||
      !level ||
      !comments
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const power = await Power.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, level, comments },
        { new: true }
      );
      if (!power) {
        return res.status(400).json({ error: "Power Report not found." });
      }
      return res.status(200).json(power);
    } catch (error) {
      return res.status(500).json({ message: "Server Error", Error: error.message });
    }
  }

  static async deletePower(req, res) {
    const { id } = req.params;
    try {
      const power = await Power.findByIdAndDelete(id);
      if (!power) {
        return res.status(404).json({ error: "Power report not found." });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Server Error", Error: error.message });
    }
  }
}

export default PowerController;
