/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    const regex = [
      /node_modules\/@projectstorm/,
      /node_modules\\@projectstorm/
    ];
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: regex,
            use: loaders.null()
          }
        ]
      }
    })
  }
}