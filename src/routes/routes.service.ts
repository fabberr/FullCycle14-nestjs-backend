import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService
  ) { }

  async create(createRouteDto: CreateRouteDto) {
    
    const {
      request,
      available_travel_modes,
      geocoded_waypoints,
      routes,
    } = await this.directionsService.getDirections(createRouteDto.origin_id, createRouteDto.destination_id);
    const legs = routes.at(0)?.legs ?? [];

    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        origin: {
          name: legs.at(0)?.start_address,
          location: request.origin.location
        },
        destination: {
          name: legs.at(-1)?.end_address,
          location: request.destination.location
        },
        distance: legs.reduce((acc, currentLeg) => acc + currentLeg?.distance?.value ?? 0, 0),
        duration: legs.reduce((acc, currentLeg) => acc + currentLeg?.duration?.value ?? 0, 0),
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request
        }),
      }
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUniqueOrThrow({
      where: { id: id }
    });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const {
      request,
      available_travel_modes,
      geocoded_waypoints,
      routes,
    } = await this.directionsService.getDirections(updateRouteDto.origin_id, updateRouteDto.destination_id);
    const legs = routes.at(0)?.legs ?? [];

    return this.prismaService.route.update({
      where: { id: id },
      data: {
        name: updateRouteDto.name,
        origin: {
          name: legs.at(0)?.start_address,
          location: request.origin.location
        },
        destination: {
          name: legs.at(-1)?.end_address,
          location: request.destination.location
        },
        distance: legs.reduce((acc, currentLeg) => acc + currentLeg?.distance?.value ?? 0, 0),
        duration: legs.reduce((acc, currentLeg) => acc + currentLeg?.duration?.value ?? 0, 0),
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request
        }),
      }
    });
  }

  remove(id: string) {
    return this.prismaService.route.delete({
      where: { id: id },
    });
  }
}
