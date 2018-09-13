import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Markdown from 'components/Markdown';
import getS3ArticleUrl from 'utils/getS3ArticleUrl';

class TopicItemArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  componentWillMount() {
    this.setState({ url: getS3ArticleUrl(this.props.match.params) });
  }

  /**
   * Renders the TopicItemArticle component.
   */
  render() {
    return (
      <div>
      </div>
    );
  }
}

TopicItemArticle.propTypes = {
  contentLoaded: PropTypes.func,
  metaData: PropTypes.array,
};

export default withRouter(TopicItemArticle);

// <Markdown
//   url={this.state.url}
//   onLoaded={this.props.contentLoaded()}
// />

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

// import Markdown from 'component/Markdown';

// class TopicItemArticle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articleContent: '',
//       error: '',
//     };
//   }

//   componentDidMount() {

//   }
// }





//   componentDidMount() {
//     this.props.contentLoaded();
//     this.getCodeContent(this.props.metaData);
//   }

//   /**
//    * Fetches the code text content from its corresponding resource URL.
//    *
//    * @param {object} metaData
//    */
//   getCodeContent = metaData => {
//     const promises = [];
//     metaData.forEach(codeItem => {
//       promises.push(fetch(codeItem.resourceUrl));
//     });

//     Promise.all(promises)
//       .then(result => Promise.all(result.map(x => x.text())))
//       .then(result => {
//         const codeContent = result.map((codeStr, i) => ({ ...metaData[i], codeStr }));
//         this.setState({ codeContent });
//       })
//       .catch(err => this.setState({ error: err }));
//   };

//   /**
//    * Renders the TabPanes based on the codeContent.
//    */
//   getTabPanes = () => (
//     this.state.codeContent.map((codeItem, i) => (
//       <TabPane tab={codeItem.title} key={i}>
//         <Markdown
//           markdownStr={wrapTextIntoMarkdownCodeBlock(codeItem.codeStr, codeItem.language)}
//         />
//       </TabPane>
//     ))
//   );

//   /**
//    * Renders the TopicItemCode component.
//    */
//   render() {
//     if (this.state.error) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <div>
//         <Tabs
//           defaultActiveKey="0"
//           renderTabBar={() => <ScrollableInkTabBar />}
//           renderTabContent={() => <TabContent />}
//         >
//           { this.getTabPanes() }
//         </Tabs>
//       </div>
//     );
//   }
// }

// TopicItemCode.propTypes = {
//   contentLoaded: PropTypes.func,
//   metaData: PropTypes.array,
// };

// export default TopicItemCode;
