import SymptomEntry from "../models/SymptomEntry.js";

export const createSymptomEntry = async (req, res) => {
  try {

    const { rawText } = req.body;

    const entry = await SymptomEntry.create({
      user: req.user._id,
      rawText
    });

    res.status(201).json(entry);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getSymptomEntries = async (req, res) => {
  try {

    const entries = await SymptomEntry.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(entries);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};