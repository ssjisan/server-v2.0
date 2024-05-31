export const createAlbum = async (req, res) => {
  try {
    res.status.json("done")
  } catch (error) {
    res.status.json({ error: "Error creating album" });
  }
};
