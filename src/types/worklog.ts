import { ObjectId } from "mongodb";

export interface WorkLog {
  _id: string;
  newDate: string;
  team: string;
  username: string;
  title: string;
  status: string;
  content?: string;
  result?: string;
}

export interface DBWorkLogDetails extends Omit<WorkLog, "_id" | "newDate"> {
  _id: ObjectId;
}

export interface DBWorkLogDetailsPost
  extends Omit<DBWorkLogDetails, "_id" | "newDate"> {
  newDate: Date;
}

export interface GetWorkLogRequest {
  start: string;
  end: string;
  team: string;
}
