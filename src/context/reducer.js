import { initialState } from "./initialState";
import { v4 as uuidv4 } from "uuid";
import dictionary from "../assets/data/dictionary.json";
import targetWords from "../assets/data/targetWords.json";

export const ADD_LETTER = "ADD_LETTER";
export const DELETE_LETTER = "DELETE_LETTER";
export const GUESS_WORD = "GUESS_WORD";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const SHAKE_TILE_RESET = "SHAKE_TILE_RESET";
export const FLIP_TILE_RESET = "FLIP_TILE_RESET";

export const FLIP_ANIMATION_DURATION = 500;
const WORD_LENGTH = 5;

const offsetFromDate = new Date(2022, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = targetWords[Math.floor(dayOffset)];

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

    default:
      return state;
  }
};

export default reducer;
