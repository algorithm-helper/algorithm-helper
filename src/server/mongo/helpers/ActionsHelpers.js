const {
  Category,
  Subcategory,
  Topic,
  User,
} = include('mongo/models');

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
  handleItemBookmarked: (id, key) => (
    User.findById(id, {
      bookmarks: true,
    })
      .lean()
      .exec()
      .then(result => {
        // Check if the item is already bookmarked. If the item is bookmarked (exists in the
        // `bookmarks` array), then mark is as un-bookmarked by removing it. If the item does
        // not exist, then update `bookmarks` with the new item:
        const isBookmarked = !!result.bookmarks.find(elem => elem.key === key);

        if (isBookmarked) {
          return User.update({
            _id: id,
          }, {
            $pull: {
              bookmarks: {
                key,
              },
            },
          });
        }

        const [categorySlug, subcategorySlug, topicSlug] = key.split('/');
        return Promise.all([
          Category.findOne({ slug: categorySlug }, { title: true }).lean().exec(),
          Subcategory.findOne({ slug: subcategorySlug }, { title: true }).lean().exec(),
          Topic.findOne({ slug: topicSlug }, { title: true }).lean().exec(),
        ])
          .then(titles => {
            const [categoryTitle, subcategoryTitle, topicTitle] = titles.map(elem => elem.title);
            return User.update({
              _id: id,
            }, {
              $push: {
                bookmarks: {
                  key,
                  dateAdded: Date.now(),
                  categoryTitle,
                  subcategoryTitle,
                  topicTitle,
                },
              },
            });
          });
      })
  ),
};

module.exports = ActionsHelpers;
