<<<<<<< HEAD
import { useEffect, useState } from 'react'

export default function Home() {
  const [text, setText] = useState('mentor')
=======
import { useEffect, useState } from 'react';

export default function Home() {
  const [text, setText] = useState('mentor');
>>>>>>> dev_melvin

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check the current text and update accordingly
<<<<<<< HEAD
      setText((prevText) => (prevText.includes('mentor') ? 'mentee' : 'mentor'))
    }, 2500)
    return () => clearInterval(intervalId)
  }, [])
=======
      setText((prevText) =>
        prevText.includes('mentor') ? 'mentee' : 'mentor'
      );
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);
>>>>>>> dev_melvin

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Find the right {text} for you
            </h1>
            <input
              type="text"
              placeholder="Search for the service you need..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> dev_melvin
}
