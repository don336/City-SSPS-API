import Street from "../Models/Street";
class StreetController {
  static async getStreets(req, res) {
    const Streets = await Street.find();

    if (!Streets) {
      return res.status(400).json({
        message: "No any added Streets",
      });
    }

    return res.status(200).json({
      message: "Streets Found",
      Streets,
    });
  }

  static async getStreet(req, res) {
    try {
      const { id } = req.params;

      const street = await Street.findById({ _id: id });

      if (!street) {
        return res.status(400).json({
          message: "Street Issue not found",
        });
      }

      return res.status(200).json({
        message: "Street Found",
        street,
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

      const newIssue = await Street.create({
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

      const newIssue = await Street.findByIdAndUpdate(
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

      const newIssue = await Street.deleteOne({ _id: id });

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

export default StreetController;
