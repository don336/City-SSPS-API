import Power from "../Models/Power";
class PowerController {
  static async getPowers(req, res) {
    const Powers = await Power.find();

    if (!Powers) {
      return res.status(400).json({
        message: "No any added Powers",
      });
    }

    return res.status(200).json({
      message: "Powers Found",
      Powers,
    });
  }

  static async getPower(req, res) {
    try {
      const { id } = req.params;

      const power = await Power.findById({ _id: id });

      if (!power) {
        return res.status(400).json({
          message: "Power Issue not found",
        });
      }

      return res.status(200).json({
        message: "Power Found",
        power,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async postProblem(req, res) {
    try {
      const { city, neighborhood, fullName, email, level, comments } = req.body;

      if (
        !city ||
        !neighborhood ||
        !fullName ||
        !email ||
        !level ||
        !comments
      ) {
        res.status(400).json({
          message: "All Fields are required",
        });
      }

      const newIssue = await Power.create({
        neighborhood,
        city,
        fullName,
        email,
        level,
        comments,
      });

      res.status(201).json({
        message: "Issue Added to Database",
        newIssue,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }
  static async updateProblem(req, res) {
    try {
      const { id } = req.params;
      const { city, neighborhood, fullName, email, level, comments } = req.body;

      const newIssue = await Power.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            city, 
            neighborhood, 
            fullName, 
            email, 
            level, 
            comments
          },
        },
        { new: true }
      );

      res.status(201).json({
        message: "Updated Issue Added to Database",
        newIssue,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }

  static async deleteProblem(req, res) {
    try {
      const { id } = req.params;

      const newIssue = await Power.deleteOne({ _id: id });

      res.status(204).json({
        message: "Issue Deleted",
        newIssue,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        Error: error.message,
      });
    }
  }
}

export default PowerController;
