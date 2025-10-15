import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper
} from '@mui/material';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  email?: string;
  submit?: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    console.log('Валідація даних', formData);
    const errs: FormErrors = {};
    if (!formData.email) {
      errs.email = 'Email обов’язковий';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Некоректний email';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      console.log('Відправка даних', formData);
      await axios.post('http://localhost:8000/api/submit-form', formData);
      setSuccess('Форма успішно відправлена!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Помилка при відправці форми' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Форма зворотного зв’язку
        </Typography>

        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Ім’я"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email*"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Повідомлення"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Відправити
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;