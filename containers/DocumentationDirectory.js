import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentDocContent as setCurrentDocContentAction } from '../actions/ui';

const DocumentationDirectory = ({ contents, path = '', current, setCurrentDocContent }) => (
  <ul className="docs-sidebar-nav">
    {contents.map(content => {
      if (content.name === 'README') return null;

      const newPath = `${path}${content.name}`;

      return (
        <li key={newPath}>
          <div className="docs-section-title">
            {content.content instanceof Array ? (
              <div>{content.title}</div>
            ) : (
              <Link
                to={newPath}
                className={`docs-directory-item ${current === content.name ? 'docs-current' : ''}`}
                onClick={() => setTimeout(() => setCurrentDocContent(content.name), 100)}
              >
                {content.title}
              </Link>
            )}
          </div>

          {content.content instanceof Array && (
            <div className="docs-section-content">
              <DocumentationDirectory
                contents={content.content}
                path={`${newPath}/`}
                current={current}
                setCurrentDocContent={setCurrentDocContent}
              />
            </div>
          )}
        </li>
      );
    })}
  </ul>
);

DocumentationDirectory.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })),
        PropTypes.string,
      ]).isRequired,
    }).isRequired,
  ).isRequired,
  path: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  setCurrentDocContent: PropTypes.func.isRequired,
};

export default connect(
  state => ({ current: state.ui.currentDocContent }),
  { setCurrentDocContent: setCurrentDocContentAction },
)(DocumentationDirectory);
