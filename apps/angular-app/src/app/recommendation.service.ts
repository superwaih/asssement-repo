// book-recommendation.component.ts
// ... (previous code remains the same)

// recommendation.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private reactComponentRef: any;

  setReactComponentRef(ref: any) {
    this.reactComponentRef = ref;
  }

  getRecommendations(genres: string[]): Observable<any[]> {
    return new Observable((observer) => {
      if (this.reactComponentRef && this.reactComponentRef.getRecommendations) {
        this.reactComponentRef.getRecommendations(genres, (recommendations: any[]) => {
          observer.next(recommendations);
          observer.complete();
        });
      } else {
        observer.error('React component not initialized');
      }
    });
  }
}