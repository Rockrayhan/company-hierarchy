import React, { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './App2.css';  // We'll write basic CSS here

// TreeNode component for displaying each node's information
const TreeNodeComponent = ({ node }) => (
  <div className="tree-node">
    <strong>{node.hierarchy_name}</strong>
    <p>Type: {node.company_definition_id}</p>
  </div>
);

// Tree component to build the hierarchical structure
const TreeComponent = ({ companyHierarchy }) => {
  const group = companyHierarchy.find(item => item.upper_label === null);

  const buildTree = (parentId) => {
    const children = companyHierarchy.filter(item => item.upper_label === parentId);
    if (!children.length) return null;

    return children.map(child => (
      <TreeNode key={child.id} label={<TreeNodeComponent node={child} />}>
        {buildTree(child.id)}
      </TreeNode>
    ));
  };

  return (
    group ? (
      <Tree label={<TreeNodeComponent node={group} />}>
        {buildTree(group.id)}
      </Tree>
    ) : <p>No hierarchy data available</p>
  );
};

// Main App component
const App = () => {
  const [companyHierarchy, setCompanyHierarchy] = useState([]);

  useEffect(() => {
    fetch('https://demo.myhrlounge.com/api/company_heirarchy', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCompanyHierarchy(data?.company_hierarchy || []))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Company Hierarchy Tree</h1>
      {companyHierarchy.length > 0 ? (
        <TreeComponent companyHierarchy={companyHierarchy} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
