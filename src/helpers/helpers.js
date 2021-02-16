/**
 * Module for Helper functions.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Check if document owner and current user are equal.
 *
 * @param {string} documentOwner - name of document owner.
 * @param {string} loggedInUser - name of logged in user.
 * @returns {boolean} - true when matching.
 */
export function isAuthor (documentOwner, loggedInUser) {
  if (documentOwner === loggedInUser) {
    return true
  }
}
