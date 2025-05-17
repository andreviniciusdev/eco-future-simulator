type BotResponsesType = {
    keys: string[];
    response: string;
};

const botResponses: BotResponsesType[] = [
    {
        keys: ['oi', 'olá', 'ola', 'ei', 'eae'],
        response: 'Olá! Como posso ajudar você hoje? Pode perguntar sobre acidificação dos oceanos, impactos ambientais ou o simulador.'
    },
    {
        keys: ['ajuda', 'socorro', 'me ajuda', 'o que você faz', 'como funciona'],
        response: 'Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais, como usar o simulador, ou como você pode contribuir para soluções. Sobre o que quer saber?'
    },
    {
        keys: [
            'o que é acidificação',
            'definição acidificação',
            'acidificação dos oceanos',
            'o que é acidificação dos oceanos',
            'acidificação',
            'definição',
        ],
        response: 'A acidificação dos oceanos é o processo contínuo de redução do pH das águas oceânicas, causado principalmente pela absorção do excesso de dióxido de carbono (CO₂) da atmosfera. Quando o CO₂ se dissolve na água do mar, forma ácido carbônico, liberando íons de hidrogênio que aumentam a acidez da água.'
    },
    {
        keys: [
            'como funciona o simulador',
            'o que faz o simulador',
            'usar simulador',
            'simulador',
            'simulador de acidificação',
        ],
        response: 'Nosso simulador permite visualizar os efeitos da acidificação oceânica em diferentes cenários. Você pode ajustar os níveis de CO₂ e observar as mudanças nos ecossistemas marinhos em tempo real. Quer que eu explique como usar?'
    },
    {
        keys: [
            'quais os impactos',
            'impactos da acidificação',
            'efeitos da acidificação',
            'consequências da acidificação',
            'impactos no oceano',
            'efeitos no oceano',
        ],
        response: 'Os impactos da acidificação incluem: enfraquecimento de conchas e esqueletos de organismos marinhos, branqueamento de corais, alterações na cadeia alimentar marinha e redução da biodiversidade oceânica. Quer saber como isso afeta alguma espécie específica?'
    },
    {
        keys: [
            'como posso ajudar',
            'o que eu posso fazer',
            'como diminuir acidificação',
            'o que fazer para ajudar',
            'como reduzir acidificação',
            'como reduzir co2',
        ],
        response: 'Você pode ajudar reduzindo sua pegada de carbono com ações como diminuir o uso de combustíveis fósseis, apoiar energias renováveis, reduzir o consumo de carne, e participar de iniciativas de conservação marinha. Quer dicas práticas para o dia a dia?'
    },
    {
        keys: [
            'quem criou',
            'quem fez',
            'quem desenvolveu',
            'origem do bot',
            'criadores do bot',
        ],
        response: 'O EcoBot foi criado por uma equipe de cientistas e desenvolvedores comprometidos com a educação ambiental e a preservação dos oceanos.'
    },
    {
        keys: [
            'ph oceano',
            'qual ph do oceano',
            'nivel de ph',
            'acidez do oceano',
            'qual o ph do mar',
        ],
        response: 'O pH médio dos oceanos era de aproximadamente 8,2 antes da era industrial. Atualmente, está em torno de 8,1, o que representa um aumento de 30% na acidez (lembrando que a escala de pH é logarítmica). Projeções indicam que pode cair para 7,8 até o final deste século se as emissões de CO₂ continuarem no ritmo atual.'
    },
    {
        keys: [
            'corais',
            'acidificação e corais',
            'como acidificação afeta corais',
            'problemas dos corais',
            'branqueamento dos corais',
        ],
        response: 'Os corais são extremamente sensíveis à acidificação dos oceanos. O pH mais baixo dificulta a formação de seus esqueletos de carbonato de cálcio e pode levar ao branqueamento. Além disso, a acidificação combinada com o aquecimento dos oceanos cria um "efeito duplo" devastador para os recifes de coral.'
    },
    {
        keys: [
            'solução',
            'soluções para acidificação',
            'como resolver acidificação',
            'o que fazer para acidificação',
            'como combater acidificação',
        ],
        response: 'As principais soluções para a acidificação dos oceanos envolvem: redução das emissões globais de CO₂, desenvolvimento de energias renováveis, reflorestamento, proteção de ecossistemas marinhos como manguezais e pradarias marinhas (que capturam carbono), e pesquisa de técnicas de restauração de recifes e outros habitats marinhos.'
    },
    {
        keys: [
            'história do brasil',
            'historia do brasil',
            'brasil',
            'informações sobre brasil',
        ],
        response: 'Como assistente especializado em acidificação dos oceanos, não tenho informações detalhadas sobre a história do Brasil. Posso ajudar com questões relacionadas aos oceanos, acidificação e impactos ambientais marinhos.'
    },
    {
        keys: [
            'biodiversidade',
            'biodiversidade marinha',
            'fauna marinha',
            'flora marinha',
            'vida marinha',
            'impacto na biodiversidade',
        ],
        response: 'A acidificação dos oceanos ameaça a biodiversidade marinha de várias formas: afeta organismos que formam conchas ou esqueletos calcários, altera a cadeia alimentar, reduz a capacidade reprodutiva de certas espécies e pode modificar comportamentos dos organismos marinhos. Ecossistemas inteiros, como recifes de coral, que abrigam 25% de toda a vida marinha, estão em risco.'
    },
    {
        keys: [
            'economia',
            'impacto econômico',
            'custo acidificação',
            'prejuízo econômico',
            'pesca e acidificação',
            'turismo e acidificação',
        ],
        response: 'A acidificação dos oceanos tem impactos econômicos significativos, afetando a pesca comercial, a aquicultura (especialmente de moluscos), o turismo relacionado aos recifes de coral, e aumentando os custos de adaptação e mitigação. Estima-se que os danos econômicos globais possam chegar a trilhões de dólares até o final do século.'
    },
    {
        keys: [
            'experimentos',
            'pesquisas acidificação',
            'como estudam acidificação',
            'testes acidificação',
            'estudos acidificação',
        ],
        response: 'Cientistas realizam diversos experimentos para estudar a acidificação dos oceanos, incluindo: estudos em laboratório com tanques de água do mar em diferentes níveis de pH, instalações de enriquecimento de CO₂ em campo (FOCE - Free Ocean CO₂ Enrichment), monitoramento de áreas com fontes naturais de CO₂ (como respiradouros vulcânicos submarinos), e modelagem computacional de cenários futuros.'
    },
    {
        keys: [
            'o que o co2 em contato com a água do mar pode causar',
            'co2 contato água do mar',
            'efeito do co2 na água do mar',
            'por que o aumento de co2 na atmosfera faz mal para os oceanos',
            'porque o aumento de co2 faz mal para os oceanos',
        ],
        response: 'Quando o dióxido de carbono (CO₂) entra em contato com a água do mar, ele reage formando ácido carbônico, que libera íons de hidrogênio e causa a acidificação da água. Isso prejudica organismos marinhos que dependem do carbonato de cálcio para suas conchas e esqueletos, além de alterar o equilíbrio dos ecossistemas oceânicos.'
    }
];

// Função para buscar resposta, ignorando maiúsculas/minúsculas e espaços extras
function getBotResponse(userInput: string): string {
    const input = userInput.toLowerCase().trim();

    for (const entry of botResponses) {
        for (const key of entry.keys) {
            if (input.includes(key)) {
                return entry.response;
            }
        }
    }

    return 'Desculpe, não entendi sua pergunta. Você pode me perguntar sobre acidificação dos oceanos, impactos ambientais, como usar o simulador, ou como ajudar. Sobre o que quer saber?';
}

export { botResponses, getBotResponse };
