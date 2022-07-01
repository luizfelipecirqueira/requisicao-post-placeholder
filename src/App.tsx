import { useEffect, useState } from 'react';
import { PostForm } from './components/PostForm';
import { PostItem } from './components/PostItem';
import { Post } from './types/Post';


const Requisicao = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    setLoading(true);
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();
    setLoading(false);
    setPosts(json);
  }

  const handleAddPost = async (title: string, body: string) => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();

    if (json.id) {
      alert('Post adicionado com sucesso!');
    }
    else {
      alert('Ocorreu algum erro!');
    }
  }

  return (

    <div>
      <br />


      <br />

      {loading &&
        <div>Carregando...</div>
      }

      <PostForm onAdd={handleAddPost} />

      {!loading &&
        <div>

          <p>Total de Filmes: {posts.length}</p>

          <div className="filmes">
            {posts.map((item) => (
              <PostItem data={item} />
            ))}
          </div>
        </div>
      }
      {!loading && posts.length === 0 &&
        <div>Não há posts para exibir</div>
      }
    </div>

  );
}

export default Requisicao;