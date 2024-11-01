import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nx-welcome',  // Use the original selector
  template: `
    <div class="landing-wrapper">
      <div class="content-container">
        <!-- Hero Section -->
        <h1 class="title">Discover Your Next Favorite Book</h1>
        <p class="subtitle">
          Welcome to our Book Recommendation App, powered by AI to bring you personalized suggestions.
        </p>
        <!-- CTA Button -->
        <button class="cta-button" (click)="goToReactApp()">Get Started</button>
      </div>
    </div>
  `,
  styles: [
    `
      /* Landing Page Styles */
      .landing-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f3f4f6;
        font-family: Arial, sans-serif;
        text-align: center;
      }
      .content-container {
        max-width: 600px;
        padding: 2rem;
      }
      .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 1rem;
      }
      .subtitle {
        font-size: 1.25rem;
        color: #4b5563;
        margin-bottom: 2rem;
      }
      .cta-button {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        color: #fff;
        background-color: #3b82f6;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .cta-button:hover {
        background-color: #2563eb;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  goToReactApp() {
    window.open('https://assessement-repo.vercel.app/', '_blank');
  }
}
