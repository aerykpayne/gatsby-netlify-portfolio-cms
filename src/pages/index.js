import React from "react"
import Link from "gatsby-link"
import Script from "react-load-script"
import graphql from "graphql"
import { css } from "emotion"

const container = css`
  display: flex;

  flex-direction: column;
  align-items: center;
`
const headerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-bottom: 5px;
  }
`
const caseContainer = css`
  display: flex;
  flex-wrap: wrap;
`
const casePreview = css`
  width: 44%;
  margin: 3%;
`

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/"
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <div className={container}>
          <div className={headerContainer}>
            <h1 className="has-text-weight-bold is-size-2">
              👋 Hi, I’m a Human.
            </h1>
            <p>
              Lead Designer at <a href="#">acme, Inc.</a>
            </p>
          </div>
          <div className={caseContainer}>
            {posts
              .filter(post => post.node.frontmatter.templateKey === "blog-post")
              .map(({ node: post }) => (
                <div
                  className={casePreview}
                  style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
                  key={post.id}>
                  <p>
                    <img src={post.frontmatter.image} />
                    <Link
                      className="has-text-primary"
                      to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link
                      className="button is-small"
                      to={post.frontmatter.path}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            image
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
