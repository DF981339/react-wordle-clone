export const UPDATE_STATS = "UPDATE_STATS";

export const statsInitialState = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: [
    {
      guess: 1,
      frequence: 0,
    },
    {
      guess: 2,
      frequence: 0,
    },
    {
      guess: 3,
      frequence: 0,
    },
    {
      guess: 4,
      frequence: 0,
    },
    {
      guess: 5,
      frequence: 0,
    },
    {
      guess: 6,
      frequence: 0,
    },
    {
      guess: "fail",
      frequence: 0,
    },
  ],
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};

export const statsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      return state;
    default:
      return state;
  }
};
