import Sewer from "../Models/Sewer";

class SewerController {
  static async getAllSewers(req, res) {
    try {
      const sewers = await Sewer.find();
      return res.status(200).json(sewers);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async getSewerById(req, res) {
    const { id } = req.params;
    try {
      const sewer = await Sewer.findById(id);
      if (!sewer) {
        return res.status(404).json({ error: "Sewer not found." });
      }
      return res.status(200).json(sewer);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async createSewer(req, res) {
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
      const sewer = await Sewer.create({
        city,
        neighborhood,
        fullName,
        email,
        dateReport,
        level,
        comments,
      });

      return res.status(201).json(sewer);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async updateSewer(req, res) {
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
      const sewer = await Sewer.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, level, comments },
        { new: true }
      );
      if (!sewer) {
        return res.status(404).json({ error: "Sewer not found." });
      }
      return res.status(201).json(sewer);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async deleteSewer(req, res) {
    const { id } = req.params;
    try {
      const sewer = await Sewer.findByIdAndDelete(id);
      if (!sewer) {
        return res.status(404).json({ error: "Sewer not found." });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }
}

module.exports = SewerController;
