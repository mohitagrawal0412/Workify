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

export const getCalendarActivitiesGroupedByDate = async (req, res) => {
  try {
    const entries = await Entry.find().populate("project", "title");

    const activityMap = {};

    entries.forEach((entry) => {
      if (entry.subEntries && entry.subEntries.length > 0) {
        entry.subEntries.forEach((sub) => {
          const dateKey = new Date(sub.date).toISOString().split("T")[0]; // 'YYYY-MM-DD'

          if (!activityMap[dateKey]) activityMap[dateKey] = [];

          activityMap[dateKey].push({
            _id: sub._id,
            taskTitle: sub.taskTitle,
            description: sub.description,
            learnings: sub.learnings,
            spentTime: sub.spentTime, // e.g. "3.5"
            date: sub.date,
            tags: sub.tags || [],
            startTime: sub.startTime || null, // Optional
            endTime: sub.endTime || null, // Optional
            entryId: entry._id,
            projectId: entry.project?._id,
            projectTitle: entry.project?.title || "No Title",
          });
        });
      }
    });

    res.status(200).json(activityMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
