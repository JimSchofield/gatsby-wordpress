// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

const path = require('path');
const slash = require('slash');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {


        // Posts (WordPress)
        graphql(
            `
                {
                    allWordpressPost {
                        edges {
                            node {
                                id
                                slug
                                status
                                template
                            }
                        }
                    }
                }
            `
        )
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(results.errors);
                }

                //----- create pages
                const pageTemplate = path.resolve(`./src/templates/post.jsx`);

                console.log(result.dataallWord);

                result.data.allWordpressPost.edges.forEach( edge => {
                    console.log(`Creating page => ${edge.node.slug}`)
                    createPage({
                        path: `/${edge.node.slug}`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    })
                })
                //----- /create pages

                resolve()
            })
    })
}
