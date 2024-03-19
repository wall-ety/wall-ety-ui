import { HealthApi } from "@/gen/client";
import { getConfiguration } from "./utils";

export const healthApi = () => new HealthApi(getConfiguration());
