import { Controller, Get, Param, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
    constructor(private directionsService: DirectionsService) {}

    @Get()
    getDirections(
        @Query('origin') originPlaceId: string, 
        @Query('destination') destinationPlaceId: string
    ) {
        return this.directionsService.getDirections(originPlaceId, destinationPlaceId);
    }
}
