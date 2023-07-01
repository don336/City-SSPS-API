import Power from '../Models/Power';

class PowerController {
  static async getAllPowers(req, res) {
    try {
      const powers = await Power.find();
      res.json(powers);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the sewer problem list.' });
    }
  }

  static async getPowerById(req, res) {
    const { id } = req.params;
    try {
      const power = await Power.findById(id);
      if (!power) {
        return res.status(404).json({ error: 'Sewer not found.' });
      }
      res.json(power);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the sewer Id.' });
    }
  }

  static async createPower(req, res) {
    const { city, neighborhood, fullName, email, dateReport, level, comments } = req.body;

    // Validate required fields
    if (!city || !neighborhood || !fullName || !email || !dateReport || !level || !comments) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const power = new Power({ city, neighborhood, fullName, email, dateReport, level, comments });
      await power.save();
      res.status(201).json(power);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the sewer.' });
    }
  }

  static async updatePower(req, res) {
    const { id } = req.params;
    const { city, neighborhood, fullName, email, dateReport, level, comments } = req.body;

    // Validate required fields
    if (!city || !neighborhood || !fullName || !email || !dateReport || !level || !comments) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const power = await Power.findByIdAndUpdate(
        id,
        { city, neighborhood, fullName, email, dateReport, level, comments },
        { new: true }
      );
      if (!power) {
        return res.status(404).json({ error: 'Power Report not found.' });
      }
      res.json(power);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the power problem.' });
    }
  }

  static async deletePower(req, res) {
    const { id } = req.params;
    try {
      const power = await Power.findByIdAndDelete(id);
      if (!power) {
        return res.status(404).json({ error: 'Power report not found.' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the power report.' });
    }
  }
}

module.exports = PowerController;