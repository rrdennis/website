/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react'
import { graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'
import { Form, Textarea, Select, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import { AlertInfobox } from '~components/common/infobox'

const reasons = [
  '-- Select a reason --',
  'I have questions about the state data grades',
  'I have feedback on the COVID Racial Data Tracker',
  'I have a question about the Long-Term Care data',
  'I want to report an issue with the website or web accessibility',
  'I want to report an issue with your data',
  'Something else!',
]

const defaultReason = '-- Select a reason --'

export default ({ data }) => {
  const [name, setName] = useState('')
  const [reason, setReason] = useState(defaultReason)

  return (
    <Layout
      title="Contact Us"
      socialCard={{
        description:
          'The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution.',
      }}
      centered
    >
      <LongContent>
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </LongContent>
      <Form
        method="POST"
        name="fa-form-1"
        action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        referrerPolicy="unsafe-url"
      >
        <Select
          isRequired
          label="What are you contacting us about?"
          detailText="Please let us know why you are contacting us so we can route your message to the right team"
          id="contact-reason"
          name="reason"
          options={reasons}
          onChange={event => setReason(event.target.value)}
        />
        <Row>
          <Col width={[4, 6, 6]} paddingRight={[0, 0, 32]}>
            <Input
              isRequired
              label="Your name"
              type="text"
              name="name"
              id="contact-name"
              onChange={event => setName(event.target.value)}
            />
          </Col>
          <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
            <Input
              isRequired
              type="email"
              label="Your email address"
              name="email"
              id="contact-email"
            />
          </Col>
        </Row>
        <Textarea label="Message" name="body" id="contact-message" />
        <div>
          {typeof window !== 'undefined' && (
            <ReCaptcha
              sitekey={data.site.siteMetadata.recaptchaKey}
              render="explicit"
              elementID={`contact-form-captcha-${Math.round(
                Math.random() * 1000,
              )}`}
            />
          )}
        </div>

        {reason === defaultReason && (
          <AlertInfobox>
            Please let us know{' '}
            <a href="#contact-reason">why you are contacting us</a> so we can
            route your message to the right team.
          </AlertInfobox>
        )}

        <input
          type="text"
          aria-hidden
          style={{ display: 'none' }}
          name="subject"
          tabIndex="-1"
          value={`${name} - ${reason}`}
        />
        <br />
        <input
          type="hidden"
          name="autoreply-from"
          value="contact@covidtracking.com"
        />
        <input
          type="hidden"
          name="autoreply-sender-name"
          value="The COVID Tracking Project"
        />
        <button
          type="submit"
          disabled={reason === defaultReason}
          aria-disabled={reason === defaultReason}
        >
          Contact us
        </button>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    contentfulSnippet(slug: { eq: "contact-page-form" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
