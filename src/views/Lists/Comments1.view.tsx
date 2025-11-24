import { CommentsList } from '@/components';
import React from 'react';

const CommentsVirtualListView: React.FC = () => {
  return <CommentsList pageSize={100} />;
};

export default CommentsVirtualListView;
