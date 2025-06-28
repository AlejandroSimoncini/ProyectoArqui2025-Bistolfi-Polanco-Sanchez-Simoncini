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
      <h2>{activity.nombre}</h2>
    </div>
  );
}

export default ActivityCard;
