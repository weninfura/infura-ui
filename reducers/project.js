import update from 'immutability-helper';

const initState = {
  errorAddContract: [],
  list: {},
  removingContractList: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT_LIST':
      return { ...state, list: action.projects };

    case 'ADD_PROJECT':
      return {
        ...state,
        list: {
          ...state.list,
          [action.project.id]: action.project,
        },
      };

    case 'UPDATE_PROJECT':
      return update(state, {
        list: {
          [action.project.id]: { $set: action.project },
        },
        errorAddContract: {
          $set: [],
        },
      });

    case 'ADDING_CONTRACT_FAIL':
      return update(state, {
        errorAddContract: {
          $push: [
            {
              projectid: action.projectid,
              error: action.error,
            },
          ],
        },
      });

    case 'REMOVE_SECURITY_ITEM_SUCCESS':
      return state;

    case 'REMOVE_SECURITY_ITEM_FAIL':
      return state;

    case 'DELETE_PROJECT_SUCCESS':
      return update(state, {
        list: { $unset: [action.projectid] },
      });

    default:
      return state;
  }
};
