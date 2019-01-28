import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h2>Posts:</h2>
    {data.allWordpressPost.edges.map(({node}, index) => (
      <div key={index}>
        <p><Link to={`/${node.slug}`}>{node.title}</Link></p>
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
      </div>
    ))}
  </Layout>
)

export default IndexPage


export const postQuery = graphql`
query{
  wordpressSiteMetadata{
    name,
    description
  }
  allWordpressPost(sort: { fields: [date] } ) {
    edges {
      node {
        id
        title
        excerpt
        slug
        content
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
}
`