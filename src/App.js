import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

import api from "./services/api";

function App() {
    const [input, setInput] = useState();
    const [cep, setCEP] = useState({});

    async function handleSearch() {
        // 49045015/json

        if (input === "") {
            alert("Preencha o campo!");
        }
        return;

        try {
            const response = await api.get(`${input}/json`);
            setCEP(response.data);
            setInput("");
        } catch {
            alert("Erro ao buscar CEP");
            setInput("");
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de CEP</h1>

            <div className="container-imput">
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onClick={handleSearch}
                />
                <button className="button-search">
                    <FiSearch size={25} color="#FFF" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>
                        {cep.localidade} - {cep.uf}
                    </span>
                </main>
            )}
        </div>
    );
}

export default App;
