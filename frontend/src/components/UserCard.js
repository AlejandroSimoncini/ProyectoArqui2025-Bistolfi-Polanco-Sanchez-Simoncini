function UserCard ({user, onClick}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        cursor: 'pointer'
      }}
    >
      <h2>{user.name}</h2>
    </div>
  );
}

export default UserCard;