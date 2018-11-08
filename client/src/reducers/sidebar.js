export function sidebarIsOpened(state = true, action) {
  switch (action.type) {
      case 'SIDEBAR_IS_OPENED':
          return action.opened;
      default:
          return state;
  }
}