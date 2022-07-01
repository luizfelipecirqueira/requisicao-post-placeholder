import React, { ChangeEvent, useState } from 'react';

type Props = {
    onAdd: (title: string, body: string) => void;
}

export const PostForm = ({ onAdd }: Props) => {

    const [addBodyText, setAddBodyText] = useState('');
    const [addTitleText, setAddTitleText] = useState('');

    const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitleText(e.target.value);
    }

    const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddBodyText(e.target.value);
    }

    const handleAddClick = async () => {
        if (addTitleText && addBodyText) {
            onAdd(addTitleText, addBodyText);
        }
        else {
            alert("Preencha os campos!");
        }
    }


    return (
        <fieldset>

            <legend>Adicionar Novo Post</legend>

            <input type="text" placeholder="Digite um título" value={addTitleText} onChange={handleAddTitleChange} />
            <br /><br />

            <textarea value={addBodyText} onChange={handleAddBodyChange}></textarea>

            <br /><br /><button onClick={handleAddClick}>Adicionar</button>
        </fieldset>

    )
}