import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteSerializer } from './route.serializer';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const route = await this.routesService.create(createRouteDto);
    return new RouteSerializer(route);
  }

  @Get()
  async findAll() {
    const routes = await this.routesService.findAll();
    return routes.map((route) => new RouteSerializer(route));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const route = await this.routesService.findOne(id);
    return new RouteSerializer(route);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    const route = await this.routesService.update(id, updateRouteDto);
    return new RouteSerializer(route);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const route = await this.routesService.remove(id);
    return new RouteSerializer(route);
  }
}
