export const belongsToCurrentUser = (currentUser, author) => {
  if (!currentUser) {
    return false
  }

  return currentUser.uid === author.uid
}
