# FastApi-React

Uma breve descrição do que o projeto faz.

## Tecnologias Utilizadas

*   **Backend:** Python, FastAPI, SQLAlchemy, Uvicorn, (seu banco de dados, ex: SQLite)
*   **Frontend:** React, Axios, JavaScript, HTML, CSS, React Router DOM
*   **Autenticação:** JWT (JSON Web Tokens)

## 🚀 Como Rodar Este Projeto

Siga os passos abaixo para configurar e executar a aplicação completa em sua máquina local.

---

### Configuração e Execução do Backend (FastAPI)

1.  **Navegue até a pasta do backend:**
    Assumindo que a pasta do backend se chama `curso-fastapi` (ajuste se for diferente) e está na raiz do projeto clonado:
    ```bash
    cd curso-fastapi
    ```

2.  **Crie o ambiente virtual:**
    É recomendado criar o ambiente virtual dentro da pasta do backend.
    ```bash
    python -m venv .venv
    ```

3.  **Ative o ambiente virtual:**
    *   No Windows:
        ```bash
        .venv\Scripts\activate
        ```
    *   No macOS/Linux:
        ```bash
        source .venv/bin/activate
        ```
    Você saberá que está ativo pois o nome do ambiente (`.venv`) aparecerá no início do seu prompt do terminal.

4.  **Instale as dependências do backend:**
    Certifique-se de que o arquivo `requirements.txt` está presente na pasta `curso-fastapi`.
    ```bash
    pip install -r requirements.txt
    ```
    *(Opcional, mas recomendado: `python -m pip install --upgrade pip` antes de instalar os requirements)*

5.  **Execute a aplicação backend:**
    Navegue até a pasta `src` (se o seu `main.py` estiver lá) dentro de `curso-fastapi`. Se `main.py` estiver na raiz de `curso-fastapi`, pule este `cd src`.
    ```bash
    cd src 
    # (Execute o próximo comando a partir desta pasta 'src')
    ```
    Execute o Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```
    O backend estará rodando, geralmente em `http://localhost:8000`. Mantenha este terminal aberto.

---

### Configuração e Execução do Frontend (React)

1.  **Abra um NOVO terminal.**
2.  **Navegue até o local onde você quer criar a pasta do frontend** (geralmente ao lado da pasta do backend `curso-fastapi`).
3.  **Crie um novo projeto React:**
    ```bash
    npx create-react-app my-app 
    ```
4.  **Navegue para dentro da pasta do novo projeto React:**
    ```bash
    cd my-app
    ```
5.  **Substitua a pasta `src`:**
    Delete a pasta `src` que foi criada automaticamente pelo `create-react-app` dentro de `my-app`. Em seguida, copie a pasta `src` do projeto que você baixou (a pasta `src` do frontend) para dentro de `my-app`.

6.  **Instale `react-router-dom` (e outras dependências específicas do seu `src` que não vêm com `create-react-app`):**
    ```bash
    npm install react-router-dom axios 
    # Adicione outras dependências se o seu src copiado as utilizar
    ```
7.  **Inicie a aplicação frontend:**
    ```bash
    npm start
    ```

---

Agora você deve ter o backend rodando em uma porta (ex: 8000) e o frontend em outra (ex: 3000), e eles devem conseguir se comunicar.

## Estrutura do Projeto (Exemplo)
