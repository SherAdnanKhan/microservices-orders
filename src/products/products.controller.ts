import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Delete,
  Put,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  findAll(
    @Request()
    request,
    @Response()
    response,
  ): any {
    console.log(request);
    return response.json({ msg: 'Find ALL' });
  }

  @Post('')
  @HttpCode(204)
  @Header('Authorization', 'Bearer XADDSDSADSADSA@#@!#XC')
  store(
    @Response()
    response,
  ): any {
    return response.json({ msg: 'Stored' });
  }

  @Delete('')
  delete(
    @Response()
    response,
  ): any {
    return response.json({ msg: 'Deleted' });
  }

  @Put('')
  update(
    @Response()
    response,
  ): any {
    return response.json({ msg: 'Updated' });
  }

  @Get('ab*cd')
  pattern(
    @Response()
    response,
  ): any {
    return response.json({ msg: 'Pattern matched' });
  }
  @Get('/docs')
  @Redirect('https://nextjs.org/docs', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://nextjs.org/docs/v5/' };
    }
  }
  @Get(':id')
  findOne(@Param() param): any {
    return param;
  }
}
