document.addEventListener("DOMContentLoaded", function () {
    carregarEstacoes();
    getWeather();
});

function carregarPagina(url) {
    document.getElementById('estacao-container').style.display = 'none';
    document.getElementById('iframe').src = url;
}

function mostrarEscolhaEstacao() {
    document.getElementById('iframe').src = '';
    document.getElementById('estacao-container').style.display = 'block';
}

function carregarEstacoes() {
    const estacoes = {
        'Eldorado': 'https://tinyurl.com/3fatm3cx',
        'Cidade Industrial': 'https://tinyurl.com/444bnnmr',
        'Vila Oeste': 'https://tinyurl.com/258xnywj',
        'Gameleira': 'https://tinyurl.com/ys4sacfd',
        'Calafate': 'https://tinyurl.com/yuxafbtx',
        'Carlos Prates': 'https://tinyurl.com/mr37vfr7',
        'Lagoinha': 'https://tinyurl.com/2crz79v7',
        'Central Supermercados BH': 'https://tinyurl.com/cnd3hrur',
        'Santa Efigênia': 'https://tinyurl.com/52xs6cve',
        'Santa Tereza': 'https://tinyurl.com/88exzed3',
        'Horto Florestal': 'https://tinyurl.com/53yzpf5d',
        'Santa Inês': 'https://tinyurl.com/bdhw6bfx',
        'José Cândido da Silveira': 'https://tinyurl.com/4h6y9ndm',
        'Minas Shopping': 'https://tinyurl.com/2h3wxahp',
        'São Gabriel': 'https://tinyurl.com/5buwze9c',
        'Primeiro de Maio': 'https://tinyurl.com/mue8uxme',
        'Waldomiro Lobo': 'https://tinyurl.com/2rcw4nt6',
        'Floramar': 'https://tinyurl.com/bdf6yk3c',
        'Vilarinho': 'https://tinyurl.com/26sycksk'
    };

    const select = document.getElementById('estacao-select');
    Object.keys(estacoes).forEach(nome => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        const estacaoEscolhida = select.value;
        if (estacoes[estacaoEscolhida]) {
            carregarPagina(estacoes[estacaoEscolhida]);
        }
    });
}

async function getWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=-19.9191&longitude=-43.9386&current_weather=true&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const weatherCode = data.current_weather.weathercode;

        const weatherDescriptions = {
            0: "Céu limpo", 1: "Principalmente limpo", 2: "Parcialmente nublado", 3: "Nublado",
            45: "Nevoeiro", 48: "Nevoeiro com geada", 51: "Chuvisco leve", 53: "Chuvisco moderado",
            55: "Chuvisco intenso", 61: "Chuva leve", 63: "Chuva moderada", 65: "Chuva intensa",
            95: "Tempestade leve", 96: "Tempestade com granizo", 99: "Tempestade forte"
        };

        document.getElementById('weather').innerHTML =
            `<i class="fa-solid fa-cloud-sun"></i> ${temp}°C, ${weatherDescriptions[weatherCode] || "Clima desconhecido"}`;
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        document.getElementById('weather').textContent = "Erro ao carregar a previsão";
    }
}