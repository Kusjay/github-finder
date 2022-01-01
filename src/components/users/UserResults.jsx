import { useEffect, useState } from 'react';

function UserResults() {
  const githubUrl = process.env.REACT_APP_GITHUB_URL;
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${githubUrl}/users`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);

    console.log(data);
  };

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}

export default UserResults;
