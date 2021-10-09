import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ConfigModule } from '@nestjs/config';
import { MovieSchema } from './database/movie.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: "us-east-1"
      }
    }),
    DynamooseModule.forFeature([{ name: 'Movie', schema:   MovieSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
