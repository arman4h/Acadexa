import * as mock from "../lib/mockData";
import type { Trimester } from "../types";

export async function getTrimesters(): Promise<Trimester[]> {
  return mock.getTrimesters();
}

export async function getTrimesterById(id: string): Promise<Trimester | null> {
  return mock.getTrimesterById(id) ?? null;
}
