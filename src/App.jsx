import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const App = () => {
  const [companyHierarchy, setCompanyHierarchy] = useState([]);

  useEffect(() => {
    fetch("https://demo.myhrlounge.com/api/company_heirarchy", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.company_hierarchy);
        setCompanyHierarchy(data?.company_hierarchy); // Store the hierarchy data
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Recursive function to build the tree structure
  const buildTree = (parentId) => {
    const nodes = companyHierarchy.filter(
      (node) => node.upper_label === parentId
    );

    if (!nodes.length) return null;

    return (
      <>
      {/* Company + Department*/}
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            label={
              <div className="inline-block p-4 border border-gray-300 rounded-lg shadow-sm bg-white text-center">
                {/* {node.hierarchy_name} - Type: {node.company_definition_id} */}



                <div className="flex gap-2 px-10">
                <img
                  className="h-10 w-10 border-2 border-gray-300 rounded-full"
                  src="https://png.pngtree.com/template/20191005/ourmid/pngtree-logo-people-group-team-image_314502.jpg"
                  alt=""
                />

                <h2 className="font-bold"> {group.hierarchy_name} </h2>
              </div>

              <hr  className="my-3 w-full"/>
              <div className="flex gap-5 text-sm font-semibold my-4">
                <span> Total Employees </span> 
                <span> Total Male  </span>
                <span> Total Female </span>
              </div>

                <small class="bg-gray-200 px-1 rounded-md absolute bottom-0 right-8"> {companyHierarchy.filter(item => item.upper_label === group.id).length} </small>

              </div>
            }
          >
            {buildTree(node.id)}
          </TreeNode>
        ))}
      </>
    );
  };

  // Finding the root of the hierarchy (group)
  const group = companyHierarchy.find((item) => item.upper_label === null);
  console.log(group);
  

  if (!group) return <p>Loading...</p>;

  return (
    <div className="App">
      <h1 className="text-5xl text-gray-800 my-8 text-center">
        Company Hierarchy
      </h1>

{/* Main Company / Group */}
      <div className="">
        <Tree
          lineWidth={"3px"}
          lineColor={"lightgray"}
          lineBorderRadius={"10px"}
          label={
            <div className="inline-block px-8 py-10 border border-gray-300 rounded-lg shadow-md text-center text-lg relative w-auto">
              <div className="flex gap-2 px-10">
                <img
                  className="h-10 w-10 border-2 border-gray-300 rounded-full"
                  src="https://png.pngtree.com/template/20191005/ourmid/pngtree-logo-people-group-team-image_314502.jpg"
                  alt=""
                />

                <h2 className="font-bold"> {group.hierarchy_name} </h2>
              </div>

              <hr  className="my-3 w-full"/>
              <div className="flex gap-5 text-sm font-semibold my-4">
                <span> Total Employees </span> 
                <span> Total Male  </span>
                <span> Total Female </span>
              </div>

                <small class="bg-gray-200 px-1 rounded-md absolute bottom-0 right-8"> {companyHierarchy.filter(item => item.upper_label === group.id).length} </small>

              {/* {group.hierarchy_name} - Total Companies: {companyHierarchy.filter(item => item.upper_label === group.id).length} */}
            </div>
          }
        >
          {buildTree(group.id)} 
        </Tree>
      </div>
    </div>
  );
};

export default App;
