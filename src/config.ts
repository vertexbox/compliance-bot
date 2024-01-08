import { HandlerModule } from "./common";
import ValidatePRTileHandler from "./handlers/validate_pr_title";
import CheckPRTestedLabel from "./handlers/check_pr_tested_label";

export interface Configuration {
  app_name: string;
}

export const Handlers: HandlerModule[] = [
  ValidatePRTileHandler,
  CheckPRTestedLabel,
];

export const AppConfig: Configuration = {
  app_name: process.env.APP_NAME!,
};
