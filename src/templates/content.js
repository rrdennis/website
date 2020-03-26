import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import SubNavigation from '../components/common/sub-navigation'
import Layout from '../components/layout'
import SEO from '../components/seo'

const shortcodes = { Link }

const ContentPage = ({ pageContext }) => {
  const { isMdx, page, navigation } = pageContext
  const { frontmatter } = page
  return (
    <Layout>
      {frontmatter && (
        <>
          <SEO title={frontmatter.title} />
          <h1>{frontmatter.title}</h1>
        </>
      )}
      {navigation && navigation.length > 0 && (
        <SubNavigation navigation={navigation} />
      )}
      {isMdx ? (
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{page.body}</MDXRenderer>
        </MDXProvider>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      )}
    </Layout>
  )
}

export default ContentPage