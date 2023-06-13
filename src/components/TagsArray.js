//Importa hooks do react
import { useState, useEffect } from "react";

//Recebe conteúdo de texto, faz o parse e retorna o array
const parseTags = (mdContent) => {
  //Cria array vazia
  const tags = [];
  //Separa o conteúdo recebido em uma array com o método spĺit
  const lines = mdContent.split("\n");

  //Itera sobre cada elemento no array
  for (let i = 0; i < lines.length; i++) {
    //Atribui o elemento em iteração à variável value
    const value = lines[i];

    //Adiciona o valor ao final da array em formato de objeto
    tags.push({
      value,
    });
  }
  //retorna a array populada
  return tags;
};

//Faz o request para o arquivo e retorna um array populado
const TagsArray = (file) => {
  //inicia o estado 'tags' com valor default de um array vazio
  const [Tags, setTags] = useState([]);

  //useEffect que é executado inicialmente e todas as vezes
  //que 'file' for alterado
  useEffect(() => {
    //Faz o fetch no arquivo indicado; passa o retorno da primeira
    //promise como parâmetro de um callback; gera um erro caso a response
    //seja inadequada; retorna a response em formato de texto, no
    //caminho positivo; passa o retorno da promessa seguinte como
    //parâmetro do callback que define o estado 'tags', loga o erro
    //em caso negativo
    fetch(`/content/${file}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setTags(parseTags(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, [file]);

  //retorna tags
  return Tags;
};

//exporta função
export default TagsArray;
