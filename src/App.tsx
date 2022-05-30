import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './App.module.scss';
import { NetworkViewer } from 'network-viewer';
import { parseQueryString } from './utils';

const contextClassNames = classNames.bind(Styles);

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fileOptions, setFileOptions] = useState<any>(null);
  const networkContainerClassName = contextClassNames('network-container', {
    'network-container-data-loaded': isDataLoaded,
  });

  // read file queryString and load HAR file
  useEffect(() => {
    const parsedData = parseQueryString();
    if (parsedData) {
      setFileOptions(parsedData);
    }
  }, []);

  return (
    <section className={Styles['app-container']}>
      <div className={networkContainerClassName}>
        <NetworkViewer
          onDataLoaded={() => setIsDataLoaded(true)}
          {...(fileOptions || {})}
        />
      </div>
    </section>
  );
}

export default App;
