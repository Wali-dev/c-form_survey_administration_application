import app from "./app";
import configs from "./configs/config";
import "./configs/sequalize";

const port: number = configs.port;

app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});
