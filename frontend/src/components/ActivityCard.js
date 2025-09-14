function ActivityCard({ activity, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ccc',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        cursor: 'pointer'
      }}
    >
      <h2>{activity.title}</h2>
      <p><strong>Día:</strong> {activity.day}</p>
    </div>
  );
}

export default ActivityCard;
