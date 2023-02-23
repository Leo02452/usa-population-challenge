Criar um aplicativo console em nodejs que implemente os seguintes requisitos.

1. Consumir a API (https://datausa.io/api/data?drilldowns=Nation&measures=Population) e gravar o resultado na tabela "api_data" no na coluna "doc_record".
Saida da API:
{"data":[{"ID Nation":"01000US","Nation":"United States","ID Year":2020,"Year":"2020","Population":326569308,"Slug Nation":"united-states"},...

2. Realizar a somatoria da propriedade "Population" dos anos 2020, 2019 e 2018 e appresentar o resultado no console.
Implementar de duas formas o algoritmo:
    a. em memoria no nodejs usando map, filter, for etc
    b. usando SELECT no postgres, pode fazer um SELECT inline no nodejs.
    c. usando SELECT no postgres, pode fazer uma VIEW no banco de dados.

Obrigatório:
Utilizar somente as libs instalas no projeto massivejs e axios.
Não instalar nenhuma outra lib de terceiro e não utilizar TypeScript.
Trocar a propriedade DATABASE_SCHEMA para o id do seu usuario do github e  

Referencias:
https://massivejs.org/
https://axios-http.com/

Ferramentas:
https://tableplus.com/
Postgres: por utilizar o PG fornecido pela nuvem HEROKU a string de conexao está no arquivo .env
