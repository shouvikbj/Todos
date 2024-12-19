import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

export class SQLiteService {
    sqlite = new SQLiteConnection(CapacitorSQLite);
    db = null;

    // Initialize the SQLite database
    async initializeDB() {
        try {
            this.db = await this.sqlite.createConnection('todos.db', false, 'no_encryption', 1, false);
            console.log('Database initialized successfully');
            this.db.open();
            await this.createTable();
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    // Create the table if it doesn't exist
    async createTable() {
        if (this.db) {
            try {
                const query = `CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    task TEXT,
                    isDone INTEGER
                )`;
                await this.db.execute(query);
                console.log('Table created or already exists');
            } catch (error) {
                console.error('Error creating table:', error);
            }
        } else {
            console.error('Database is not initialized');
        }
    }

    // Add a todo item to the database
    async addTodo(task) {
        if (this.db) {
            try {
                const query = `INSERT INTO todos (task, isDone) VALUES ("${task}", ${0})`;
                await this.db.execute(query); // 0 for 'not done'
                console.log('Todo added successfully');
            } catch (error) {
                console.error('Error executing query:', error);
            }
        } else {
            console.error('Database is not initialized');
        }
    }

    // Retrieve all todos from the database
    async getTodos() {
        if (this.db) {
            try {
                const query = 'SELECT * FROM todos';
                const result = await this.db.query(query);
                return result.values;
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        } else {
            console.error('Database is not initialized');
            return [];
        }
    }

    // Mark a todo item as done
    async markAsDone(id, isDone) {
        if (this.db) {
            try {
                const query = `UPDATE todos SET isDone = ${isDone ? 0 : 1} WHERE id = ${id}`;
                await this.db.execute(query);
                console.log('Todo marked as done');
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        } else {
            console.error('Database is not initialized');
        }
    }

    // Delete a todo item
    async deleteTodo(id) {
        if (this.db) {
            try {
                const query = `DELETE FROM todos WHERE id = ${id}`;
                await this.db.execute(query);
                console.log('Todo deleted');
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        } else {
            console.error('Database is not initialized');
        }
    }
}
