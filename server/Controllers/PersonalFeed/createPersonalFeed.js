import PersonalFeed from "../../Models/PersonalFeed.model.js";
// Create a new personal feed entry
export const createPersonalFeed = async (req, res) => {
  const { text } = req.body;

  try {
    const newFeed = new PersonalFeed({ text });
    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
