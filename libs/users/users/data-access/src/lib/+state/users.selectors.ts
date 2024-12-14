import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';
import { selectRouteParams } from '@users/core/data-access';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));

export const selectUsersEntities = createSelector(selectUsersState, (state: UsersState) => selectEntities(state));

export const selectSelectedId = createSelector(selectUsersState, (state: UsersState) => state.selectedId);

export const selectEntity = createSelector(selectUsersEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectUserById = (id: number) => createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectOpenedUser = createSelector(
  selectRouteParams,
  selectUsersEntities,
  ({ id }, entities) => entities[id] || null
);

export const usersFilterSelector = createSelector(selectUsersState, (state) => state.filterUsers);

// export const filteredUsersSelector = createSelector(
//   selectAllUsers,
//   usersFilterSelector,
//   (allUsers, filterUsers) => {
//     if (!filterUsers) {
//       return allUsers;
//     }
//     return allUsers.filter(user => user.name.includes(filterUsers.name));
//   }
// )

export const filteredUsersSelector = createSelector(
  selectAllUsers,
  usersFilterSelector,
  (allUsers, filterUsers) => {
  if (!filterUsers.name) {
    return allUsers;
  }
  const lowerCaseFilter = filterUsers.name?.toLowerCase();
  return allUsers.filter(
    (user) =>
      user.username?.toLowerCase().includes(lowerCaseFilter) || user.email?.toLowerCase().includes(lowerCaseFilter)
  );
});
