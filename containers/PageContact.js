import React from 'react';
import Page from '../components/Page';
import SignupCta from '../components/SignupCta';
import ContactUsForm from '../components/ContactUsForm';

const PageContact = () => (
  <Page>
    <main className="site-content">
      <header className="section is-large page-header">
        <div className="container">
          <div className="columns">
            <section className="column is-6 is-offset-3 has-text-centered">
              <h1 className="header-title">Contact</h1>
              <p className="header-subhead has-color-white">
                Custom solutions, sales, infrastructure questions, feedback, and feature requests – we&#39;re here for
                you.
              </p>
            </section>
          </div>
        </div>
      </header>

      <ContactUsForm
        textareaHeader="Message"
        submitButtonText="Send Message"
        successButtonText="Message Successfully Sent"
      />

      <SignupCta />
    </main>
  </Page>
);

export default PageContact;
