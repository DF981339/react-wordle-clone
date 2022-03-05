import { initialState } from "./initialState";

export const ADD_LETTER = "ADD_LETTER";
export const DELETE_LETTER = "DELETE_LETTER";

const WORD_LENGTH = 5;

const getActiveTiles = (tilesArray) => {
  return tilesArray.filter((tile) => tile.status === "active");
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

    default:
      return state;
  }
};

export default reducer;
