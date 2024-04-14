import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  message: string;
  type: string;
  result: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const responseData = data as unknown as Response<T>; // Type assertion
        return {
          message: responseData.message || 'Operation was successful.',
          type: responseData.type || 'success',
          result: responseData.result || data,
        };
      }),
    );
  }
}
