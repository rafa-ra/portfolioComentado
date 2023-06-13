//Importa os hooks do react
import { useState, useEffect } from "react";

//função que recebe o conteúdo do usuário como parâmetro
//e retorna um array populado
const parseProjects = (mdContent) => {
  //cria uma array vazia
  const projects = [];
  //divide o conteúdo recebido com o método split
  //separando por quebra de linha '\n'
  const lines = mdContent.split("\n");

  //for loop itera sobre a array de conteúdos, dividida acima
  for (let i = 0; i < lines.length; i++) {
    //atribui o item em iteração à variável 'line'
    const line = lines[i];

    //Condicional: checa com o método startsWith se é uma linha
    //com o nome da projeto
    if (line.startsWith("## ")) {
      //Atribui o nome à variável 'name'
      const name = line.substr(3).trim();
      //Atribui a descrição à variável 'description'
      const description = lines[++i].trim();
      //Atribui a string seguinte à variável 'imageLine'
      const imageLine = lines[++i];
      //Regex: retorna o valor condizente com formato indicado no regex
      const image = imageLine.match(/!\[(.*)\]\((.*)\)/)[2];
      //Atribui à variável 'tags' o conteúdo da linha seguinte, após tratamento da string
      const tags = lines[++i].split(":")[1].trim();
      //Cria array vazia
      const badges = [];
      //Cria array vazia
      const buttons = [];

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
        badges.push({ text: badgeName, colorScheme: badgeColor });
      }

      //Utiliza as informações da(s) linha(s) que descreve(m) os botões
      while (lines[++i] && lines[i].startsWith("  - ")) {
        //divide a string em um array
        const buttonLine = lines[i].substr(4).split("[");
        //Atribui a primeira parte à variável buttonText
        const buttonText = buttonLine[0].trim();
        //remove a chave e atribui a segunda parte à variável 'buttonHref'
        const buttonHref = buttonLine[1].split("]")[0].trim();
        //Adiciona as informações como um objeto no final da array 'buttons' criada anteriormente
        buttons.push({ text: buttonText, href: buttonHref });
      }

      //Adiciona às informações à array criada anteriormente
      projects.push({
        name,
        description,
        image,
        tags: [tags],
        badges,
        buttons,
      });
    }
  }

  //retorna o array
  return projects;
};

//função que faz o request ao arquivo
const ProjectsArray = () => {
  //inicia o estado com uma array vazia
  const [projects, setProjects] = useState([]);

  //useEffect que é executado apenas na primeira renderização
  useEffect(() => {
    //Faz o fetch no arquivo indicado, adiciona um callback quando a promessa
    //gerar um retorno, analisa se houve erro, transforma a resposta em texto
    //com o método .text, passa o retorno da promessa seguinte à função
    //parseProject e define como estado 'projects', retorna erro se for o caso
    fetch("/content/Projects.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProjects(parseProjects(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  //retorna o estado projects
  return projects;
};
//exporta a função
export default ProjectsArray;
