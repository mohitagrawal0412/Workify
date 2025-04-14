import PersonalFeed from "../../Models/PersonalFeed.model.js";
// Delete a personal feed entry
export const deletePersonalFeed = async (req, res) => {
  const { feedId } = req.params;

  try {
    const deletedFeed = await PersonalFeed.findByIdAndDelete(feedId);
    if (!deletedFeed) {
      return res.status(404).json({ error: "Feed entry not found" });
    }
    res.status(200).json({ message: "Feed entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
