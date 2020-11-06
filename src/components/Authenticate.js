import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const Authenticate = () => {
  const [token, setToken] = useState('');
  return (
    <div>
      <br />
      <br />
      Hey there !! Looks like you are not authenticated. please Go to{' '}
      <a href="https://test-323-c4fca.web.app/">
        https://test-323-c4fca.web.app/
      </a>{' '}
      and copy your_token below
      <br />
      <br />
      <textarea
        value={token}
        rows="4"
        cols="50"
        onChange={(e) => setToken(e.target.value)}
      />
      <br />
      <br />
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          localStorage.setItem('token', token);
          window.location.href = '';
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Authenticate;
