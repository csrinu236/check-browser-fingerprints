import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function HomePage({ posts }) {
  const [currentFP, setCurrentFP] = useState(null);
  const [localStorageFPs, setLocalStorageFPs] = useState([]);
  useEffect(() => {
    // in a browser, when using a script tag:
    const loadClient = window.ClientJS;
    const client = new loadClient();
    // Get the client's fingerprint id
    const fingerprint = client.getFingerprint();

    const LSFPS = localStorage.getItem('FINGER_PRINTS');
    const FINGER_PRINTS = LSFPS ? JSON.parse(LSFPS) : [];
    console.log(
      '🚀 ~ file: index.js:16 ~ useEffect ~ FINGER_PRINTS:',
      FINGER_PRINTS
    );

    if (!FINGER_PRINTS.includes(fingerprint)) {
      FINGER_PRINTS.push(fingerprint);
    }
    setLocalStorageFPs(FINGER_PRINTS);
    setCurrentFP(fingerprint);
  }, []);

  return (
    <>
      <section className="section">
        <div className="section-center">
          <h3>Finger Prints Stored in Localstorage</h3>
          {localStorageFPs.map((fp) => {
            return <div key={fp}>{fp}</div>;
          })}
          <h3>Current Fingerprint</h3>
          <div>{currentFP}</div>
        </div>
      </section>
    </>
  );
}
