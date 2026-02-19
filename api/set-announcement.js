let currentAnnouncement = {
  enabled: true,
  version: 1,
  message: "true",
  duration: 6
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message, duration, enabled } = req.body;

    currentAnnouncement.version += 1;
    currentAnnouncement.message = message;
    currentAnnouncement.duration = duration || 6;
    currentAnnouncement.enabled = enabled;

    res.status(200).json({ success: true, announcement: currentAnnouncement });
  } else if (req.method === 'GET') {
    res.status(200).json(currentAnnouncement);
  } else {
    res.status(405).end();
  }
}
