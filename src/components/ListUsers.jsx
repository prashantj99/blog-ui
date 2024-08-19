/* eslint-disable react/prop-types */
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const ListUsers = ({ users }) => {
  const handleFollowClick = (userId) => {
    console.log('Follow user with ID:', userId);
  };

  return (
    <div>
      {users.length === 0 ? (
        <Typography>No users available</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id} alignItems="center">
              <ListItemAvatar>
                <Avatar src={user.avatarUrl} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={<a href={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user.name}</a>}
                secondary={user.email}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleFollowClick(user.id)}
              >
                Follow
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListUsers;
