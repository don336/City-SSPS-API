import Power from "../Models/Power";
import Security from "../Models/Security";
import Street from "../Models/Street";
import Sewer from "../Models/Sewer";


class NeighborhoodController {
    static async getAllNeighborhoods(req, res) {
    const { neighborhoodInput } = req.params;
      try {
        const powers = await Power.find({"neighborhood": neighborhoodInput});
        const security = await Security.find({"neighborhood": neighborhoodInput});
        const street = await Street.find({"neighborhood": neighborhoodInput});
        const sewer = await Sewer.find({"neighborhood": neighborhoodInput});
        let neighborhood = { sewer, street, security, powers };
        return res.status(200).json(neighborhood);
      } catch (error) {
        res.status(500).json({
          message: "server Error",
          err: error.message,
        });
      }
    }
}

export default NeighborhoodController;