import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const OAuthButtonGroup = ({ onSuccess = () => {}, onError = () => {} }) => {
  const handleOAuthLogin = (provider) => {
    const loginFn = {
      google: Meteor.loginWithGoogle,
      github: Meteor.loginWithGithub,
    }[provider];

    if (loginFn) {
      loginFn((err) => {
        if (err) {
          console.error(`Login with ${provider} failed:`, err);
          onError(err.reason);
        } else {
          onSuccess();
        }
      });
    }
  };

  return (
    <div className="text-center mb-3">
      <h5>Or sign in with</h5>
      <ButtonGroup className="d-flex justify-content-center gap-2">
        <Button variant="light" className="d-flex align-items-center gap-2" onClick={() => handleOAuthLogin('google')}>
          <FaGoogle style={{ color: '#DB4437' }} />
          Google
        </Button>
        <Button variant="dark" className="d-flex align-items-center gap-2" onClick={() => handleOAuthLogin('github')}>
          <FaGithub />
          GitHub
        </Button>
      </ButtonGroup>
    </div>
  );
};

OAuthButtonGroup.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default OAuthButtonGroup;
