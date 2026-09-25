import {open, type NitroSQLiteConnection, type QueryResultRow} from 'react-native-nitro-sqlite';
import {MIGRATION_1, SCHEMA_VERSION} from './schema';

let connection: NitroSQLiteConnection | null = null;
export const getDb = () => {
  if (!connection) connection = open({name: 'finora.sqlite', location: 'databases'});
  return connection;
};

export const execute = async <T extends QueryResultRow = QueryResultRow>(sql:string, params:(string|number|boolean|null)[] = []) => {
  const result = await getDb().executeAsync<T>(sql, params);
  return result;
};

export const rows = async <T extends QueryResultRow>(sql:string, params:(string|number|boolean|null)[] = []):Promise<T[]> => {
  const result = await execute<T>(sql, params);
  return (result.results ?? []) as T[];
};

export const one = async <T extends QueryResultRow>(sql:string, params:(string|number|boolean|null)[] = []):Promise<T|undefined> => (await rows<T>(sql,params))[0];

export const transaction = async (fn:(tx:{executeAsync:<T extends QueryResultRow>(sql:string,params?:(string|number|boolean|null)[])=>Promise<any>})=>Promise<void>) => {
  await getDb().transaction(async tx => { await fn(tx as any); });
};

export const initializeDatabase = async () => {
  const db = getDb();
  await db.executeAsync('PRAGMA foreign_keys = ON');
  await db.executeAsync('CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL)');
  const version = await db.executeAsync<{value:string}>("SELECT value FROM app_meta WHERE key='schema_version'");
  const current = Number(version.results?.[0]?.value ?? 0);
  if (current < 1) {
    await db.transaction(async tx => {
      for (const statement of MIGRATION_1) await tx.executeAsync(statement);
    });
  }
  if (current > SCHEMA_VERSION) throw new Error(`Database schema ${current} is newer than this app supports (${SCHEMA_VERSION}).`);
};

export const closeDatabase = () => { if(connection){ connection.close(); connection=null; } };
