export const updateSubEntryToEntry = async (req, res) => {
    try {
      const { entryId, subEntryId } = req.params;
      const updates = req.body;
  
      const entry = await Entry.findById(entryId);
      if (!entry) return res.status(404).json({ error: "Entry not found" });
  
      // Find the sub-entry in the entry’s subEntries array
      const subEntry = entry.subEntries.id(subEntryId);
      if (!subEntry) return res.status(404).json({ error: "SubEntry not found" });
  
      // Apply updates to the subEntry
      Object.assign(subEntry, updates);
  
      // Recalculate total time for the entry
      entry.recalculateTime();
      await entry.save();
  
      // Update the project’s totalSpentTime
      const updatedTotal = await getTotalProjectTime(entry.projectId);
      await Project.findByIdAndUpdate(entry.projectId, {
        $set: { totalSpentTime: updatedTotal },
      });
  
      res.json({
        message: "SubEntry updated successfully",
        subEntry,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  