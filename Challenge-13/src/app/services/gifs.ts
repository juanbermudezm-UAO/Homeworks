import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Gifs {
    gifs = signal<any[]>([]);
    cargando = signal(false);

    async buscarGifs(query: string) {
        this.cargando.set(true);
        try {
            const params = new URLSearchParams({
                api_key: environment.giphyApiKey,
                q: query,
                limit: '25',
                offset: '0',
                rating: 'g',
                lang: 'en',
            });

            const res = await fetch(`${environment.apiUrl}/search?${params}`);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const body = await res.json();
            this.gifs.set(body.data);
        } catch (error: any) {
            console.error('Error:', error.message);
        } finally {
            this.cargando.set(false);
        }
    }
}