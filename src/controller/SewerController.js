import Sewer from "../Models/Sewer";
import mongoose from 'mongoose';


class SewerController {
  static async getAllSewers(req, res) {
    
    const sewers = await Sewer.find();
    if(!sewers) {
      return res.status(400).json({
        message: "No any added Sewers",
        Error: error.message,
      });
    } 
        
    return res.status(200).json({message: "Sewers Found", sewers});
  }

  static async getSewerById(req, res) {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        message: "Wrong id",
      });
    }
    try {
      const sewer = await Sewer.findById(id);
      return sewer 
        ? res.status(200).json({ message: "Sewer Found", sewer })
        : res.status(400).json({ message: "Sewer Issue not found" });
    } catch (error) {
      if (error instanceof mongoose.CastError || error.name === "CastError") {
        return res.status(400).json({ message: "Sewer Issue not found" });
      }
      return res.status(500).json({ message: "Server Error", Error: error.message });
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
      return res.status(400).json({ message: "All Fields are required" });
    }

    try {
      const sewer = await Sewer.create({
        city,
        neighborhood,
        fullName,
        email,
        level,
        comments,
      });

      return res.status(201).json({ message: "Issue Added to Database", sewer });
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
      !comments ||
      !id
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    try {
      const sewer = await Sewer.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, level, comments },
        { new: true }
      );
      // if (!sewer) {
      //   return res.status(404).json({ error: "Sewer not found." });
      // }
      return res.status(201).json({ message: "Updated Issue Added to Database", sewer });
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
      // if (!sewer) {
      //   return res.status(404).json({ message: "Sewer not found." });
      // }
      return res.status(204).json({
        message: "Issue Deleted",
        sewer
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }
}

module.exports = SewerController;
