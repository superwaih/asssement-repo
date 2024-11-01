import React, { useState } from 'react';

interface Book {
  title: string;
  author: string;
  genres: string[];
  mood: string[];
}

const bookDatabase: Book[] = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genres: ['Fiction', 'Classic'], mood: ['Reflective', 'Nostalgic'] },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genres: ['Fiction', 'Classic'], mood: ['Thoughtful', 'Inspiring'] },
  { title: '1984', author: 'George Orwell', genres: ['Science Fiction', 'Dystopian'], mood: ['Dark', 'Thought-provoking'] },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genres: ['Fiction', 'Romance', 'Classic'], mood: ['Romantic', 'Witty'] },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genres: ['Fantasy', 'Adventure'], mood: ['Adventurous', 'Whimsical'] },
  { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', genres: ['Fantasy', 'Young Adult'], mood: ['Magical', 'Exciting'] },
  { title: 'The Da Vinci Code', author: 'Dan Brown', genres: ['Thriller', 'Mystery'], mood: ['Intriguing', 'Fast-paced'] },
  { title: 'The Hunger Games', author: 'Suzanne Collins', genres: ['Science Fiction', 'Young Adult'], mood: ['Intense', 'Suspenseful'] },
  { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genres: ['Mystery', 'Thriller'], mood: ['Gritty', 'Intense'] },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genres: ['Fiction', 'Coming-of-age'], mood: ['Angst', 'Reflective'] },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', genres: ['Non-fiction', 'Science'], mood: ['Curious', 'Awe-inspiring'] },
  { title: 'The Diary of a Young Girl', author: 'Anne Frank', genres: ['Non-fiction', 'Biography'], mood: ['Poignant', 'Reflective'] },
  { title: 'The Shining', author: 'Stephen King', genres: ['Horror', 'Thriller'], mood: ['Scary', 'Suspenseful'] },
  { title: 'The Alchemist', author: 'Paulo Coelho', genres: ['Fiction', 'Philosophy'], mood: ['Inspirational', 'Reflective'] },
  { title: 'The Martian', author: 'Andy Weir', genres: ['Science Fiction', 'Adventure'], mood: ['Humorous', 'Suspenseful'] },
];

const allGenres = Array.from(new Set(bookDatabase.flatMap((book) => book.genres))).sort();
const allMoods = Array.from(new Set(bookDatabase.flatMap((book) => book.mood))).sort();

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2" role="status">
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
    <span className="text-lg ml-2">AI is working its magic...</span>
  </div>
);

const BookRecommendationApp: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedOptions);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMood(event.target.value);
  };

  const getRecommendations = async () => {
    setIsLoading(true);
    setRecommendations([]);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const filteredBooks = bookDatabase
      .filter(
        (book) =>
          (selectedGenres.length === 0 || book.genres.some((genre) => selectedGenres.includes(genre))) &&
          (selectedMood === '' || book.mood.includes(selectedMood))
      )
      .sort((a, b) => {
        const aRelevance = a.genres.filter((genre) => selectedGenres.includes(genre)).length + (a.mood.includes(selectedMood) ? 1 : 0);
        const bRelevance = b.genres.filter((genre) => selectedGenres.includes(genre)).length + (b.mood.includes(selectedMood) ? 1 : 0);
        return bRelevance - aRelevance;
      });

    setRecommendations(filteredBooks.slice(0, 5));
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Book Recommendations</h1>
      <div className="mb-4">
        <label htmlFor="genres" className="block mb-2 font-semibold">Select your favorite genres:</label>
        <select
          id="genres"
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
          className="w-full p-2 border rounded"
          aria-label="Select Genres"
        >
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* <div className="mb-4">
        <label htmlFor="mood" className="block mb-2 font-semibold">Select your mood:</label>
        <select
          id="mood"
          value={selectedMood}
          onChange={handleMoodChange}
          className="w-full p-2 border rounded"
          aria-label="Select Mood"
        >
          <option value="">Any Mood</option>
          {allMoods.map((mood) => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div> */}

      <button
        onClick={getRecommendations}
        disabled={isLoading}
        className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-busy={isLoading}
      >
        {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Books:</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : recommendations.length > 0 ? (
          <ul className="space-y-4">
            {recommendations.map((book, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500 mt-1">Genres: {book.genres.join(', ')}</p>
                <p className="text-sm text-gray-500">Mood: {book.mood.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Select genres and/or mood, then click "Get Recommendations" to see AI-powered suggestions.</p>
        )}
      </div>
    </div>
  );
};

export default BookRecommendationApp;
