import {gql} from 'react-apollo';
import Comment from '../components/Comment';
import {getSlotsFragments} from 'coral-framework/helpers/plugins';
import withFragments from 'coral-framework/hocs/withFragments';

const pluginFragments = getSlotsFragments([
  'adminCommentInfoBar',
  'adminCommentContent',
  'adminSideActions',
  'adminCommentDetailArea',
]);

export default withFragments({
  root: gql`
    fragment Admin_Moderation_Comment_root on RootQuery {
      __typename
      ${pluginFragments.spreads('root')}
    }
    ${pluginFragments.definitions('root')}
    `,
  comment: gql`
    fragment Admin_Moderation_Comment_comment on Comment {
      id
      body
      created_at
      status
      user {
        id
        name: username
        status
      }
      asset {
        id
        title
        url
      }
      action_summaries {
        count
        ... on FlagActionSummary {
          reason
        }
      }
      actions {
        ... on FlagAction {
          reason
          message
          user {
            username
          }
        }
      }
      ${pluginFragments.spreads('comment')}
    }
    ${pluginFragments.definitions('comment')}
  `
})(Comment);
