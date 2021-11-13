import path from "path";
import fs from "fs/promises";
import { RegionsReference } from "../types";

const getRegionsData = async (): Promise<RegionsReference> => {
  const filePath = path.join(process.cwd(), "data", "regions.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as RegionsReference;
  return data;
};

export default getRegionsData;
