// book-recommendation.component.ts
import { Component, OnInit } from '@angular/core';
import { RecommendationService } from './recommendation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-book-recommendation',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">AI Book Recommendations</h1>
      <div class="mb-4">
        <label for="genres" class="block mb-2">Select your favorite genres:</label>
        <select
          id="genres"
          multiple
          [(ngModel)]="selectedGenres"
          class="w-full p-2 border rounded"
        >
          <option *ngFor="let genre of genres" [value]="genre">{{ genre }}</option>
        </select>
      </div>
      <button
        (click)="getRecommendations()"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Recommendations
      </button>
      <div *ngIf="recommendations.length > 0" class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Recommended Books:</h2>
        <ul class="list-disc pl-5">
          <li *ngFor="let book of recommendations" class="mb-2">
            {{ book.title }} by {{ book.author }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class BookRecommendationComponent implements OnInit {
  genres: string[] = ['Fiction', 'Non-fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Romance', 'Thriller'];
  selectedGenres: string[] = [];
  recommendations: any[] = [];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit() {}

  getRecommendations() {
    this.recommendationService.getRecommendations(this.selectedGenres).subscribe(
      (recommendations) => {
        this.recommendations = recommendations;
      },
      (error) => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }
}

