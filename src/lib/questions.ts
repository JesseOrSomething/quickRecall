export interface Question {
  id: number;
  question: string;
  answer: string | string[];
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const questions: Question[] = [
  // Geography
  {
    id: 1,
    question: "What is the capital of Canada?",
    answer: ["ottawa"],
    category: "Geography",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "Which river is the longest in the world?",
    answer: ["nile", "nile river"],
    category: "Geography",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "What is the smallest country in the world?",
    answer: ["vatican", "vatican city"],
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "Which continent has the most countries?",
    answer: ["africa"],
    category: "Geography",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is the tallest mountain in the world?",
    answer: ["everest", "mount everest"],
    category: "Geography",
    difficulty: "Easy"
  },

  // History
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    answer: ["da vinci", "leonardo da vinci"],
    category: "Art",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "In what year did World War II end?",
    answer: ["1945"],
    category: "History",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "Who was the first person to walk on the moon?",
    answer: ["neil armstrong", "armstrong"],
    category: "History",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "Which empire was ruled by Julius Caesar?",
    answer: ["roman", "roman empire"],
    category: "History",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "What year did the Berlin Wall fall?",
    answer: ["1989"],
    category: "History",
    difficulty: "Medium"
  },

  // Science
  {
    id: 11,
    question: "What is the chemical symbol for gold?",
    answer: ["au"],
    category: "Science",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "How many bones are in the adult human body?",
    answer: ["206"],
    category: "Science",
    difficulty: "Hard"
  },
  {
    id: 13,
    question: "What planet is known as the Red Planet?",
    answer: ["mars"],
    category: "Science",
    difficulty: "Easy"
  },
  {
    id: 14,
    question: "What gas makes up about 78% of Earth's atmosphere?",
    answer: ["nitrogen"],
    category: "Science",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "What is the speed of light in a vacuum?",
    answer: ["299792458", "300000000", "3x10^8"],
    category: "Science",
    difficulty: "Hard"
  },

  // Literature
  {
    id: 16,
    question: "Who wrote 'Romeo and Juliet'?",
    answer: ["shakespeare", "william shakespeare"],
    category: "Literature",
    difficulty: "Easy"
  },
  {
    id: 17,
    question: "What is the first book in the Harry Potter series?",
    answer: ["philosopher's stone", "sorcerer's stone"],
    category: "Literature",
    difficulty: "Easy"
  },
  {
    id: 18,
    question: "Who wrote '1984'?",
    answer: ["orwell", "george orwell"],
    category: "Literature",
    difficulty: "Medium"
  },
  {
    id: 19,
    question: "What is the first word of Charles Dickens' 'A Tale of Two Cities'?",
    answer: ["it"],
    category: "Literature",
    difficulty: "Hard"
  },
  {
    id: 20,
    question: "Who wrote 'Pride and Prejudice'?",
    answer: ["austen", "jane austen"],
    category: "Literature",
    difficulty: "Medium"
  },

  // Sports
  {
    id: 21,
    question: "How many players are on a basketball team on the court at one time?",
    answer: ["5", "five"],
    category: "Sports",
    difficulty: "Easy"
  },
  {
    id: 22,
    question: "What sport is played at Wimbledon?",
    answer: ["tennis"],
    category: "Sports",
    difficulty: "Easy"
  },
  {
    id: 23,
    question: "How many yards are in a football field (American football)?",
    answer: ["100"],
    category: "Sports",
    difficulty: "Easy"
  },
  {
    id: 24,
    question: "What country hosted the 2016 Summer Olympics?",
    answer: ["brazil"],
    category: "Sports",
    difficulty: "Easy"
  },
  {
    id: 25,
    question: "In golf, what is one stroke under par called?",
    answer: ["birdie"],
    category: "Sports",
    difficulty: "Easy"
  },

  // Movies & Entertainment
  {
    id: 26,
    question: "Who directed the movie 'Jaws'?",
    answer: ["spielberg", "steven spielberg"],
    category: "Movies",
    difficulty: "Medium"
  },
  {
    id: 27,
    question: "What movie features the line 'May the Force be with you'?",
    answer: ["star wars"],
    category: "Movies",
    difficulty: "Medium"
  },
  {
    id: 28,
    question: "Who played Jack in 'Titanic'?",
    answer: ["dicaprio", "leonardo dicaprio"],
    category: "Movies",
    difficulty: "Medium"
  },
  {
    id: 29,
    question: "What is the highest-grossing movie of all time?",
    answer: ["avatar"],
    category: "Movies",
    difficulty: "Medium"
  },
  {
    id: 30,
    question: "What movie won the Academy Award for Best Picture in 2020?",
    answer: ["parasite"],
    category: "Movies",
    difficulty: "Medium"
  },

  // General Knowledge
  {
    id: 31,
    question: "What does 'www' stand for?",
    answer: ["world wide web"],
    category: "Technology",
    difficulty: "Medium"
  },
  {
    id: 32,
    question: "How many sides does a hexagon have?",
    answer: ["6", "six"],
    category: "Math",
    difficulty: "Easy"
  },
  {
    id: 33,
    question: "What is the largest mammal in the world?",
    answer: ["blue whale", "whale"],
    category: "Animals",
    difficulty: "Medium"
  },
  {
    id: 34,
    question: "What vitamin is produced when skin is exposed to sunlight?",
    answer: ["vitamin d", "d"],
    category: "Health",
    difficulty: "Medium"
  },
  {
    id: 35,
    question: "What is the most spoken language in the world?",
    answer: ["mandarin", "chinese"],
    category: "Languages",
    difficulty: "Hard"
  },

  // Food & Drink
  {
    id: 36,
    question: "What spice is derived from the Crocus flower?",
    answer: ["saffron"],
    category: "Food",
    difficulty: "Medium"
  },
  {
    id: 37,
    question: "What type of pastry is used to make profiteroles?",
    answer: ["choux", "choux pastry"],
    category: "Food",
    difficulty: "Medium"
  },
  {
    id: 38,
    question: "What is the main ingredient in guacamole?",
    answer: ["avocado"],
    category: "Food",
    difficulty: "Medium"
  },
  {
    id: 39,
    question: "What country did French fries originate from?",
    answer: ["belgium"],
    category: "Food",
    difficulty: "Medium"
  },
  {
    id: 40,
    question: "What is the most consumed beverage in the world after water?",
    answer: ["tea"],
    category: "Food",
    difficulty: "Medium"
  },

  // Music
  {
    id: 41,
    question: "How many strings does a standard guitar have?",
    answer: ["6", "six"],
    category: "Music",
    difficulty: "Medium"
  },
  {
    id: 42,
    question: "Who composed 'The Four Seasons'?",
    answer: ["vivaldi", "antonio vivaldi"],
    category: "Music",
    difficulty: "Medium"
  },
  {
    id: 43,
    question: "What does the musical term 'forte' mean?",
    answer: ["loud"],
    category: "Music",
    difficulty: "Medium"
  },
  {
    id: 44,
    question: "Which Beatles album features 'Lucy in the Sky with Diamonds'?",
    answer: ["sgt pepper", "sgt peppers"],
    category: "Music",
    difficulty: "Medium"
  },
  {
    id: 45,
    question: "What instrument does Yo-Yo Ma famously play?",
    answer: ["cello"],
    category: "Music",
    difficulty: "Medium"
  },

  // Nature
  {
    id: 46,
    question: "What is the hardest natural substance on Earth?",
    answer: ["diamond"],
    category: "Science",
    difficulty: "Medium"
  },
  {
    id: 47,
    question: "How many chambers does a human heart have?",
    answer: ["4", "four"],
    category: "Science",
    difficulty: "Easy"
  },
  {
    id: 48,
    question: "What type of animal is a Komodo dragon?",
    answer: ["lizard"],
    category: "Animals",
    difficulty: "Medium"
  },
  {
    id: 49,
    question: "What is the study of earthquakes called?",
    answer: ["seismology"],
    category: "Science",
    difficulty: "Hard"
  },
  {
    id: 50,
    question: "How many eyes does a bee have?",
    answer: ["5", "five"],
    category: "Animals",
    difficulty: "Hard"
  },

  // Additional Easy Questions
  {
    id: 51,
    question: "What color do you get when you mix red and yellow?",
    answer: ["orange"],
    category: "General Knowledge",
    difficulty: "Easy"
  },
  {
    id: 52,
    question: "How many days are in a week?",
    answer: ["7", "seven"],
    category: "General Knowledge", 
    difficulty: "Easy"
  },
  {
    id: 53,
    question: "What is the largest ocean on Earth?",
    answer: ["pacific"],
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 54,
    question: "What do bees make?",
    answer: ["honey"],
    category: "Animals",
    difficulty: "Easy"
  },
  {
    id: 55,
    question: "What is 5 + 3?",
    answer: ["8", "eight"],
    category: "Math",
    difficulty: "Easy"
  },

  // Additional Medium Questions
  {
    id: 56,
    question: "What is the currency of Japan?",
    answer: ["yen"],
    category: "Geography",
    difficulty: "Medium"
  },
  {
    id: 57,
    question: "Who wrote 'The Great Gatsby'?",
    answer: ["fitzgerald", "f. scott fitzgerald"],
    category: "Literature",
    difficulty: "Medium"
  },
  {
    id: 58,
    question: "What is the square root of 64?",
    answer: ["8", "eight"],
    category: "Math",
    difficulty: "Medium"
  },
  {
    id: 59,
    question: "In which year was the iPhone first released?",
    answer: ["2007"],
    category: "Technology",
    difficulty: "Medium"
  },
  {
    id: 60,
    question: "What is the main ingredient in bread?",
    answer: ["flour"],
    category: "Food",
    difficulty: "Medium"
  },

  // Additional Hard Questions
  {
    id: 61,
    question: "What is the smallest prime number?",
    answer: ["2", "two"],
    category: "Math",
    difficulty: "Hard"
  },
  {
    id: 62,
    question: "Who painted 'The Starry Night'?",
    answer: ["van gogh", "vincent van gogh"],
    category: "Art",
    difficulty: "Hard"
  },
  {
    id: 63,
    question: "What is the chemical formula for water?",
    answer: ["h2o", "h₂o"],
    category: "Science",
    difficulty: "Hard"
  },
  {
    id: 64,
    question: "In what year did the Titanic sink?",
    answer: ["1912"],
    category: "History",
    difficulty: "Hard"
  },
  {
    id: 65,
    question: "What is the capital of Australia?",
    answer: ["canberra"],
    category: "Geography",
    difficulty: "Hard"
  }
];
