// Delete a privacy feed
export const deletePrivacyFeed = async (req, res) => {
  try {
    const deletedFeed = await PrivacyFeed.findByIdAndDelete(req.params.feedId);
    if (!deletedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json({ message: "Feed deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
