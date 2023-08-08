import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Test extends React.Component {
  render() {
    return (
      <div>
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }
}

export default Test;
