import Entry from "../Models/Entry.model.js";

export const getRecentActivities = async (req, res) => {
  try {
    const entries = await Entry.find().sort({ updatedAt: -1 }); // or createdAt

    const allSubEntries = [];

    entries.forEach((entry) => {
      if (entry.subEntries && entry.subEntries.length > 0) {
        entry.subEntries.forEach((sub) => {
          allSubEntries.push({
            entryId: entry._id,
            projectId: entry.project,
            taskTitle: sub.taskTitle,
            spentTime: sub.spentTime,
            date: sub.date,
            learnings: sub.learnings,
            createdAt: sub.createdAt,
          });
        });
      }
    });

    // Sort all sub-entries by date/createdAt descending and get the top 5
    const recentActivities = allSubEntries
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json(recentActivities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
