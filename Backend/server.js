// import "./database/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize } from "./database/database.js";
import apiRouter from "./routes/api.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cors());
// app.use(fakeSlowServer(800));
app.use("/api", apiRouter);

//start

const main = async () => {
	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});

	try {
		await sequelize.authenticate();
		console.log(
			"Connection to the database has been established successfully."
		);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
	await sequelize.sync({ force: true });
};

main();
