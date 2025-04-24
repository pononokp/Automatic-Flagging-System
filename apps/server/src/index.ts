import server from "./server.js";

// Server Port
const PORT = process.env.PORT || 3000;

const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
