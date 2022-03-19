import { initialState } from "./initialState";
import { v4 as uuidv4 } from "uuid";
import dictionary from "../assets/data/dictionary.json";
import targetWords from "../assets/data/targetWords.json";
import winMessages from "../assets/data/winMessages.json";

export const ADD_LETTER = "ADD_LETTER";
export const DELETE_LETTER = "DELETE_LETTER";
export const GUESS_WORD = "GUESS_WORD";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const SHAKE_TILE_RESET = "SHAKE_TILE_RESET";
export const FLIP_TILE_RESET = "FLIP_TILE_RESET";
export const UPDATE_TILE_STATUS = "UPDATE_TILE_STATUS";
export const UPDATE_KEY_STATUS = "UPDATE_KEY_STATUS";
export const CHECK_WIN_LOSE = "CHECK_WIN_LOSE";

export const FLIP_ANIMATION_DURATION = 500;
export const BOUNCE_ANIMATION_DURATION = 500;
export const WORD_LENGTH = 5;

const offsetFromDate = new Date(2022, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
export const targetWord = targetWords[Math.floor(dayOffset)];

const getActiveTiles = (tilesArray) => {
  return tilesArray.filter((tile) => tile.status === "active");
};

const addAlert = (alertMsg) => {
  return {
    id: uuidv4(),
    alertMsg: alertMsg,
  };
};

const shakeTiles = (tilesArray) => {
  return tilesArray.map((tile) =>
    tile.status === "active" ? { ...tile, shake: true } : tile
  );
};

const flipTiles = (tilesArray) => {
  return tilesArray.map((tile) =>
    tile.status === "active" ? { ...tile, flip: true } : tile
  );
};

const bounceTiles = (tilesArray, currentRowArray) => {
  return tilesArray.map((tile) =>
    tile.status === "correct" && currentRowArray.includes(tile)
      ? { ...tile, bounce: true }
      : tile
  );
};

const winTriesMsg = (numOfTries) => {
  return (
    winMessages[numOfTries].charAt(0).toUpperCase() +
    winMessages[numOfTries].slice(1)
  );
};

const getTargetWordFreq = () => {
  return targetWord.split("").reduce((freq, char) => {
    freq[char] ? freq[char]++ : (freq[char] = 1);
    return freq;
  }, {});
};

const checkRepeatLetter = (letter, index, guess) => {
  const letterFreqOfTargetWord = getTargetWordFreq();
  const freq = letterFreqOfTargetWord[letter];
  const indexesOfLetter = [];

  // get indexes of repeated letter
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === letter) {
      indexesOfLetter.push(i);
    }
  }

  // if current index is greater than last valid index
  if (indexesOfLetter[freq - 1] < index) return true;

  // check all other indexes greater than itself
  const restIndexes = indexesOfLetter.filter((i) => i > index);

  // if it's not empty array, see if matches is the same as occurence
  if (
    restIndexes.length > 0 &&
    restIndexes.filter((i) => targetWord[i] === letter).length === freq
  )
    return true;

  return false;
};

