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

  /**
   * Handles the item by key being marked completed/uncompleted.
   *
   * @param {string} id
   * @param {string} key
   */
  handleItemCompleted: (id, key) => (
    User.findById(id, {
      completedItems: true,
    })
      .lean()
      .exec()
      .then(result => {
        // Check if the item is already completed. If the item is completed (exists in the
        // `completedItems` array), then mark is as uncompleted by removing it. If the item does
        // not exist, then update `completedItems` with the new item:
        const isCompleted = !!result.completedItems.find(elem => elem.key === key);

        if (isCompleted) {
          return User.update({
            _id: id,
          }, {
            $pull: {
              completedItems: {
                key,
              },
            },
          });
        }

        return User.update({
          _id: id,
        }, {
          $push: {
            completedItems: {
              key,
              dateAdded: Date.now(),
            },
          },
        });
      })
  ),

  /**
   * Handles the item by url being bookmarked/un-bookmarked.
   *
   * @param {string} id
   * @param {string} url
   */
  handleItemBookmarked: (id, url) => {
    User.findById(id, {
      bookmarks: true,
    })
      .lean()
      .exec()
      .then(result => {
        // Check if the item is already completed. If the item is completed (exists in the )


      })
  },
};

module.exports = ActionsHelpers;
