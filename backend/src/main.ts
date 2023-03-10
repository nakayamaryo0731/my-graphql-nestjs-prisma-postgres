import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { PrismaService } from './components/prisma/prisma.service';
import { PbEnv } from './config/environments/pb-env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);
  const pbEnv = app.get(PbEnv);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  prismaService.enableLogger(winstonLogger);

  await app.listen(pbEnv.Port, '0.0.0.0'); // 外部からリクエストを受け付けられるように 0.0.0.0 を追加
  winstonLogger.log(`PORT: ${pbEnv.Port}`);
}
bootstrap();
