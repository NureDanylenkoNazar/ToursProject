import React, { useCallback, useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAppDispatch } from '../rdx/store';
import { logout } from '../rdx/session/thunks';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'blocked';
}

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const Admin = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'blocked' },
  ]);
  const [tours, setTours] = useState<Tour[]>([
    { id: 1, name: 'City Tour', description: 'Explore the city', price: 100 },
    { id: 2, name: 'Mountain Adventure', description: 'Hike the mountains', price: 200 },
  ]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openTourModal, setOpenTourModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', status: 'active' as 'active' | 'blocked' });
  const [tourForm, setTourForm] = useState({ name: '', description: '', price: 0 });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleOpenUserModal = (user: User | null = null) => {
    setCurrentUser(user);
    setUserForm(
      user ? { name: user.name, email: user.email, status: user.status } : { name: '', email: '', status: 'active' }
    );
    setOpenUserModal(true);
  };

  const handleOpenTourModal = (tour: Tour | null = null) => {
    setCurrentTour(tour);
    setTourForm(
      tour
        ? { name: tour.name, description: tour.description, price: tour.price }
        : { name: '', description: '', price: 0 }
    );
    setOpenTourModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
    setCurrentUser(null);
  };

  const handleCloseTourModal = () => {
    setOpenTourModal(false);
    setCurrentTour(null);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleTourChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setTourForm((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleUserSubmit = () => {
    if (currentUser) {
      setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, ...userForm } : u)));
    } else {
      setUsers([...users, { id: users.length + 1, ...userForm }]);
    }
    handleCloseUserModal();
  };

  const handleTourSubmit = () => {
    if (currentTour) {
      setTours(tours.map((t) => (t.id === currentTour.id ? { ...t, ...tourForm } : t)));
    } else {
      setTours([...tours, { id: tours.length + 1, ...tourForm }]);
    }
    handleCloseTourModal();
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleDeleteTour = (id: number) => {
    setTours(tours.filter((t) => t.id !== id));
  };

  const dispatch = useAppDispatch();

  const onUserLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Users" />
          <Tab label="Tours" />
        </Tabs>
        <Button variant="contained" onClick={onUserLogout} sx={{ mb: 2 }}>
          Logout
        </Button>
        {tab === 0 && (
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" onClick={() => handleOpenUserModal()} sx={{ mb: 2 }}>
              Add User
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenUserModal(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" onClick={() => handleOpenTourModal()} sx={{ mb: 2 }}>
              Add Tour
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>{tour.name}</TableCell>
                    <TableCell>{tour.description}</TableCell>
                    <TableCell>{tour.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenTourModal(tour)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTour(tour.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {/* User Modal */}
        <Dialog open={openUserModal} onClose={handleCloseUserModal}>
          <DialogTitle>{currentUser ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={userForm.name}
              onChange={handleUserChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={userForm.email}
              onChange={handleUserChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              {/* <Select name="status" value={userForm.status} onChange={handleUserChange}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select> */}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserModal}>Cancel</Button>
            <Button onClick={handleUserSubmit}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Tour Modal */}
        <Dialog open={openTourModal} onClose={handleCloseTourModal}>
          <DialogTitle>{currentTour ? 'Edit Tour' : 'Add Tour'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={tourForm.name}
              onChange={handleTourChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={tourForm.description}
              onChange={handleTourChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={tourForm.price}
              onChange={handleTourChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTourModal}>Cancel</Button>
            <Button onClick={handleTourSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Admin;
