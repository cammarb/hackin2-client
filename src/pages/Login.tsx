import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await login({
        username: user,
        password: password
      }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser('');
      setPassword('');
      navigate('/company/programs');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-flow-row gap-2 max-w-80">
              <input
                required
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="bg-zinc-900"
              />
              <input
                required
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900"
              />
              <button type="submit">Log In</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
