import Sewer from '../Models/Sewer';

class SewerController {
  static async getAllSewers(req, res) {
    try {
      const sewers = await Sewer.find();
      res.json(sewers);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the sewer problem list.' });
    }
  }

  static async getSewerById(req, res) {
    const { id } = req.params;
    try {
      const sewer = await Sewer.findById(id);
      if (!sewer) {
        return res.status(404).json({ error: 'Sewer not found.' });
      }
      res.json(sewer);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the sewer Id.' });
    }
  }

  static async createSewer(req, res) {
    const { city, neighborhood, fullName, email, dateReport, level, comments } = req.body;

    // Validate required fields
    if (!city || !neighborhood || !fullName || !email || !dateReport || !level || !comments) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const sewer = new Sewer({ city, neighborhood, fullName, email, dateReport, level, comments });
      await sewer.save();
      res.status(201).json(sewer);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the sewer.' });
    }
  }

  static async updateSewer(req, res) {
    const { id } = req.params;
    const { city, neighborhood, fullName, email, dateReport, level, comments } = req.body;

    // Validate required fields
    if (!city || !neighborhood || !fullName || !email || !dateReport || !level || !comments) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const sewer = await Sewer.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, dateReport, level, comments },
        { new: true }
      );
      if (!sewer) {
        return res.status(404).json({ error: 'Sewer not found.' });
      }
      res.json(sewer);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the sewer problem.' });
    }
  }

  static async deleteSewer(req, res) {
    const { id } = req.params;
    try {
      const sewer = await Sewer.findByIdAndDelete(id);
      if (!sewer) {
        return res.status(404).json({ error: 'Sewer not found.' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the sewer.' });
    }
  }
}

module.exports = SewerController;