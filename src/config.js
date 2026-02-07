/**
 * Easy-to-edit configuration for the Valentine Rose Day experience.
 * Change question, answer, image path, and copy here.
 */

export const CONFIG = {
  // --- Question Gate (entry screen) ---
  questions: [
    {
      question: 'Where was our first date?',
      answer: 'california burrito', // case-insensitive match
      successMessage: 'Well that was fast',
    },
    {
      question: 'How did I initiate our first kiss? What did i specifically say?',
      answer: 'do you wanna?',
      successMessage: 'Oh god that was so embarassing',
    },
    {
      question: `What do I call you when you're giving me directions while driving/riding (A Bike)?`,
      answer: 'dyslexic',
      successMessage: 'I need to get my ears checked...',
    },
  ],
  wrongMessage: 'Hmm… try again',

  // --- Prelude micro-moments (before rose) ---
  preludeMessages: [
    'Hey…',
    'I made something for you',
    'Just… don’t rush it ❤️',
    'Tap when you’re ready',
  ],

  // --- Hold-to-bloom ---
  holdMessage: 'Hold the rose for a moment 🌹',
  holdSpeed: 0.12, // progress per second (lower = slower bloom)

  // --- Main page ---
  imagePath: '/yuviii.jpg',
  title: 'Happy Rose Day ❤️',
  subtitle: 'To my favorite person',

  // --- Handwritten letter (paged) ---
  letterPages: [
    ['Your parents would beat my ass if I sent you a real Rose.'],
    ['So I made this instead.'],
    [`On days you doubt yourself, I hope you remember that you’re the best thing that ever happened to me,`],
    ['and you deserve the best in this world!!!'],
  ],

  // --- Music ---
  musicPath: '/sadka_mp3.mp3', // place file in /public
}
