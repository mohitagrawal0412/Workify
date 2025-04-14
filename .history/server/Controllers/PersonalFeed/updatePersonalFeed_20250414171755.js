// Update a personal feed entry
export const updatePersonalFeed = async (req, res) => {
  const { feedId } = req.params;
  const { text } = req.body;

  try {
    const updatedFeed = await PersonalFeed.findByIdAndUpdate(
      feedId,
      { text },
      { new: true }
    );
    if (!updatedFeed) {
      return res.status(404).json({ error: "Feed entry not found" });
    }
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
