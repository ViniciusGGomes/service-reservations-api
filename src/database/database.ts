import { promises as fs } from "fs";
import path from "path";

export const DATABASE_PATH = path.join(__dirname, "db.json");

type DatabaseSchema = {
  [key: string]: any[];
};

export class Database {
  private database: DatabaseSchema = {};

  constructor() {
    this.loadDatabase();
  }

  private async loadDatabase() {
    try {
      const data = await fs.readFile(DATABASE_PATH, "utf-8");
      this.database = JSON.parse(data);
    } catch (error) {
      this.persist();
    }
  }

  private async persist() {
    await fs.writeFile(DATABASE_PATH, JSON.stringify(this.database, null, 2));
  }

  public async insert<T extends object>(table: string, data: T) {
    if (!this.database[table]) {
      this.database[table] = [];
    }
    this.database[table].push(data);
    await this.persist();
  }

  public select<T>(table: string, filters?: Partial<T>): T[] {
    let data = (this.database[table] ?? []) as T[];

    if (filters) {
      data = data.filter((item) =>
        Object.entries(filters).every(
          ([key, value]) => (item as any)[key] === value
        )
      );
    }

    return data;
  }

  public async update(table: string, id: string, data: object) {
    const rowIndex = this.database[table]?.findIndex(
      (row) => row.user_id === id
    );

    if (rowIndex > -1) {
      this.database[table][rowIndex] = {
        ...this.database[table][rowIndex],
        ...data,
      };

      await this.persist();
    } else {
      console.log(`Reserva com ID ${id} não encontrada!`);
    }
  }

  public async delete(table: string, id: string) {

    this.database[table] =
      this.database[table]?.filter((item) => item.user_id !== id) || [];

    await this.persist();
  }
}
