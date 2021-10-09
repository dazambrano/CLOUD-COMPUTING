import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid'
import { Movie } from './database/movie.interface';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Promise<Array<any>> {
    return this.appService.getMovies();
  }

  @Get('/:id')
  getMovie(@Req() request: Request): Promise<Movie> {
    return this.appService.getMovie({ id: request.params.id });
  }

  @Post()
  postMovie(@Req() request: Request): Promise<Movie> {
    let new_movie = {
      id: uuidv4(),
      ...request.body
    }
    console.info(new_movie)
    return this.appService.postMovie(new_movie);
  }

  @Put('/:id')
  putMovie(@Req() request: Request): Promise<Movie> {
    return this.appService.putMovie({ id: request.params.id }, request.body);
  }

  @Delete('/:id')
  deleteMovie(@Req() request: Request): Promise<Movie> {
    return this.appService.deleteMovie({ id: request.params.id });
  }
}
