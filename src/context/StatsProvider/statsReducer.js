export const UPDATE_WIN_LOSE = "UPDATE_WIN_LOSE";
export const UPDATE_WIN_PERCENTAGE = "UPDATE_WIN_PERCENTAGE";
export const UPDATE_STREAK = "UPDATE_STREAK";
export const UPDATE_DISTRIBUTION = "UPDATE_DISTRIBUTION";
export const UPDATE_AVERAGE_GUESSES = "UPDATE_AVERAGE_GUESSES";

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
    case UPDATE_WIN_LOSE:
      return {
        ...state,
        gamesPlayed: state.gamesPlayed + 1,
        gamesWon:
          action.payload.winOrLose === "won"
            ? state.gamesWon + 1
            : state.gamesWon,
      };

    case UPDATE_WIN_PERCENTAGE:
      return {
        ...state,
        winPercentage: Math.round((state.gamesWon / state.gamesPlayed) * 100),
      };

    case UPDATE_STREAK:
      // TODO: reset streaks if no play
      return {
        ...state,
        currentStreak:
          action.payload.winOrLose === "won" ? state.currentStreak + 1 : 0,
        maxStreak:
          action.payload.winOrLose === "won" &&
          state.currentStreak + 1 > state.maxStreak
            ? state.currentStreak + 1
            : state.maxStreak,
      };

    case UPDATE_DISTRIBUTION:
      let winRow;
      if (action.payload.winRow == null) winRow = "fail";
      if (action.payload.winRow != null) winRow = action.payload.winRow + 1;

      const newGuesses = [...state.guesses].map((item) =>
        item.guess === winRow
          ? { ...item, frequence: item.frequence + 1 }
          : item
      );

      return {
        ...state,
        guesses: newGuesses,
      };

    case UPDATE_AVERAGE_GUESSES:
      return {
        ...state,
        averageGuesses: state.guesses.reduce((result, item) => {
          if (item.frequence > result) return item.frequence;
          return result;
        }, 0),
      };

    default:
      return state;
  }
};