const checkKeyStatus = (currKeyStatus, currTileStatus) => {
  if (currKeyStatus === "correct" && currTileStatus === "wrong-location")
    return "correct";
  if (currKeyStatus === "wrong-location" && currTileStatus === "wrong")
    return "wrong-location";
  if (currKeyStatus === "correct" && currTileStatus === "wrong")
    return "correct";
  return currTileStatus;
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_LETTER: {
      // get active tiles
      const activeTiles = getActiveTiles(state.tiles);

      // ERROR CHECK: stop adding letters if there are 5 or more active tiles
      if (activeTiles.length >= WORD_LENGTH) return state;

      // get the first tile that does not have a value
      const nextTile = state.tiles.find((tile) => tile.value === "");

      // set the letter to the value and set status to active
      const mutatedTile = {
        ...nextTile,
        value: action.payload.letter,
        status: "active",
      };

      // create a copy of original array, then update the tile object with its index
      const newTiles = [...state.tiles];
      newTiles[state.tiles.indexOf(nextTile)] = mutatedTile;

      // return the new array
      return {
        ...state,
        tiles: newTiles,
      };
    }

    case DELETE_LETTER: {
      // get active tiles
      const activeTiles = getActiveTiles(state.tiles);

      // get the last active tile
      const lastTile = activeTiles[activeTiles.length - 1];

      // ERROR CHECK: stop deleting letter if there is no tile left
      if (lastTile == null) return state;

      // reset value and status
      const mutatedTile = {
        ...lastTile,
        value: "",
        status: "none",
      };

      // create a copy of original array, then update the tile object with its index
      const newTiles = [...state.tiles];
      newTiles[state.tiles.indexOf(lastTile)] = mutatedTile;

      // return the new array
      return {
        ...state,
        tiles: newTiles,
      };
    }

    case GUESS_WORD: {
      // get active tiles
      const activeTiles = getActiveTiles(state.tiles);

      // ERROR CHECK: word length is not long enough
      if (activeTiles.length < WORD_LENGTH) {
        // shake active tiles and add alert message
        return {
          ...state,
          tiles: shakeTiles(state.tiles),
          alerts: [addAlert("Not enough letters"), ...state.alerts],
        };
      }

      // convert array of tiles into string
      const guess = activeTiles.reduce((word, tile) => {
        return word + tile.value;
      }, "");

      // ERROR CHECK: word does not exist
      if (!dictionary.includes(guess)) {
        // shake active tiles and add alert message
        return {
          ...state,
          tiles: shakeTiles(state.tiles),
          alerts: [addAlert("Not in word list"), ...state.alerts],
        };
      }

      // all check pass, flip tiles
      return {
        ...state,
        disableInteraction: true,
        tiles: flipTiles(state.tiles),
        currentGuess: guess,
      };
    }

    case REMOVE_ALERT: {
      // make a copy of original alerts array, the remove the last alert from the copy array
      let newAlerts = [...state.alerts];
      if (newAlerts.length !== 0) newAlerts.pop();

      // update the alerts array with the copy array
      return {
        ...state,
        alerts: newAlerts,
      };
    }

    case SHAKE_TILE_RESET: {
      // set shaked tiles back to false
      const resetShakeTiles = state.tiles.map((tile) =>
        tile.shake ? { ...tile, shake: false } : tile
      );

      return {
        ...state,
        tiles: resetShakeTiles,
      };
    }

    case FLIP_TILE_RESET: {
      // target the tile that needed to flip back
      const flippedTile = state.tiles.find(
        (tile) => tile.id === action.payload.id
      );

      // set flip back to false
      const unFlippedTile = {
        ...flippedTile,
        flip: false,
      };

      // create a copy of original array, then update the tile object with its index
      const newTiles = [...state.tiles];
      newTiles[state.tiles.indexOf(flippedTile)] = unFlippedTile;

      return {
        ...state,
        tiles: newTiles,
      };
    }

    case UPDATE_TILE_STATUS: {
      // CHECK: is showing how to play
      if (action.payload.isShowingHelp) return state;

      // target current tile
      const currentTile = state.tiles.find(
        (tile) => tile.id === action.payload.id
      );

      // letter is correct
      if (currentTile.value === targetWord[action.payload.index]) {
        // set status to correct
        const correctTile = {
          ...currentTile,
          status: "correct",
        };

        // create a copy of original array, then update the tile object with its index
        const newTiles = [...state.tiles];
        newTiles[state.tiles.indexOf(currentTile)] = correctTile;

        return {
          ...state,
          tiles: newTiles,
        };
      }

      // letter is in wrong location
      if (targetWord.includes(currentTile.value)) {
        // set status to wrong location
        const wrongLocationTile = {
          ...currentTile,
          status: checkRepeatLetter(
            currentTile.value,
            action.payload.index,
            state.currentGuess
          )
            ? "wrong"
            : "wrong-location",
        };

        // create a copy of original array, then update the tile object with its index
        const newTiles = [...state.tiles];
        newTiles[state.tiles.indexOf(currentTile)] = wrongLocationTile;

        return {
          ...state,
          tiles: newTiles,
        };
      }

      // letter is not in word
      // set status to wrong
      const wrongTile = {
        ...currentTile,
        status: "wrong",
      };

      // create a copy of original array, then update the tile object with its index
      const newTiles = [...state.tiles];
      newTiles[state.tiles.indexOf(currentTile)] = wrongTile;

      return {
        ...state,
        tiles: newTiles,
      };
    }

    case UPDATE_KEY_STATUS: {
      // CHECK: is showing how to play
      if (action.payload.isShowingHelp) return state;

      // target current tile
      const currentTile = state.tiles.find(
        (tile) => tile.id === action.payload.id
      );

      // target key based on current tile value
      const currentKey = state.keyboard.find(
        (key) => key.key === currentTile.value
      );

      // set status for current key
      const updatedStatusKey = {
        ...currentKey,
        status: checkKeyStatus(currentKey.status, currentTile.status),
      };

      // create a copy of original array, then update the key object with its index
      const newKeyboard = [...state.keyboard];
      newKeyboard[state.keyboard.indexOf(currentKey)] = updatedStatusKey;

      return {
        ...state,
        keyboard: newKeyboard,
      };
    }

    case CHECK_WIN_LOSE: {
      // CHECK: is showing how to play
      if (action.payload.isShowingHelp) return state;

      // only check win/lose when there is no more active tiles
      if (getActiveTiles(state.tiles).length === 0) {
        // get all done tiles
        const doneTiles = state.tiles.filter((tile) => tile.status !== "none");
        // get the last five tiles as an array
        const currentRow = doneTiles.slice(-5);

        // check win/lose
        if (currentRow.every((tile) => tile.status === "correct")) {
          // get which row the current row is
          const currentRowIndex = Math.floor((currentRow[0].id - 1) / 5);

          return {
            ...state,
            tiles: bounceTiles(state.tiles, currentRow),
            alerts: [addAlert(winTriesMsg(currentRowIndex))],
            win: "won",
            disableInteraction: true,
          };
        }

        // get remaining tiles
        const restTiles = state.tiles.filter((tile) => tile.status === "none");

        // check if there is no more guesses
        if (restTiles.length === 0) {
          return {
            ...state,
            alerts: [addAlert(targetWord.toUpperCase())],
            win: "lost",
            disableInteraction: true,
          };
        }

        // game continues
        return {
          ...state,
          disableInteraction: false,
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export default reducer;
