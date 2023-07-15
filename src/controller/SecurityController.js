import Security from "../Models/Security";

class SecurityController {
  static async getAllSecurity(req, res) {
    try {
      const security = await Security.find();
      return res.status(200).json(security);
    } catch (error) {
      res.status(500).json({
        message: "server Error",
        err: error.message,
      });
    }
  }

  static async getSecurityById(req, res) {
    const { id } = req.params;
    try {
      const security = await Security.findById(id);
      if (!security) {
        return res.status(400).json({ error: "Security Issue not Found" });
      }
      res.status(200).json({
        message: "Power Issues Found",
        Power,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server Error", Error: error.message });
    }
  }

  static async createSecurity(req, res) {
    const { city, neighborhood, fullName, email, dateReport, level, comments } =
      req.body;

    // Validate required fields
    if (
      !city ||
      !neighborhood ||
      !fullName ||
      !email ||
      !dateReport ||
      !level ||
      !comments
    ) {
      return res
        .status(422)
        .json({ message: "Please Add all Required Fields" });
    }

    try {
      const security = new Security.create({
        city,
        neighborhood,
        fullName,
        email,
        dateReport,
        level,
        comments,
      });
      return res.status(201).json(security);
    } catch (error) {
      res.status(500).json({
        error: "Server Error",
        Error: error.message,
      });
    }
  }

  static async updateSecurity(req, res) {
    const { id } = req.params;
    const { city, neighborhood, fullName, email, dateReport, level, comments } =
      req.body;

    // Validate required fields
    if (
      !city ||
      !neighborhood ||
      !fullName ||
      !email ||
      !dateReport ||
      !level ||
      !comments
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const security = await Security.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, dateReport, level, comments },
        { new: true }
      );
      if (!security) {
        return res.status(400).json({ error: "Security Report not found." });
      }
      return res.status(200).json(security);
    } catch (error) {
      res.status(500).json({ message: "Server Error", Error: error.message });
    }
  }

  static async deleteSecurity(req, res) {
    const { id } = req.params;
    try {
      const power = await Power.findByIdAndDelete(id);
      if (!power) {
        return res.status(404).json({ error: "Power report not found." });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Server Error", Error: error.message });
    }
  }
}

export default SecurityController;
