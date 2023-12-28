import { DatabaseProvider } from '@src/infra/database/typeorm-adapter';
import { Get, JsonController } from 'routing-controllers';

@JsonController('/health')
export class HealthController {

  @Get()
  async health() {
    const dbStatus = await DatabaseProvider.query('SELECT 1 "ON"');

    return { applicationRunning: true, dbConnected: !!dbStatus?.[0]?.ON };
  }

}
