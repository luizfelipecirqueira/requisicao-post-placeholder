import { ChangeEvent, useEffect, useState } from 'react';
import { Post } from './types/Post';

const Requisicao = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const [addBodyText, setAddBodyText] = useState('');
  const [addTitleText, setAddTitleText] = useState('');

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

  const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitleText(e.target.value);
  }

  const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddBodyText(e.target.value);
  }

  const handleAddClick  = async () => {
    if(addTitleText && addBodyText){
      let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify({
          title: addTitleText,
          body: addBodyText,
          userId: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let json = await response.json();

      if(json.id){
        alert('Post adicionado com sucesso!');
      }
      else{
        alert('Ocorreu algum erro!');
      }
    }

    else{
      alert('Preencha os dados!')
    }
  }

  return (

    <div>
      <br />


      <br />

      {loading &&
        <div>Carregando...</div>
      }

      <fieldset>

        <legend>Adicionar Novo Post</legend>

        <input type="text" placeholder="Digite um título" value={addTitleText} onChange={handleAddTitleChange} />
        <br /><br />

        <textarea value={addBodyText} onChange={handleAddBodyChange}></textarea>

        <br /><br /><button onClick={handleAddClick}>Adicionar</button>
      </fieldset>

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