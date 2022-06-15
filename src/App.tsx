import { useEffect, useState } from 'react';
import {Post} from './types/Post';

const Requisicao = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();
    setPosts(json);
  }

  return (

    <div>
      <br />
      

      <br />

      {loading &&
        <div>Carregando...</div>
      }

      {!loading &&
        <div>

        <p>Total de Filmes: {posts.length}</p>

        <div className="filmes">
          {posts.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              <small>#{item.id} - Usuário: {item.userId}</small>
              <p>{item.body}</p>
            </div>
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