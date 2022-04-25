import React from 'react';
import Page from '../components/Page';
import PressLogoSvg from '../svgs/PressLogoSvg';
import PressWordSvg from '../svgs/PressWordSvg';
import PressLockupSvg from '../svgs/PressLockupSvg';

const PagePressKit = () => (
  <Page>
    <header className="section is-large page-header">
      <div className="container">
        <div className="columns">
          <section className="column is-6 is-offset-3 has-text-centered">
            <h1 className="header-title">Press Kit</h1>
            <p className="header-subhead has-color-white">Familiarize yourself with our brand.</p>
          </section>
        </div>
      </div>
    </header>
    <section className="section is-large presskit">
      <div className="container">
        <section className="section-content-header">
          <div className="columns">
            <aside className="column is-3">
              <h2 className="section-header-title ">Brand Guidelines</h2>
            </aside>
            <section className="column is-7 is-offset-1">
              <p className="section-header-copy">
                The purpose of this guide is to ensure that consistency is maintained across the INFURA brand, whether
                assets are used internally or externally. Please reference this guide whenever you use these assets to
                ensure that they are used correctly.
              </p>
              <a className="button is-large" href="infura-brand-assets.zip">
                Download Assets Pack
              </a>
            </section>
          </div>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Name</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <p>
              The Infura name is spelled uppercase only when utilizing the wordmark or logo lockup. In all forms of copy
              the company name is spelled title case as Infura.
            </p>
          </section>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Logo</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <PressLogoSvg />
            <p>
              The logo is the most visible element of the identity system. It is used across all Infura collateral and
              communications.
            </p>
            <p>
              The Infura icon transforms the simple shape of an &quot;I&quot; into a navigational symbol, establishing
              Infura as a reliable source for discovery and information.
            </p>
            <p>
              This is an important part of the Infura identity and is used both in partnership with the wordmark, and
              separately as an isolated graphic device.
            </p>
          </section>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Wordmark</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <PressWordSvg />
            <p>
              The wordmark is used both with and without the icon, but when pairing together, be sure to use the
              appropriate lockup.
            </p>
          </section>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Lockup</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <PressLockupSvg />
            <p>
              The logo lockup allows both the icon and the wordmark to stand together. The placement and proportion of
              the two pieces should not be altered. This centrally aligned lockup should only be used when it can be
              centered within a page or layout.
            </p>
          </section>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Colors</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <ul className="brand-colors-list">
              <li className="brand-colors-item">
                <div className="color-swatch has-bg-primary" />
                <ul>
                  <li>#FF6B4A</li>
                  <li>R255 G107 B74</li>
                </ul>
              </li>
              <li className="brand-colors-item">
                <div className="color-swatch has-bg-white" />
                <div className="color-specs">
                  <ul>
                    <li>#FFFFFF</li>
                    <li>R255 G255 B255</li>
                  </ul>
                </div>
              </li>
              <li className="brand-colors-item">
                <div className="color-swatch has-bg-gray" />
                <ul>
                  <li>#D4D4D4</li>
                  <li>R212 G212 B212</li>
                </ul>
              </li>
              <li className="brand-colors-item">
                <div className="color-swatch has-bg-black" />
                <ul>
                  <li>#000000</li>
                  <li>R0 G0 B0</li>
                </ul>
              </li>
            </ul>
          </section>
        </section>
        <section className="columns">
          <aside className="column is-3">
            <h3 className="section-subhead">Usage</h3>
          </aside>
          <section className="column is-7 is-offset-1">
            <strong>We ask that you dont:</strong>
            <ul className="is-list has-bullets">
              <li>Use the logo in red over a black background.</li>
              <li>Use two colors within the lockup.</li>
              <li>Use the logo in any colors other than the ones specified in these guidelines.</li>
              <li>Insert effects or images within the logo.</li>
              <li>Modify the wordmark.</li>
              <li>Change the position or scale of the logo within the lockup.</li>
            </ul>
          </section>
        </section>
      </div>
    </section>
  </Page>
);

export default PagePressKit;
