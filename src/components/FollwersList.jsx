import ListUsers from './ListUsers'; // Ensure this path is correct

const FollowersList = () => {
  // Dummy user data
  const dummyUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', avatarUrl: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://via.placeholder.com/40' },
  ];

  return (
    <div>
      <ListUsers users={dummyUsers} />
    </div>
  );
};

export default FollowersList;
