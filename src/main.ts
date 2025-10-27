/* eslint-disable no-console */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*", // allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // set false if you don't need cookies/auth headers
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("NOSBAAN API")
    .setDescription("Property & Task Management API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 8000);
  console.log(`API running at: http://localhost:${process.env.PORT ?? 8000}`);
  console.log(`Swagger docs: http://localhost:${process.env.PORT ?? 8000}/api`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
