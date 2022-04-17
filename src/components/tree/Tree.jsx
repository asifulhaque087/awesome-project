import React from "react";
import Row from "./Row";

const Tree = ({ treeData, parentId = 0, level = 0, postId }) => {
  const items = treeData.filter((item) => item.parentId === parentId);
  // .sort((a, b) => (a.text > b.text ? 1 : -1));

  if (!items.length) return null;

  return (
    <>
      {items &&
        items.map((item) => (
          <Row key={item._id} item={item} level={level} postId={postId}>
            <Tree
              treeData={treeData}
              parentId={item._id}
              level={level + 1}
              postId={postId}
            />
          </Row>
        ))}
    </>
  );
};

export default Tree;
