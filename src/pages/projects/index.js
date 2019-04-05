import React from 'react';

import Layout from '../../components/Layout';
import { StyledPageContainer } from '../../templates/index-page';

export default class ProjectIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <StyledPageContainer className="section">
          <div className="container">
            <div className="content">
              <div
                className="full-width-image-container margin-top-0"
                style={{
                  backgroundImage: `url('/img/blog-index.jpg')`,
                }}
              >
                <h1
                  className="has-text-weight-bold is-size-1"
                  style={{
                    boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                    backgroundColor: '#f40',
                    color: 'white',
                    padding: '1rem',
                  }}
                >
                  Latest Stories
                </h1>
              </div>
            </div>
          </div>
        </StyledPageContainer>
      </Layout>
    );
  }
}
