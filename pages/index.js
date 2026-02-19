import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(6);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Fetch current announcement
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setDuration(data.duration || 6);
        setEnabled(data.enabled);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send new announcement to server
    await fetch('/api/set-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, duration, enabled })
    });

    alert('Announcement updated!');
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Global Announcement Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:<br/>
          <input value={message} onChange={e => setMessage(e.target.value)} style={{ width: 400 }}/>
        </label>
        <br/><br/>
        <label>
          Duration (seconds):<br/>
          <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))}/>
        </label>
        <br/><br/>
        <label>
          Enabled:<br/>
          <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)}/>
        </label>
        <br/><br/>
        <button type="submit">Update Announcement</button>
      </form>
    </div>
  );
}
