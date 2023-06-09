import { useState, useEffect } from "react";

//Função que recebe o conteúdo do arquivo .md e as transfere para
//o objeto profile
const parseProfile = (mdContent) => {
  //Declara a variável profile e a estrutura esperada
  //para o objeto. Não é essencial.
  const profile = {
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    logo: "",
  };

  //Divide o conteúdo de mdContent, que é recebido como parâmetro
  //na função parse profile, pelas quebras de linha '\n' e atribui
  // à variável 'lines'
  const lines = mdContent.split("\n");

  //For loop itera na array 'lines'
  for (let i = 0; i < lines.length; i++) {
    //Atribui à 'line' a linha atual em iteração no for loop
    const line = lines[i];
    //Condicional: Checando o início da linha
    if (line.startsWith("## ")) {
      //Inicia a extração no caracter 3, aplica trim() para limpar
      //espaços em branco e atribui à 'section'
      const section = line.substr(3).trim();

      //Condicional: checa qual à seção do arquivo md a linha em iteração pertence
      switch (section) {
        case "Header":
          //Vai para a linha seguinte e atribui à uma variável
          //após o tratamento da string
          profile.headerName = lines[++i].substr(2).trim();
          profile.headerRole = lines[++i].substr(2).trim();
          profile.headerDesc = lines[++i].substr(2).trim();
          break;
        case "About":
          profile.about = lines[++i].trim();
          break;

        case "Contact":
          //Atribui a primeira linha descritiva a contact
          profile.contact = lines[++i].trim();

          //Criação de array a ser utilizada no "for... of" abaixo
          const contactLinks = ["LinkedIn", "GitHub", "Email"];

          //Itera nos itens da array "contactLinks"
          for (const link of contactLinks) {
            //Atribui a string da linha atual em iteração à "linkLine"
            const linkLine = lines[++i].substr(2).trim();
            //Condicional: checa se a string do arquivo md
            //coincide com o item em iteração, trata a string e atribui
            //o valor à respectiva key, dentro de "profile"
            if (linkLine.startsWith(link)) {
              profile[link.toLowerCase()] = linkLine.split(": ")[1].trim();
            }
          }
          break;
        case "Logo":
          profile.logo = lines[++i].substr(2).trim();
          break;
        default:
          //Não faz nada
          break;
      }
    }
  }
  //Retorna o objeto preenchido
  return profile;
};

//Roda o useEffect e retorna o objeto preenchido
const ProfileArray = () => {
  //Inicia useState
  const [profile, setProfile] = useState({
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    logo: "",
  });

  //useEffect cujo segundo argumento é uma array vazia
  //para que só rode uma vez
  useEffect(() => {
    //Linha 101: Busca o documento indicado
    //Ln 103: Passa o callback da tentativa de fetch e retorna erro ou não
    //Ln : Retorna o conteúdo da response em formato de texto
    //Ln : Callback que recebe o conteúdo, passa como parâmetro para
    //a função "parseProfile" e por fim atribui o resultado
    //ao estado, através de "setProfile"
    //Ln : catch para sinalizar erros
    fetch("/content/Profile.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProfile(parseProfile(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  //Retorna profile preenchido
  return profile;
};

//Exporta o componente
export default ProfileArray;
