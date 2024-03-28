import { BanksApi, ClientsApi, HealthApi } from "@/gen/client";
import { getConfiguration } from "./utils";

export const healthApi = () => new HealthApi(getConfiguration());
export const clientApi = () => new ClientsApi(getConfiguration());
export const bankApi = () => new BanksApi(getConfiguration());
