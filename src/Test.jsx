import React, { Component } from 'react';
const { Gitgraph, Orientation } = require("@gitgraph/react");

function Test() {
  return (
    <Gitgraph 
      options={{
        orientation: Orientation.Horizontal
      }}>
      {(gitgraph) => {
        // Simulate git commands with Gitgraph API.
        const master = gitgraph.branch({
          name: "master(Production)",
          style: {
            color: "#000000"
          }
         }).commit({
          subject: "Initial commit",
          style: {
            dot: {
              color: "#000000"
            }
          }
        });

        const preprod = gitgraph.branch({
          name: "PreProd",
          style: {
            color: "#2919db"
          }
        }).commit({
          subject: "Branch creation",
          style: {
            dot: {
              color: "#2919db"
            }
          }
        });

        const uat = gitgraph.branch({
          name: "UAT",
          style: {
            color: "#1cc362"
          }
        }).commit({
          subject: "Branch creation",
          style: {
            dot: {
              color: "#1cc362"
            }
          }
        });

        const develop = gitgraph.branch("develop");
        develop.commit("Add TypeScript");

        const aFeature = gitgraph.branch({
          name: "a-feature",
          style: {
            color: "#1de1c8"
          }
        });
        aFeature
          .commit({
            subject: "Make it work",
            style: {
              dot: {
                color: "#1de1c8"
              }
            }
          })
          .commit({
            subject: "Make it right",
            style: {
              dot: {
                color: "#1de1c8"
              }
            }
          })
          .commit({
            subject: "Make it fast",
            style: {
              dot: {
                color: "#1de1c8"
              }
            }
          });

        develop.merge(aFeature);
        uat.merge(develop);

        const aFeature2 = gitgraph.branch({
          name: "a-feature2",
          from: develop
        }).commit("Make it work 2");

        develop.merge(aFeature2);
        uat.merge(develop);

        preprod.merge(uat);
        //develop.commit("Prepare v1");

        master.merge(preprod).tag("v1.0.0");
      }}
    </Gitgraph>
  );
}

export default Test;