import { Controller, Get, Route } from "tsoa";

@Route("health")
export class HealthController extends Controller {
  @Get()
  public async getHealth() {
    return { status: "ok" };
  }
}
