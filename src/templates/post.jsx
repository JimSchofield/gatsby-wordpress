import React from 'react'
// import { Link } from 'gatsby'

import Parser from 'html-react-parser';

import Layout from '../components/layout'

const PostTemplate =  ({data}) => {
    const post = data.wordpressPost;

    // look for image urls and parse in correct images for Gatsby
    const parsedContent = Parser(post.content, {
      replace: function(domNode) {
        let newSource = null;

        if( domNode.name === "img") {
          let src = domNode.attribs.src
          let filename = src.split('/').pop().split('.').shift();

          // find filename match in allfiles
          newSource = data.allFile.edges.find( ({node}) => {
            let graphQLImageName = node.relativePath.split('/').pop().split('.').shift();
            if (filename.indexOf(graphQLImageName) > -1) {
              return node.relativePath;
            }
            
            return null;
          });

          //set new src on the element
          domNode.attribs.src = newSource.node.childImageSharp.fluid.src;

          // set srcset
          domNode.attribs.srcset = newSource.node.childImageSharp.fluid.srcSet;

          return domNode;
        }

        return null;
      }
    });

    return (
      <Layout>
        <h2>{post.title}</h2>
        <div className="content">
          {parsedContent}
        </div>
      </Layout>
    );
}

export default PostTemplate;

export const postQuery = graphql`
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      author {
        name
        slug
      }
    }
    allFile{
      edges{
        node{
          id
          sourceInstanceName
          relativePath
          name
          childImageSharp{
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
  `
