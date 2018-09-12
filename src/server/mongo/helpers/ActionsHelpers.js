const { User } = include('mongo/models');

const ActionsHelpers = {
  /**
   * Get the the completion fields from the user record by id.
   *
   * @param {string} id
   */
  getCompletionItems: id => (
    User.findById(id, {
      completedItems: true,
      bookmarks: true,
    })
      .lean()
      .exec()
  ),
};

module.exports = ActionsHelpers;
