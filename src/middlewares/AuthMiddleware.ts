import {MiddlewareMethods, Middleware} from "@tsed/platform-middlewares";
import {BadRequest, NotAcceptable} from "@tsed/exceptions";
import {HeaderParams} from "@tsed/platform-params";

import { KeysService } from '../services/KeysService';

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  constructor(private keysService: KeysService) {}

  async use(
    @HeaderParams('x-rapidapi-host') X_RAPIDAPI_HOST: string = '', 
    @HeaderParams('x-rapidapi-key') X_RAPIDAPI_KEY: string = ''
  ) {
    const key = await this.keysService.getKeyByType('rapidapi');
    console.log(X_RAPIDAPI_HOST, X_RAPIDAPI_KEY)
    if (X_RAPIDAPI_HOST === '' || X_RAPIDAPI_KEY === '') {
      throw new BadRequest("X_RAPIDAPI_HOST and X_RAPIDAPI_HOST are required")
    }
    
    if (X_RAPIDAPI_HOST === key?.host) {
      throw new NotAcceptable("X_RAPIDAPI HOST is not allowed");
    }

    if (X_RAPIDAPI_KEY === key?.key) {
      throw new NotAcceptable("X_RAPIDAPI HOST is not allowed");
    }
  }
}