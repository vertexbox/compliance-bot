import { HandlerModule } from "./common";
import ValidatePRTileHandler from "./handlers/validate_pr_title";

export interface Configuration {
  app_name: string;
}

export const Handlers: HandlerModule[] = [ValidatePRTileHandler];

export const AppConfig: Configuration = {
  app_name: process.env.APP_NAME!,
};
