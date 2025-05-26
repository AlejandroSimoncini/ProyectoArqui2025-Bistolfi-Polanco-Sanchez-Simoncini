import { Link } from 'react-router-dom';

function ActivityCard({ activity }) {
  return (
    <Link to={`/actividad/${activity.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        border: '1px solid #ccc',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10
      }}>
        <h2>{activity.title}</h2>
        <p><strong>Día:</strong> {activity.day}</p>
        <p><strong>Horario:</strong> {activity.time}</p>
        <p><strong>Profesor:</strong> {activity.professor}</p>
        <p><strong>Categoría:</strong> {activity.category}</p>
      </div>
    </Link>
  );
}

export default ActivityCard;
