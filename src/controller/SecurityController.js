import Security from "../Models/Security";
class SecurityController {
  static async getSecurities(req, res) {
    const Securities = await Security.find();

    if (!Securities) {
      return res.status(400).json({
        message: "No any added Securities",
      });
    }

    return res.status(200).json({
      message: "Securities Found",
      Securities,
    });
  }

  static async getSecurity(req, res) {
    try {
      const { id } = req.params;

      const security = await Security.findById({ _id: id });

      if (!security) {
        return res.status(400).json({
          message: "Security Issue not found",
        });
      }

      return res.status(200).json({
        message: "Security Found",
        security,
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

      const newIssue = await Security.create({
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

      const newIssue = await Security.findByIdAndUpdate(
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

      const newIssue = await Security.deleteOne({ _id: id });

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

export default SecurityController;
