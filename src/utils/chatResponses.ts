
// Expanded pre-defined responses for the chatbot
export const responses: Record<string, string> = {
  'default': 'Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais ou como usar o simulador.',
  'oi': 'Olá! Como posso ajudar você hoje?',
  'olá': 'Olá! Como posso ajudar você hoje?',
  'ajuda': 'Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais, como usar o simulador, ou como você pode contribuir para soluções.',
  'o que é acidificação': 'A acidificação dos oceanos é o processo de diminuição do pH da água do mar, causado principalmente pela absorção de dióxido de carbono (CO₂) da atmosfera. Isso afeta organismos marinhos com conchas e esqueletos de carbonato de cálcio, como corais e mariscos.',
  'como funciona o simulador': 'Nosso simulador permite visualizar os efeitos da acidificação oceânica em diferentes cenários. Você pode ajustar os níveis de CO₂ e observar as mudanças nos ecossistemas marinhos em tempo real.',
  'quais os impactos': 'Os impactos da acidificação incluem: enfraquecimento de conchas e esqueletos de organismos marinhos, branqueamento de corais, alterações na cadeia alimentar marinha e redução da biodiversidade oceânica.',
  'como posso ajudar': 'Você pode ajudar reduzindo sua pegada de carbono através de ações como: diminuir o uso de combustíveis fósseis, apoiar energias renováveis, reduzir o consumo de carne, e participar de iniciativas de conservação marinha.',
  'quem criou': 'O EcoBot foi criado por uma equipe de cientistas e desenvolvedores comprometidos com a educação ambiental e a preservação dos oceanos.',
  'ph oceano': 'O pH médio dos oceanos era de aproximadamente 8,2 antes da era industrial. Atualmente, está em torno de 8,1, o que representa um aumento de 30% na acidez (lembrando que a escala de pH é logarítmica). Projeções indicam que pode cair para 7,8 até o final deste século se as emissões de CO₂ continuarem no ritmo atual.',
  'corais': 'Os corais são extremamente sensíveis à acidificação dos oceanos. O pH mais baixo dificulta a formação de seus esqueletos de carbonato de cálcio e pode levar ao branqueamento. Além disso, a acidificação combinada com o aquecimento dos oceanos cria um "efeito duplo" devastador para os recifes de coral.',
  'solução': 'As principais soluções para a acidificação dos oceanos envolvem: redução das emissões globais de CO₂, desenvolvimento de energias renováveis, reflorestamento, proteção de ecossistemas marinhos como manguezais e pradarias marinhas (que capturam carbono), e pesquisa de técnicas de restauração de recifes e outros habitats marinhos.',
  'história do brasil': 'Como assistente especializado em acidificação dos oceanos, não tenho informações detalhadas sobre a história do Brasil. Posso ajudar com questões relacionadas aos oceanos, acidificação e impactos ambientais marinhos.',
  'biodiversidade': 'A acidificação dos oceanos ameaça a biodiversidade marinha de várias formas: afeta organismos que formam conchas ou esqueletos calcários, altera a cadeia alimentar, reduz a capacidade reprodutiva de certas espécies e pode modificar comportamentos dos organismos marinhos. Ecossistemas inteiros, como recifes de coral, que abrigam 25% de toda a vida marinha, estão em risco.',
  'economia': 'A acidificação dos oceanos tem impactos econômicos significativos, afetando a pesca comercial, a aquicultura (especialmente de moluscos), o turismo relacionado aos recifes de coral, e aumentando os custos de adaptação e mitigação. Estima-se que os danos econômicos globais possam chegar a trilhões de dólares até o final do século.',
  'experimentos': 'Cientistas realizam diversos experimentos para estudar a acidificação dos oceanos, incluindo: estudos em laboratório com tanques de água do mar em diferentes níveis de pH, instalações de enriquecimento de CO₂ em campo (FOCE - Free Ocean CO₂ Enrichment), monitoramento de áreas com fontes naturais de CO₂ (como respiradouros vulcânicos submarinos), e modelagem computacional de cenários futuros.',
  'definição': 'A acidificação dos oceanos é o processo contínuo de redução do pH das águas oceânicas, causado principalmente pela absorção do excesso de dióxido de carbono (CO₂) da atmosfera. Quando o CO₂ se dissolve na água do mar, forma ácido carbônico, liberando íons de hidrogênio que aumentam a acidez da água.'
};

// Function to find the best response based on user input (offline mode)
export const getOfflineResponse = (userInput: string): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check if any key phrase is in the user input
  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseInput.includes(key)) {
      return value;
    }
  }
  
  // If no specific match is found, try to find a relevant response
  // by checking if any key is somewhat related to the input
  const words = lowercaseInput.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue; // Skip short words
    
    for (const [key, value] of Object.entries(responses)) {
      if (key.includes(word) || word.includes(key)) {
        return value;
      }
    }
  }
  
  return responses.default;
};

// Add typing simulation for a more natural chatbot feel
export const simulateTyping = async (text: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate typing delay based on message length
    const typingTime = Math.min(1000, Math.max(500, text.length * 20));
    setTimeout(() => {
      resolve(text);
    }, typingTime);
  });
};
