//Importa os hooks do react
import { useState, useEffect } from "react";

//função que recebe o conteúdo do usuáriocomo parâmetro
//e retorna um array populado
const parseExperience = (mdContent) => {
  //cria uma array vazia
  const experience = [];
  //divide o conteúdo recebido com o método split
  //separando por quebra de linha '\n'
  const lines = mdContent.split("\n");

  //for loop itera sobre a array de conteúdos, quebrada acima
  for (let i = 0; i < lines.length; i++) {
    //atribui o item em iteração à variável 'line'
    const line = lines[i];

    //Condicional: checa com o método startsWith se é uma linha
    //com o nome da empresa
    if (line.startsWith("## ")) {
      //atribui o nome da empresa após o tratamento da string no
      //arquivo
      const company = line.substr(3).trim();
      //Salta à linha seguinte, trata a string e a divide em uma array
      const positionLine = lines[++i]
        .substr(2)
        .split("|")
        .map((s) => s.trim());
      //Atribui o cargo à variável 'position'
      const position = positionLine[0].slice(1, -1);
      //Atribui o tempo no cargo à variável 'duration'
      const duration = positionLine[1].trim();
      //Atribui o conteúdo string da linha seguinte à variável imageLine
      const imageLine = lines[++i];
      //Regex: checa o formato do path informado
      const image = imageLine.match(/!\[(.*)\]\((.*)\)/)[2];
      //Atribui à variável 'tags' o conteúdo da linha seguinte, após tratamento da string
      const tags = lines[++i].split(":")[1].trim();
      //Cria array vazia
      const badges = [];
      //Cria array vazia
      const listItems = [];

      //Não executa nada com a linha dos badges
      while (lines[++i] && !lines[i].startsWith("- Badges:")) {}
      //Utiliza as informações da(s) linha(s) que descreve(m) os badges
      while (lines[++i] && lines[i].startsWith("  - ")) {
        //Separa conteúdo da linha em uma array e atribui à variável 'badgeLine'
        const badgeLine = lines[i].substr(4).split("[");
        //Atribui a parte do nome à 'badgeName'
        const badgeName = badgeLine[0].trim();
        //Atribui à cor especificada pelo usuário à badgeColor
        const badgeColor = badgeLine[1].split("]")[0].trim();
        //Adiciona a badge como um objeto no final da array 'badges' criada anteriormente
        badges.push({ name: badgeName, colorScheme: badgeColor });
      }

      //Adiciona os itens em listItems à array criada anteriormente
      while (lines[++i] && lines[i].startsWith("  - ")) {
        listItems.push(lines[i].substr(4));
      }

      //Adiciona às informações à array criada anteriormente
      experience.push({
        image,
        company,
        position,
        duration,
        badges,
        listItems,
        tags,
      });
    }
  }
  //retorna o array completo
  return experience;
};

const ExperienceArray = () => {
  //inicia o estado 'experience' como array vazia
  const [experience, setExperience] = useState([]);

  //cria um useEffect que roda somente uma vez
  useEffect(() => {
    //Faz o fetch no arquivo indicado, adiciona um callback quando a promessa
    //gerar um retorno, analisa se houve erro, transforma a resposta em texto com o método .text, realiza o parse do conteúdo com a função parseExperience e define o estado com esse conteúdo. Finalmente, procura por erros.
    fetch("/content/Experience.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setExperience(parseExperience(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);
  //Retorna o estado
  return experience;
};

//Exporta o conteúdo
export default ExperienceArray;
