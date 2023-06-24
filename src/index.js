import app from './Routes/app';

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server running on Port ${PORT}`));
