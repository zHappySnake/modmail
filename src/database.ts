import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config();

class Database {
	public dataSource: DataSource;

	constructor() {
		const DatabaseOptions: DataSourceOptions = {
			host: process.env.DB_HOST,
			type: "mysql",
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [],
			synchronize: true,
		};

		this.dataSource = new DataSource(DatabaseOptions);
	}

	public async initialize() {
		try {
			await this.dataSource.initialize();
			console.log("Database connected successfully");
		} catch (error) {
			console.error("Error during database initialization", error);
		}
	}
}

export default new Database();
