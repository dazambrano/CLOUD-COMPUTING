import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Movie, MovieKey } from './database/movie.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Movie')
    private movieModel: Model<Movie, MovieKey>,
  ) { }

  async getMovies(): Promise<Array<any>> {
    let movies = await this.movieModel.scan().exec()
    return movies;
  }

  async getMovie(id: MovieKey): Promise<Movie> {
    let movie = await this.movieModel.get(id)
    return movie;
  }

  async postMovie(new_movie: Movie): Promise<Movie> {
    let movie = await this.movieModel.create(new_movie)
    return movie;
  }

  async putMovie(id: MovieKey, movie: Movie): Promise<Movie> {
    let movies = await this.movieModel.update(id, movie)
    return movies;
  }

  async deleteMovie(id: MovieKey): Promise<any> {
    return await this.movieModel.delete(id)
  }
}
