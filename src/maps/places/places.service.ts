import { Client as GoogleMapsClient, PlaceInputType } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
    
    constructor(
        private googleMapsClient: GoogleMapsClient, 
        private configService: ConfigService
    ) { }

    async findPlace(text: string) {
        const { data } = await this.googleMapsClient.findPlaceFromText({
            params: {
                key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
                input: text,
                inputtype: PlaceInputType.textQuery,
                fields: ['place_id', 'formatted_address', 'geometry', 'name']
            }
        });
        return data;
    }
}
