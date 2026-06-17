import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dns from "dns"
dns.setServers(['8.8.8.8','1.1.1.1'])

const startServer = async() => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
}

startServer();
