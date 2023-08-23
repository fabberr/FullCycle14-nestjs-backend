import { DirectionsRequest, Client as GoogleMapsClient, Language, TravelMode } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
    constructor(
        private googleMapsClient: GoogleMapsClient, 
        private configService: ConfigService
    ) { }

    async getDirections(originPlaceId: string, destinationPlaceId: string) {
        const params: DirectionsRequest['params'] = {
            key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
            origin: `place_id:${originPlaceId}`,
            destination: `place_id:${destinationPlaceId}`,
            mode: TravelMode.driving,
            language: Language.pt_BR,
        };

        const { data } = await this.googleMapsClient.directions({ params });
        
        return {
            response: { ...data },
            request: {
                mode: params.mode,
                origin: {
                    place_id: params.origin,
                    /** Start location of the first leg of the journey */
                    location: {
                        lat: data.routes.at(0)?.legs.at(0)?.start_location.lat,
                        lng: data.routes.at(0)?.legs.at(0)?.start_location.lng
                    }
                },
                destination: {
                    place_id: params.destination,
                    /** End location of the last leg of the journey */
                    location: {
                        lat: data.routes.at(0)?.legs.at(-1)?.end_location.lat,
                        lng: data.routes.at(0)?.legs.at(-1)?.end_location.lng
                    }
                }
            }
        };
    }
}
