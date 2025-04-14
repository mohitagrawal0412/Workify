// Update a privacy feed
export const updatePrivacyFeed = async (req, res) => {
  try {
    const updatedFeed = await PrivacyFeed.findByIdAndUpdate(
      req.params.feedId,
      req.body,
      { new: true }
    );
    if (!updatedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json(updatedFeed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
