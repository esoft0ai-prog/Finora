import {execute} from '../database/db'; import {uuid} from '../utils/id';
export const audit=async(action:string,entityType:string,entityId?:string,details?:unknown)=>execute('INSERT INTO audit_logs(id,action,entity_type,entity_id,details_json,created_at) VALUES(?,?,?,?,?,?)',[uuid(),action,entityType,entityId??null,details?JSON.stringify(details):null,new Date().toISOString()]);
