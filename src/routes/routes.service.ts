import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private prismaService: PrismaService) { }

  create(createRouteDto: CreateRouteDto) {
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: createRouteDto.source_id,
          location: {
            lat: 0,
            lng: 0
          }
        },
        destination: {
          name: createRouteDto.destination_id,
          location: {
            lat: 0,
            lng: 0
          }
        },
        distance: 0,
        duration: 0,
        directions: '{}'
      }
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUnique({
      where: { id: id }
    });
  }

  update(id: string, updateRouteDto: UpdateRouteDto) {
    return this.prismaService.route.update({
      where: { id: id },
      data: {
        name: updateRouteDto.name,
        source: {
          name: updateRouteDto.source_id,
          location: {
            lat: 0,
            lng: 0
          }
        },
        destination: {
          name: updateRouteDto.destination_id,
          location: {
            lat: 0,
            lng: 0
          }
        },
        distance: 0,
        duration: 0,
        directions: '{}'
      }
    });
  }

  remove(id: string) {
    return this.prismaService.route.delete({
      where: { id: id },
    });
  }
}
