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
}

export default StreetController;
