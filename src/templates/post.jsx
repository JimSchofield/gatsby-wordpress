import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'

const PostTemplate =  ({data}) => {
    const post = data.wordpressPost;

    return (
      <Layout>
        <h2>{post.title}</h2>
        <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}>
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
  }
  `
