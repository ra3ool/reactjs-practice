import { CommentsList } from '@/components';
import React from 'react';

const CommentsVirtualList: React.FC = () => {
  return <CommentsList pageSize={50} />;
};

export default CommentsVirtualList;
